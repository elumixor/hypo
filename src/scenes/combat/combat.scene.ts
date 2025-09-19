import { CollisionService, Scene } from "@engine";
import { HealthBehavior } from "scenes/combat/behaviors/health.behavior";
import { XPCrystalEntity } from "scenes/combat/entities/xp-crystal.entity";
import { DeathScene } from "scenes/death/death.scene";
import { SafeZoneScene } from "scenes/safe-zone/safe-zone.scene";
import { SuccessScene } from "scenes/success/success.scene";
import { LevelProgressionService } from "services/level-progression.service";
import { ProgressionService } from "services/progression.service";
import { AmbientLight, DirectionalLight, Mesh, MeshLambertMaterial, PlaneGeometry } from "three";
import type { LevelConfig } from "types/level-config";
import { destroy } from "utils";
import { CollisionGroup } from "./collision-group";
import { CombatInputMappingContext } from "./combat-input-mapping.context";
import { EnemyManager } from "./entities/enemy-manager";
import { Player } from "./entities/player";
import { Portal } from "./entities/portal";
import { LevelInfoWidget } from "./ui/level-info.widget";
import { PlayerStatsWidget } from "./ui/player-stats.widget";
import { VirtualJoystickWidget } from "./ui/virtual-joystick.widget";

export class CombatScene extends Scene {
  private readonly ambientLight: AmbientLight;
  private readonly directionalLight: DirectionalLight;
  private readonly groundMesh: Mesh;
  private readonly enemyManager = this.addEntity(new EnemyManager());
  private readonly portal = this.addEntity(new Portal());
  private readonly collisionService = this.addService(new CollisionService());
  private readonly progressionService = this.addService(new ProgressionService());
  private readonly levelProgressionService = this.addService(new LevelProgressionService());

  private readonly levelInfoWidget?: LevelInfoWidget;

  constructor(private levelConfig?: LevelConfig) {
    super();

    // Add the ground plane
    // Create a large ground plane
    const geometry = new PlaneGeometry(50, 50);
    const material = new MeshLambertMaterial({
      color: 0xc2b280, // Desert sand color for ground
      transparent: false,
    });

    this.groundMesh = new Mesh(geometry, material);

    // Rotate the plane to be horizontal (by default it's vertical)
    this.groundMesh.rotation.x = -Math.PI / 2;
    this.groundMesh.position.y = 0;

    // Enable shadow receiving
    this.groundMesh.receiveShadow = true;
    this.sceneRoot.add(this.groundMesh);

    // Add ambient lighting for general illumination
    this.ambientLight = new AmbientLight(0x404040, 0.6); // Soft white light
    this.sceneRoot.add(this.ambientLight);

    // Add directional lighting for better depth and shadows
    this.directionalLight = new DirectionalLight(0xffffff, 1.0);
    this.directionalLight.position.set(10, 10, 5);
    this.directionalLight.castShadow = true;

    // Configure shadow properties for better quality
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    this.directionalLight.shadow.camera.near = 0.5;
    this.directionalLight.shadow.camera.far = 50;
    this.directionalLight.shadow.camera.left = -20;
    this.directionalLight.shadow.camera.right = 20;
    this.directionalLight.shadow.camera.top = 20;
    this.directionalLight.shadow.camera.bottom = -20;

    this.sceneRoot.add(this.directionalLight);

    // Set the scene input context
    this.input = new CombatInputMappingContext();

    // Add the player entity
    this.addEntity(new Player());

    // Subscribe to player death
    const player = this.getEntity(Player);
    const playerHealth = player.getBehavior(HealthBehavior);
    playerHealth.healthChanged.subscribe((event) => {
      if (!event.isAlive) this.onPlayerDied();
    });

    // Add enemy manager

    // Listen to all enemies cleared event
    this.enemyManager.enemiesCleared.subscribe(this.onAllEnemiesCleared);

    // Setup collision groups
    this.collisionService.addCollisionGroup(CollisionGroup.Player, [
      CollisionGroup.EnemyProjectile,
      CollisionGroup.PickUps,
    ]);
    this.collisionService.addCollisionGroup(CollisionGroup.Enemy, [CollisionGroup.PlayerProjectile]);

    this.collisionService.logGroups();

    // Add UI widgets
    this.addWidget(new PlayerStatsWidget());
    this.addWidget(new VirtualJoystickWidget());

    // Add level info widget if we have level config
    if (this.levelConfig) {
      this.levelInfoWidget = new LevelInfoWidget(this.levelConfig);
      this.addWidget(this.levelInfoWidget);
    }
  }

  override async init() {
    await super.init();

    // Initialize level progression service from save data if available
    if (!this.levelConfig) {
      // If no level config provided, get it from progression service
      this.levelProgressionService.initializeFromSave();
      this.levelConfig = this.levelProgressionService.currentLevel;

      if (this.levelInfoWidget) {
        this.levelInfoWidget.updateLevel(this.levelConfig);
      }
    }

    // Listen to portal reaching event
    this.portal.reached.subscribe(() => {
      const nextLevel = this.levelProgressionService.nextLevel();

      if (nextLevel.levelType === "safe_zone") {
        // Moving to safe zone (next world)
        this.game.loadScene(new SafeZoneScene(nextLevel));
      } else if (nextLevel.levelType === "boss" && nextLevel.worldNumber === 6) {
        // World 6 boss levels - check if game completed
        if (this.levelProgressionService.currentState.isCompleted) {
          this.game.loadScene(new SuccessScene());
        } else {
          this.game.loadScene(new CombatScene(nextLevel));
        }
      } else {
        // Regular combat or boss level
        this.game.loadScene(new CombatScene(nextLevel));
      }
    });

    // Listen to progression events for logging
    this.progressionService.levelUp.subscribe((event) => {
      console.log(`🎉 Level Up! ${event.previousLevel} → ${event.newLevel} (${event.xpToNextLevel} XP to next level)`);
    });

    this.progressionService.xpGained.subscribe((event) => {
      console.log(`💎 +${event.amount} XP (Total: ${event.totalXP}, Level: ${event.currentLevel})`);
    });

    this.addEntity(new XPCrystalEntity(50));

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

  override destroy() {
    // Clean up lights
    this.ambientLight.removeFromParent();
    this.directionalLight.removeFromParent();
    this.directionalLight.dispose();

    // Clean up ground mesh
    destroy(this.groundMesh);

    super.destroy();
  }
}
