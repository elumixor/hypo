import * as THREE from "three";
import type { Enemy } from "../world/Enemy";
import type { ProjectileTarget } from "./ProjectileTarget";

export class Projectile {
  constructor(
    readonly mesh: THREE.Mesh,
    readonly vel: THREE.Vector3,
    readonly fromPlayer: boolean,
  ) {}
}

/**
 * Projectiles class that works with the new component system
 */
export class Projectiles {
  list: Projectile[] = [];
  readonly geo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  readonly matPlayer = new THREE.MeshStandardMaterial({ color: "#ffe14e", emissive: "#8d6f00" });
  readonly matEnemy = new THREE.MeshStandardMaterial({ color: "#ff7b72", emissive: "#6e1212" });

  add(from: THREE.Vector3, dir: THREE.Vector3, fromPlayer: boolean, scene: THREE.Scene) {
    const mesh = new THREE.Mesh(this.geo, fromPlayer ? this.matPlayer : this.matEnemy);
    mesh.position.copy(from);
    scene.add(mesh);
    this.list.push(new Projectile(mesh, dir.clone().normalize().multiplyScalar(6), fromPlayer));
  }

  update(
    dt: number,
    scene: THREE.Scene,
    player: ProjectileTarget,
    enemies: Enemy[],
    onPlayerHit: () => void,
    onEnemyKilled: (e: Enemy) => void,
  ) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const p = this.list[i];
      if (!p) continue;

      p.mesh.position.addScaledVector(p.vel, dt);

      // Remove projectiles that go too far
      if (p.mesh.position.length() > 30) {
        this.disposeAt(i, scene);
        continue;
      }

      if (p.fromPlayer) {
        // Player projectiles hit enemies
        for (const e of enemies) {
          if (p.mesh.position.distanceTo(e.mesh.position) < 0.6) {
            e.takeDamage(1);
            this.disposeAt(i, scene);
            if (e.hp <= 0) onEnemyKilled(e);
            break;
          }
        }
      } else {
        // Enemy projectiles hit player
        if (p.mesh.position.distanceTo(player.mesh.position) < 0.6) {
          // Check shield
          const shieldRadius = 1.1; // Must match player shield geometry
          if (player.shieldActive && p.mesh.position.distanceTo(player.mesh.position) <= shieldRadius) {
            log("Projectiles", "consumed-by-shield");
            this.disposeAt(i, scene);
            continue;
          }

          onPlayerHit();
          this.disposeAt(i, scene);
        }
      }
    }
  }

  disposeAt(i: number, scene: THREE.Scene) {
    const p = this.list[i];
    if (!p) return;

    scene.remove(p.mesh);
    p.mesh.geometry.dispose();
    (p.mesh.material as THREE.Material).dispose();
    this.list.splice(i, 1);
  }

  /**
   * Clean up all projectiles
   */
  destroy(scene: THREE.Scene) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      this.disposeAt(i, scene);
    }
  }
}
