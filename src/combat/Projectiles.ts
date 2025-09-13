import * as THREE from "three";
import { GameConfig } from "../config/GameConfig";
import { gameEvents } from "../events/GameEvents";
import type { Enemy } from "../world/Enemy";
import type { Player } from "../world/Player";

export class Projectile {
  constructor(
    readonly mesh: THREE.Mesh,
    readonly vel: THREE.Vector3,
    readonly fromPlayer: boolean,
    readonly damage: number = 1,
  ) {}
}

export class Projectiles {
  list: Projectile[] = [];
  readonly geometry = new THREE.BoxGeometry(
    GameConfig.COMBAT.PROJECTILE_SIZE,
    GameConfig.COMBAT.PROJECTILE_SIZE,
    GameConfig.COMBAT.PROJECTILE_SIZE,
  );
  readonly playerMaterial = new THREE.MeshStandardMaterial({
    color: GameConfig.COLORS.PROJECTILE_PLAYER,
    emissive: "#8d6f00",
  });
  readonly enemyMaterial = new THREE.MeshStandardMaterial({
    color: GameConfig.COLORS.PROJECTILE_ENEMY,
    emissive: "#6e1212",
  });

  /**
   * Add a new projectile
   */
  add(from: THREE.Vector3, dir: THREE.Vector3, fromPlayer: boolean, scene: THREE.Scene, damage: number = 1): void {
    const mesh = new THREE.Mesh(this.geometry, fromPlayer ? this.playerMaterial : this.enemyMaterial);
    mesh.position.copy(from);
    scene.add(mesh);

    const velocity = dir.clone().normalize().multiplyScalar(GameConfig.COMBAT.PROJECTILE_SPEED);
    this.list.push(new Projectile(mesh, velocity, fromPlayer, damage));

    // Emit event
    gameEvents.emit("combat:projectile:spawn", {
      fromPlayer,
      position: { x: from.x, y: from.y, z: from.z },
    });
  }

  /**
   * Update all projectiles
   */
  update(
    dt: number,
    scene: THREE.Scene,
    player: Player,
    enemies: Enemy[],
    onPlayerHit: () => void,
    onEnemyKilled: (e: Enemy) => void,
  ): void {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const projectile = this.list[i];
      if (!projectile) continue;

      // Move projectile
      projectile.mesh.position.addScaledVector(projectile.vel, dt);

      // Check if projectile is out of range
      if (projectile.mesh.position.length() > GameConfig.COMBAT.PROJECTILE_RANGE) {
        this.disposeAt(i, scene);
        continue;
      }

      // Check collisions
      if (projectile.fromPlayer) {
        this.checkPlayerProjectileHits(projectile, enemies, i, scene, onEnemyKilled);
      } else {
        this.checkEnemyProjectileHits(projectile, player, i, scene, onPlayerHit);
      }
    }
  }

  /**
   * Check collisions for player projectiles against enemies
   */
  private checkPlayerProjectileHits(
    projectile: Projectile,
    enemies: Enemy[],
    projectileIndex: number,
    scene: THREE.Scene,
    onEnemyKilled: (e: Enemy) => void,
  ): void {
    for (const enemy of enemies) {
      if (!enemy.isAlive()) continue;

      const distance = projectile.mesh.position.distanceTo(enemy.mesh.position);
      if (distance < GameConfig.COMBAT.HIT_DISTANCE) {
        // Deal damage to enemy
        enemy.takeDamage(projectile.damage);
        this.disposeAt(projectileIndex, scene);

        if (!enemy.isAlive()) {
          onEnemyKilled(enemy);
        }

        break; // Projectile can only hit one enemy
      }
    }
  }

  /**
   * Check collisions for enemy projectiles against player
   */
  private checkEnemyProjectileHits(
    projectile: Projectile,
    player: Player,
    projectileIndex: number,
    scene: THREE.Scene,
    onPlayerHit: () => void,
  ): void {
    const distance = projectile.mesh.position.distanceTo(player.mesh.position);
    if (distance < GameConfig.COMBAT.HIT_DISTANCE) {
      // Check if player is blocking
      if (player.shieldActive) {
        // Blocked - just remove projectile
        log("Projectiles", "blocked-by-shield");
        this.disposeAt(projectileIndex, scene);
        return;
      }

      // Hit player
      onPlayerHit();
      this.disposeAt(projectileIndex, scene);
    }
  }

  /**
   * Dispose of projectile at specific index
   */
  disposeAt(index: number, scene: THREE.Scene): void {
    const projectile = this.list[index];
    if (!projectile) return;

    scene.remove(projectile.mesh);
    projectile.mesh.geometry.dispose();
    (projectile.mesh.material as THREE.Material).dispose();
    this.list.splice(index, 1);
  }

  /**
   * Clear all projectiles
   */
  clearAll(scene: THREE.Scene): void {
    for (const projectile of this.list) {
      scene.remove(projectile.mesh);
      projectile.mesh.geometry.dispose();
      (projectile.mesh.material as THREE.Material).dispose();
    }
    this.list.length = 0;
  }

  /**
   * Get projectile count
   */
  get count(): number {
    return this.list.length;
  }

  /**
   * Dispose of shared resources
   */
  dispose(): void {
    this.geometry.dispose();
    this.playerMaterial.dispose();
    this.enemyMaterial.dispose();
  }
}
