import { CollisionService, Scene } from "@engine";
import { HealthBehavior } from "scenes/combat/behaviors/health.behavior";
import { XPCrystalEntity } from "scenes/combat/entities/xp-crystal.entity";
import { ProgressionService } from "services/progression.service";
import {
  AmbientLight,
  BackSide,
  BoxGeometry,
  DirectionalLight,
  Fog,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
} from "three";
import { destroy } from "utils";
import { CollisionGroup } from "./collision-group";
import { CombatInputMappingContext } from "./combat-input-mapping.context";
import { EnemyManager } from "./entities/enemy-manager";
import { FloatingLightSphere } from "./entities/floating-light-sphere";
import { Player } from "./entities/player";
import { RockManager } from "./entities/rock-manager";
import { PlayerStatsWidget } from "./ui/player-stats.widget";
import { VirtualJoystickWidget } from "./ui/virtual-joystick.widget";

export class CombatScene extends Scene {
  private readonly ambientLight: AmbientLight;
  private readonly directionalLight: DirectionalLight;
  private readonly groundMesh: Mesh;
  private readonly skybox: Mesh;
  private readonly fog: Fog;
  private readonly enemyManager = this.addEntity(new EnemyManager());
  private readonly collisionService = this.addService(new CollisionService());
  private readonly progressionService = this.addService(new ProgressionService());

  private readonly floatingLights: FloatingLightSphere[] = [];

  constructor() {
    super();

    // Add the ground plane with improved material
    const geometry = new PlaneGeometry(50, 50);
    // Use MeshStandardMaterial for better lighting and potential PBR textures
    const material = new MeshStandardMaterial({
      color: 0xc2b280, // Desert sand color for ground
      roughness: 0.8,
      metalness: 0.0,
      // TODO: Add textures when available:
      // map: textureLoader.load('/assets/textures/ground/diffuse.png'),
      // normalMap: textureLoader.load('/assets/textures/ground/normal.png'),
      // roughnessMap: textureLoader.load('/assets/textures/ground/arm.png'),
      // metalnessMap: textureLoader.load('/assets/textures/ground/arm.png'),
    });

    this.groundMesh = new Mesh(geometry, material);

    // Rotate the plane to be horizontal (by default it's vertical)
    this.groundMesh.rotation.x = -Math.PI / 2;
    this.groundMesh.position.y = 0;

    // Enable shadow receiving
    this.groundMesh.receiveShadow = true;
    this.sceneRoot.add(this.groundMesh);

    // Create skybox - a large cube with gradient material
    const skyboxGeometry = new BoxGeometry(200, 200, 200);
    const skyboxMaterial = new MeshBasicMaterial({
      color: 0x1a1a2e, // Dark blue-purple base color
      side: BackSide, // Render on the inside
      fog: false, // Don't apply fog to skybox
    });

    this.skybox = new Mesh(skyboxGeometry, skyboxMaterial);
    this.sceneRoot.add(this.skybox);

    // Add volumetric fog for atmospheric effect
    this.fog = new Fog(0x2a2a3a, 5, 80); // Dark blue-gray fog, starts at distance 5, ends at 80

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

    // Add rocks to the scene
    this.addEntity(new RockManager());

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

    // Static objects (rocks) should collide with both player and enemy projectiles
    this.collisionService.addCollisionGroup(CollisionGroup.Static, [
      CollisionGroup.PlayerProjectile,
      CollisionGroup.EnemyProjectile,
    ]);

    this.collisionService.logGroups();

    // Add UI widgets
    this.addWidget(new PlayerStatsWidget());
    this.addWidget(new VirtualJoystickWidget());

    // Create floating light spheres for ambient lighting
    this.createFloatingLights();
  }

  private createFloatingLights() {
    const lightPositions = [
      { x: -15, y: 12, z: -10, color: 0xffddaa, intensity: 1.0 }, // Warm white
      { x: 20, y: 15, z: 8, color: 0xaaddff, intensity: 0.8 }, // Cool blue
      { x: 5, y: 18, z: -18, color: 0xffffaa, intensity: 1.2 }, // Bright yellow
      { x: -8, y: 14, z: 15, color: 0xffaadd, intensity: 0.9 }, // Pink
    ];

    for (const pos of lightPositions) {
      const light = new FloatingLightSphere(
        pos.color,
        pos.intensity,
        30, // distance
        0.0008 + Math.random() * 0.0004, // slightly different float speeds
        1.5 + Math.random(), // random amplitude
      );

      light.setPosition(pos.x, pos.y, pos.z);
      this.floatingLights.push(light);
      this.addEntity(light);
    }
  }

  override async init() {
    await super.init();

    // Apply fog to the scene
    this.game.sceneRoot.fog = this.fog;

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
    // Let's just reload the scene for now
    void this.game.loadScene(new CombatScene());
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

    // Clean up ground mesh and skybox
    destroy(this.groundMesh);
    destroy(this.skybox);

    // Clear fog
    if (this.game.sceneRoot.fog) this.game.sceneRoot.fog = null;

    super.destroy();
  }
}
