import { CollisionService, Scene } from "@engine";
import { HealthBehavior } from "scenes/combat/behaviors/health.behavior";
import { XPCrystalEntity } from "scenes/combat/entities/xp-crystal.entity";
import { ProgressionService } from "services/progression.service";
import { AmbientLight, DirectionalLight, Mesh, MeshLambertMaterial, PlaneGeometry } from "three";
import { destroy } from "utils";
import { CollisionGroup } from "./collision-group";
import { CombatInputMappingContext } from "./combat-input-mapping.context";
import { EnemyManager } from "./entities/enemy-manager";
import { Player } from "./entities/player";
import { PlayerStatsWidget } from "./ui/player-stats.widget";
import { VirtualJoystickWidget } from "./ui/virtual-joystick.widget";

export class CombatScene extends Scene {
  private readonly ambientLight: AmbientLight;
  private readonly directionalLight: DirectionalLight;
  private readonly groundMesh: Mesh;
  private readonly enemyManager = this.addEntity(new EnemyManager());
  private readonly collisionService = this.addService(new CollisionService());
  private readonly progressionService = this.addService(new ProgressionService());

  constructor() {
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
  }

  override async init() {
    await super.init();

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

    // Clean up ground mesh
    destroy(this.groundMesh);

    super.destroy();
  }
}
