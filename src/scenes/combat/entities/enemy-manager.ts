import { EventEmitter } from "@elumixor/event-emitter";
import { Entity, TransformBehavior } from "@engine";
import { XPCrystalEntity } from "entities/xp-crystal.entity";
import { Enemy } from "./enemy";
import { Player } from "./player";

export class EnemyManager extends Entity {
  // Public events
  readonly enemiesCleared = new EventEmitter();

  // References
  private playerTransform!: TransformBehavior;

  // Configuration
  private readonly enemyCount = 3;

  // State
  private readonly enemies: Enemy[] = [];

  override async init() {
    await super.init();

    // Find player in the scene
    this.playerTransform = this.scene.getEntity(Player).getBehavior(TransformBehavior);
  }

  spawn() {
    for (let i = 0; i < this.enemyCount; i++) this.spawnEnemy();
  }

  private spawnEnemy() {
    const enemy = new Enemy();

    // Set random position around player
    const playerPos = this.playerTransform.group.position;
    const angle = Math.random() * Math.PI * 2; // Random angle around player
    const distance = 10 + Math.random() * 10; // Random distance between 10-20 units
    const x = playerPos.x + Math.cos(angle) * distance;
    const z = playerPos.z + Math.sin(angle) * distance;

    const enemyTransform = enemy.getBehavior(TransformBehavior);
    enemyTransform.group.position.set(x, 5, z);

    // Listen to enemy death
    enemy.enemyDied.subscribe(() => this.onEnemyDied(enemy));

    this.enemies.push(enemy);
    this.scene.addEntity(enemy);
  }

  private onEnemyDied(enemy: Enemy) {
    // Get enemy position before removing it
    const enemyTransform = enemy.getBehavior(TransformBehavior);
    const enemyPosition = enemyTransform.group.position.clone();

    this.enemies.remove(enemy);
    this.scene.removeEntity(enemy);

    // Spawn XP crystal at enemy position
    const xpCrystal = new XPCrystalEntity(15); // Give 15 XP per enemy
    const crystalTransform = xpCrystal.getBehavior(TransformBehavior);
    crystalTransform.group.position.copy(enemyPosition);
    crystalTransform.group.position.y = 1; // Slightly above ground
    this.scene.addEntity(xpCrystal);

    // Check if all enemies are cleared
    if (this.enemies.isEmpty) this.enemiesCleared.emit();
  }
}
