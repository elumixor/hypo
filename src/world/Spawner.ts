import type * as THREE from "three";
import type { Game } from "../core/Game";
import { EnemyType } from "./ai/EnemyAI";
import { Enemy } from "./Enemy";

export class Spawner {
  enemies: Enemy[] = [];

  constructor(readonly scene: THREE.Scene) {}

  spawn(count: number, game?: Game) {
    for (let i = 0; i < count; i++) {
      const enemyType = this.getRandomEnemyType();
      const enemy = Enemy.create(enemyType);

      if (game) {
        enemy.initializeAI(game);
      }

      this.enemies.push(enemy);
      this.scene.add(enemy.mesh);
    }
  }

  private getRandomEnemyType(): EnemyType {
    const rand = Math.random();

    // Weighted distribution of enemy types
    if (rand < 0.4) return EnemyType.RANGE; // 40% - Most common
    if (rand < 0.65) return EnemyType.MELEE; // 25%
    if (rand < 0.85) return EnemyType.NUKER; // 20%
    return EnemyType.CHARGER; // 15% - Least common
  }

  addOne(game?: Game) {
    const enemyType = this.getRandomEnemyType();
    const e = Enemy.create(enemyType);

    if (game) {
      e.initializeAI(game);
    }

    this.scene.add(e.mesh);
    this.enemies.push(e);
  }

  remove(e: Enemy) {
    e.dead = true;
    // remove from scene safely
    if (e.mesh.parent) this.scene.remove(e.mesh);
    const geom = e.mesh.geometry as THREE.BufferGeometry | undefined;
    const mat = e.mesh.material as THREE.Material | undefined;
    geom?.dispose?.();
    (mat as THREE.Material | undefined)?.dispose?.();
    const idx = this.enemies.indexOf(e);
    if (idx >= 0) this.enemies.splice(idx, 1);
  }

  ensureWave(size: number, game?: Game) {
    if (!this.enemies.length) this.spawn(size, game);
  }

  update(dt: number) {
    // Update all enemy AI
    for (const enemy of this.enemies) {
      if (!enemy.dead) {
        enemy.update(dt);
      }
    }
  }

  clear() {
    for (const enemy of this.enemies) {
      this.scene.remove(enemy.mesh);
    }
    this.enemies.length = 0;
  }
}
