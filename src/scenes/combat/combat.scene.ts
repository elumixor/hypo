import { CollisionService, Effects, Scene } from "@engine";
import { collisionGroups } from "collision-group";
import { resources } from "resources";
import { HealthBehavior } from "scenes/combat/behaviors/health.behavior";
import { DeathScene } from "scenes/death/death.scene";
import { SafeZoneScene } from "scenes/safe-zone/safe-zone.scene";
import { SuccessScene } from "scenes/success/success.scene";
import { type LevelConfig, LevelProgressionService } from "services/level-progression.service";
import {
  AmbientLight,
  BackSide,
  DirectionalLight,
  Fog,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  SphereGeometry,
  Vector2,
} from "three";
import { CombatInputMappingContext } from "./combat-input-mapping.context";
import { EnemyManager } from "./entities/enemy-manager";
import { FloatingLightSphere } from "./entities/floating-light-sphere";
import { Player } from "./entities/player";
import { Portal } from "./entities/portal";
import { RockManager } from "./entities/rock-manager";
import { CombatEventsService } from "./services/combat-events.service";
import { DamageTextService } from "./services/damage-text.service";
import { ProjectilePoolService } from "./services/projectile-pool.service";
import { CharacterPortraitWidget } from "./ui/character-portrait.widget";
import { LevelInfoWidget } from "./ui/level-info.widget";
import { PlayerStatsWidget } from "./ui/player-stats.widget";
import { VirtualJoystickWidget } from "./ui/virtual-joystick.widget";
import { XPBarWidget } from "./ui/xp-bar.widget";

export class CombatScene extends Scene {
  private readonly ambientLight: AmbientLight;
  private readonly directionalLight: DirectionalLight;
  private groundMesh!: Mesh;
  private skybox!: Mesh;
  private readonly fog: Fog;
  private readonly enemyManager = this.addEntity(new EnemyManager());
  private readonly portal = this.addEntity(new Portal());
  private readonly collisionService = this.addService(new CollisionService());

  private readonly floatingLights: FloatingLightSphere[] = [];
  private levelProgressionService!: LevelProgressionService;

  private readonly levelInfoWidget?: LevelInfoWidget;

  // fixme: we shouldn't pass level config here, should be from service
  constructor(private levelConfig?: LevelConfig) {
    super();

    this.addService(new CombatEventsService());
    this.addService(new DamageTextService());
    this.addService(new ProjectilePoolService());

    // Add volumetric fog for atmospheric effect
    this.fog = new Fog(0x2a2a3a, 10, 120); // Dark blue-gray fog, starts at distance 5, ends at 80

    // Add ambient lighting for general illumination
    this.ambientLight = new AmbientLight(0x404040, 0.6); // Soft white light
    this.sceneRoot.add(this.ambientLight);

    // Add directional lighting for better depth and shadows
    this.directionalLight = new DirectionalLight(0xffffff, 0.25);
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

    // Add rocks to the scene
    this.addEntity(new RockManager());

    // Subscribe to player death
    const player = this.getEntity(Player);
    const playerHealth = player.getBehavior(HealthBehavior);
    this.on(playerHealth.healthChanged, ({ isAlive }) => {
      if (!isAlive) this.onPlayerDied();
    });

    // Add enemy manager

    // Listen to all enemies cleared event
    this.on(this.enemyManager.enemiesCleared, this.onAllEnemiesCleared.bind(this));

    // Setup collision groups
    for (const [source, targets] of Object.entries(collisionGroups))
      this.collisionService.addCollisionGroup(source, targets);

    this.collisionService.logCollisionMatrix();

    // Add UI widgets
    this.addWidget(new PlayerStatsWidget());
    this.addWidget(new VirtualJoystickWidget());
    this.addWidget(new CharacterPortraitWidget());
    this.addWidget(new XPBarWidget());

    // Create floating light spheres for ambient lighting
    const lightPositions = [
      { x: -15, y: 12, z: -10, color: 0xffddaa, intensity: 1.0 }, // Warm white
      { x: 20, y: 15, z: 8, color: 0x00ddff, intensity: 0.8 }, // Cool blue
      { x: 5, y: 18, z: -18, color: 0xffffaa, intensity: 1.2 }, // Bright yellow
      { x: -8, y: 14, z: 15, color: 0xffaadd, intensity: 0.9 }, // Pink
    ];

    for (const pos of lightPositions) {
      const light = new FloatingLightSphere(
        pos.color,
        pos.intensity,
        0.0008 + Math.random() * 0.0004, // slightly different float speeds
        1.5 + Math.random(), // random amplitude
      );

      light.position.copy(pos);
      this.floatingLights.push(light);
      this.addEntity(light);
    }

    // Add level info widget if we have level config
    if (this.levelConfig) {
      this.levelInfoWidget = new LevelInfoWidget(this.levelConfig);
      this.addWidget(this.levelInfoWidget);
    }
  }

  override async init() {
    await super.init();

    this.levelProgressionService = this.getService(LevelProgressionService);

    // fixme: we shouldn't configure this here (most likely). Level progression service is game-wide
    // Initialize level progression service from save data if available
    if (!this.levelConfig) {
      // If no level config provided, get it from progression service
      this.levelProgressionService.initializeFromSave();
      this.levelConfig = this.levelProgressionService.currentLevel;

      if (this.levelInfoWidget) this.levelInfoWidget.updateLevel(this.levelConfig);
    }

    // Listen to portal reaching event
    this.on(this.portal.reached, this.onPortalReached.bind(this));

    // Configure post-processing effects
    this.effects = new Effects(this.game.sceneRoot, this.game.camera, this.game.threeRenderer, {
      bloom: {
        enabled: true,
        intensity: 10,
        radius: 0.5,
        luminanceThreshold: 0.2,
        luminanceSmoothing: 0.3,
      },
      chromaticAberration: {
        enabled: true,
        offset: new Vector2(0.002, 0.002),
      },
      depthOfField: {
        enabled: true, // Can be enabled dynamically
        focusDistance: 0.035,
        focalLength: 0.02,
        bokehScale: 3.0,
      },
    });

    // Add the ground plane with improved material
    const geometry = new PlaneGeometry(50, 50);
    // Use MeshStandardMaterial for better lighting and potential PBR textures
    const material = new MeshStandardMaterial({
      map: resources.get("textures/ground/diffuse"),
      normalMap: resources.get("textures/ground/normal"),
      roughnessMap: resources.get("textures/ground/arm"),
      metalnessMap: resources.get("textures/ground/arm"),
    });

    this.groundMesh = new Mesh(geometry, material);

    // Rotate the plane to be horizontal (by default it's vertical)
    this.groundMesh.rotation.x = -Math.PI / 2;
    this.groundMesh.position.y = 0;

    // Enable shadow receiving
    this.groundMesh.receiveShadow = true;
    this.sceneRoot.add(this.groundMesh);

    // Create skybox using HDR texture
    const skyboxGeometry = new SphereGeometry(1000, 32, 16);
    const skyboxMaterial = new MeshBasicMaterial({
      map: resources.get("textures/skybox/storm"),
      side: BackSide, // Render on the inside
      fog: false, // Don't apply fog to skybox
    });

    this.skybox = new Mesh(skyboxGeometry, skyboxMaterial);
    this.skybox.rotation.y = (-3 * Math.PI) / 4; // Rotate 90 degrees
    this.skybox.rotation.x = -Math.PI / 2; // Rotate 90 degrees
    this.camera.add(this.skybox);

    // Apply fog to the scene
    this.game.sceneRoot.fog = this.fog;

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
    // Clean up lights
    this.ambientLight.dispose();
    this.directionalLight.dispose();

    // Clear fog
    if (this.game.sceneRoot.fog) this.game.sceneRoot.fog = null;

    super.destroy();
  }
}
