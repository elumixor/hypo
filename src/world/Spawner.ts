import type * as THREE from "three";
import { Enemy } from "./Enemy";

export class Spawner {
  enemies: Enemy[] = [];

  constructor(readonly scene: THREE.Scene) {}

  /**
   * Spawn a wave of enemies
   */
  spawn(count: number, availableTypes: string[] = ["basic"]): void {
    for (let i = 0; i < count; i++) {
      this.addOne(availableTypes);
    }
  }

  /**
   * Add a single enemy
   */
  addOne(availableTypes: string[] = ["basic"]): void {
    const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    const enemy = Enemy.create(type);
    this.scene.add(enemy.mesh);
    this.enemies.push(enemy);
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
  ensureWave(size: number, availableTypes: string[] = ["basic"]): void {
    const aliveCount = this.enemies.filter((e) => e.isAlive()).length;
    if (aliveCount < size) {
      const toSpawn = size - aliveCount;
      this.spawn(toSpawn, availableTypes);
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
    for (const enemy of this.enemies) {
      if (enemy.mesh.parent) {
        this.scene.remove(enemy.mesh);
      }
      enemy.dispose();
    }
    this.enemies.length = 0;
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
