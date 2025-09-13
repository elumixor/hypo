import * as THREE from "three";
import type { Game } from "../core/Game";
import { Enemy, EnemyType } from "./Enemy";

export class Spawner {
  enemies: Enemy[] = [];

  constructor(readonly scene: THREE.Scene) {}

  /**
   * Spawn a wave of enemies with AI support
   */
  spawn(count: number, game?: Game, availableTypes: string[] = ["basic"]): void {
    for (let i = 0; i < count; i++) {
      this.addOne(game, availableTypes);
    }
  }

  /**
   * Add a single enemy with random type selection
   */
  addOne(game?: Game, availableTypes: string[] = ["basic"]): void {
    const enemyType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    const aiType = this.getRandomAIType();
    const enemy = Enemy.create(enemyType, aiType);

    if (game) {
      enemy.initializeAI(game);
    }

    this.enemies.push(enemy);
    this.scene.add(enemy.mesh);
  }

  /**
   * Get random AI type with weighted distribution
   */
  private getRandomAIType(): EnemyType {
    const rand = Math.random();

    // Weighted distribution of enemy types
    if (rand < 0.4) return EnemyType.RANGE; // 40% - Most common
    if (rand < 0.65) return EnemyType.MELEE; // 25%
    if (rand < 0.85) return EnemyType.NUKER; // 20%
    return EnemyType.CHARGER; // 15% - Least common
  }

  /**
   * Remove an enemy and dispose of its resources
   */
  remove(enemy: Enemy): void {
    enemy.kill();

    // Remove from scene safely
    if (enemy.mesh.parent) {
      this.scene.remove(enemy.mesh);
    }

    // Dispose of resources
    enemy.dispose();

    // Remove from enemies array
    const index = this.enemies.indexOf(enemy);
    if (index >= 0) {
      this.enemies.splice(index, 1);
    }
  }

  /**
   * Ensure minimum wave size
   */
  ensureWave(size: number, game?: Game, availableTypes: string[] = ["basic"]): void {
    const aliveCount = this.enemies.filter((e) => e.isAlive()).length;
    if (aliveCount < size) {
      const toSpawn = size - aliveCount;
      this.spawn(toSpawn, game, availableTypes);
    }
  }

  /**
   * Update all enemies (including AI)
   */
  update(dt: number): void {
    for (const enemy of this.enemies) {
      if (!enemy.dead) {
        enemy.update(dt);
      }
    }
  }

  /**
   * Get all alive enemies
   */
  getAliveEnemies(): Enemy[] {
    return this.enemies.filter((e) => e.isAlive());
  }

  /**
   * Clear all enemies
   */
  clearAll(): void {
    for (const enemy of [...this.enemies]) {
      this.remove(enemy);
    }
  }

  /**
   * Spawn enemy at specific position (for level-based spawning)
   */
  spawnAtPosition(x: number, z: number, game?: Game, enemyType: string = "basic"): void {
    const aiType = this.getRandomAIType();
    const position = new THREE.Vector3(x, 0.4, z);
    const enemy = Enemy.create(enemyType, aiType, position);

    if (game) {
      enemy.initializeAI(game);
    }

    this.enemies.push(enemy);
    this.scene.add(enemy.mesh);
  }

  /**
   * Get enemy count
   */
  get count(): number {
    return this.enemies.length;
  }

  /**
   * Get alive enemy count
   */
  get aliveCount(): number {
    return this.enemies.filter((e) => e.isAlive()).length;
  }
}
