import { CollisionService, Effects, Scene } from "@engine";
import { collisionGroups } from "collision-group";
import { HealthBehavior } from "scenes/combat/behaviors/health.behavior";
import { DeathScene } from "scenes/death/death.scene";
import { SafeZoneScene } from "scenes/safe-zone/safe-zone.scene";
import { SuccessScene } from "scenes/success/success.scene";
import { type LevelConfig, LevelProgressionService } from "services/level-progression.service";
import { Vector2 } from "three";
import { CombatInputMappingContext } from "./combat-input-mapping.context";
import { EnemyManager } from "./entities/enemy-manager";
import { Player } from "./entities/player";
import { Portal } from "./entities/portal";
import { CombatEventsService } from "./services/combat-events.service";
import { DamageTextService } from "./services/damage-text.service";
import { CharacterPortraitWidget } from "./ui/character-portrait.widget";
import { LevelInfoWidget } from "./ui/level-info.widget";
import { PlayerStatsWidget } from "./ui/player-stats.widget";
import { VirtualJoystickWidget } from "./ui/virtual-joystick.widget";
import { XPBarWidget } from "./ui/xp-bar.widget";
import { SceneBuilder } from "./utils/scene-builder";
import { sceneConfigService } from "../configs";
import type { SceneConfig } from "../configs";

export class CombatScene extends Scene {
  private readonly collisionService = this.addService(new CollisionService());
  private levelProgressionService!: LevelProgressionService;
  private readonly levelInfoWidget?: LevelInfoWidget;
  private sceneConfig!: SceneConfig;
  private sceneBuilder!: SceneBuilder;

  // Entity references (created by scene builder)
  private player!: Player;
  private portal!: Portal;
  private readonly enemyManager = this.addEntity(new EnemyManager());

  // fixme: we shouldn't pass level config here, should be from service
  constructor(
    private levelConfig?: LevelConfig,
    private sceneConfigName: string = "default-combat"
  ) {
    super();

    this.addService(new CombatEventsService());
    this.addService(new DamageTextService());

    // Set the scene input context
    this.input = new CombatInputMappingContext();

    // Setup collision groups
    for (const [source, targets] of Object.entries(collisionGroups))
      this.collisionService.addCollisionGroup(source, targets);

    this.collisionService.logCollisionMatrix();

    // Add UI widgets
    this.addWidget(new PlayerStatsWidget());
    this.addWidget(new VirtualJoystickWidget());
    this.addWidget(new CharacterPortraitWidget());
    this.addWidget(new XPBarWidget());

    // Add level info widget if we have level config
    if (this.levelConfig) {
      this.levelInfoWidget = new LevelInfoWidget(this.levelConfig);
      this.addWidget(this.levelInfoWidget);
    }
  }

  override async init() {
    await super.init();

    // Load scene configuration
    this.sceneConfig = await sceneConfigService.loadConfig(this.sceneConfigName);
    this.sceneBuilder = new SceneBuilder(this);

    // Build scene from configuration
    await this.sceneBuilder.buildFromConfig(this.sceneConfig);

    // Get entity references that were created by the scene builder
    this.player = this.getEntity(Player);
    this.portal = this.getEntity(Portal);

    this.levelProgressionService = this.getService(LevelProgressionService);

    // fixme: we shouldn't configure this here (most likely). Level progression service is game-wide
    // Initialize level progression service from save data if available
    if (!this.levelConfig) {
      // If no level config provided, get it from progression service
      this.levelProgressionService.initializeFromSave();
      this.levelConfig = this.levelProgressionService.currentLevel;

      if (this.levelInfoWidget) this.levelInfoWidget.updateLevel(this.levelConfig);
    }

    // Subscribe to player death
    const playerHealth = this.player.getBehavior(HealthBehavior);
    this.on(playerHealth.healthChanged, ({ isAlive }) => {
      if (!isAlive) this.onPlayerDied();
    });

    // Listen to portal reaching event
    this.on(this.portal.reached, this.onPortalReached.bind(this));

    // Listen to all enemies cleared event
    this.on(this.enemyManager.enemiesCleared, this.onAllEnemiesCleared.bind(this));

    // Configure post-processing effects from scene config
    if (this.sceneConfig.environment.effects) {
      const effects = this.sceneConfig.environment.effects;
      this.effects = new Effects(this.game.sceneRoot, this.game.camera, this.game.threeRenderer, {
        bloom: effects.bloom,
        chromaticAberration: effects.chromaticAberration ? {
          enabled: effects.chromaticAberration.enabled,
          offset: new Vector2(effects.chromaticAberration.offset.x, effects.chromaticAberration.offset.y)
        } : undefined,
        depthOfField: effects.depthOfField,
      });
    }

    this.enemyManager.spawn();
  }

  private readonly onPlayerDied = () => {
    // Load death scene which will handle the progression reset
    this.game.loadScene(new DeathScene());
  };

  private readonly onAllEnemiesCleared = () => {
    // All enemies are dead, reload the scene
    this.enemyManager.spawn();
  };

  private onPortalReached() {
    const nextLevel = this.levelProgressionService.nextLevel();

    if (nextLevel.levelType === "safe_zone") {
      // Moving to safe zone (next world)
      this.game.loadScene(new SafeZoneScene(nextLevel));
    } else if (nextLevel.levelType === "boss" && nextLevel.worldNumber === 6) {
      // World 6 boss levels - check if game completed
      if (this.levelProgressionService.state.isCompleted) {
        this.game.loadScene(new SuccessScene());
      } else {
        this.game.loadScene(new CombatScene(nextLevel));
      }
    } else {
      // Regular combat or boss level
      this.game.loadScene(new CombatScene(nextLevel));
    }
  }

  override destroy() {
    // Clear fog
    if (this.game.sceneRoot.fog) this.game.sceneRoot.fog = null;

    super.destroy();
  }
}
