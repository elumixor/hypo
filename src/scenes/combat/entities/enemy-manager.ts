import { EventEmitter } from "@elumixor/event-emitter";
import { Entity, TransformBehavior } from "@engine";
import { Enemy } from "./enemy";
import { Player } from "./player";
import { XPCrystal } from "./xp-crystal";
import type { Transform3D } from "../../configs";

// TODO: this should not be an Entity - does not need to be physically in the scene
// It can be a Service, or just a plain class on the CombatScene, or simply code in the scene itself
export class EnemyManager extends Entity {
  // Public events
  readonly enemiesCleared = new EventEmitter();

  // References
  private playerTransform!: TransformBehavior;

  // Configuration
  private readonly enemyCount = 3;
  private enemySpawnPoints: Transform3D[] = [];

  /**
   * Set the enemy spawn points from configuration
   */
  setSpawnPoints(spawnPoints: Transform3D[]): void {
    this.enemySpawnPoints = spawnPoints;
  }

  override async init() {
    await super.init();

    // Find player in the scene
    this.playerTransform = this.scene.getEntity(Player).getBehavior(TransformBehavior);
  }

  spawn() {
    const spawnCount = Math.min(this.enemyCount, this.enemySpawnPoints.length);
    
    // If we have configured spawn points, use them, otherwise fall back to random placement
    if (this.enemySpawnPoints.length > 0) {
      for (let i = 0; i < spawnCount; i++) {
        this.spawnEnemyAtPoint(this.enemySpawnPoints[i]!);
      }
    } else {
      // Fallback to random spawning
      for (let i = 0; i < this.enemyCount; i++) {
        this.spawnEnemyRandom();
      }
    }
  }

  private spawnEnemyAtPoint(spawnPoint: Transform3D) {
    const enemy = new Enemy();

    enemy.x = spawnPoint.x;
    enemy.y = spawnPoint.y;
    enemy.z = spawnPoint.z;

    // Listen to enemy death
    enemy.died.subscribe(() => this.onEnemyDied(enemy));

    this.scene.addEntity(enemy);
  }

  private spawnEnemyRandom() {
    const enemy = new Enemy();

    // Set random position around player
    const playerPos = this.playerTransform.group.position;
    const angle = Math.random() * Math.PI * 2; // Random angle around player
    const distance = 10 + Math.random() * 10; // Random distance between 10-20 units

    enemy.x = playerPos.x + Math.cos(angle) * distance;
    enemy.y = 5; // fixme: 5... magic constant in many places -> move to some config at least
    enemy.z = playerPos.z + Math.sin(angle) * distance;

    // Listen to enemy death
    enemy.died.subscribe(() => this.onEnemyDied(enemy));

    this.scene.addEntity(enemy);
  }

  private onEnemyDied(enemy: Enemy) {
    // Get enemy position before removing it
    const enemyPosition = enemy.position.clone();

    this.scene.removeEntity(enemy);

    // Spawn XP crystal at enemy position
    const xpCrystal = new XPCrystal(150); // Give 150 XP per enemy. todo: this should be retrieved from enemy data
    xpCrystal.position.copy(enemyPosition);
    xpCrystal.y = 5; // Slightly above ground
    this.scene.addEntity(xpCrystal);

    // Check if all enemies are cleared
    if (this.scene.getEntities(Enemy).isEmpty) this.enemiesCleared.emit();
  }
}
