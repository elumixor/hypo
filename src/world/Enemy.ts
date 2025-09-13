import * as THREE from "three";
import type { Game } from "../core/Game";
import { AIFactory } from "./ai/AIFactory";
import type { EnemyAI } from "./ai/EnemyAI";
import { EnemyType } from "./ai/EnemyAI";

export class Enemy {
  hp = 3;
  maxHp = 3;
  dead = false;
  tShoot = performance.now() + 800 + Math.random() * 800;
  ai?: EnemyAI;

  constructor(
    readonly mesh: THREE.Mesh,
    public readonly type: EnemyType = EnemyType.RANGE,
  ) {}

  static create(type: EnemyType = EnemyType.RANGE) {
    const enemy = Enemy.createByType(type);
    enemy.mesh.position.set(
      Math.cos(Math.random() * Math.PI * 2) * (3 + Math.random() * 3),
      0.35,
      Math.sin(Math.random() * Math.PI * 2) * (3 + Math.random() * 3),
    );
    return enemy;
  }

  static createByType(type: EnemyType): Enemy {
    let geo: THREE.BufferGeometry;
    let mat: THREE.MeshStandardMaterial;
    let hp = 3;

    switch (type) {
      case EnemyType.RANGE:
        geo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
        mat = new THREE.MeshStandardMaterial({ color: "#ff2b2b" });
        hp = 3;
        break;

      case EnemyType.MELEE:
        geo = new THREE.ConeGeometry(0.4, 1.2, 8);
        mat = new THREE.MeshStandardMaterial({ color: "#ff6600" });
        hp = 4;
        break;

      case EnemyType.NUKER:
        geo = new THREE.OctahedronGeometry(0.6);
        mat = new THREE.MeshStandardMaterial({ color: "#aa2244" });
        hp = 5;
        break;

      case EnemyType.CHARGER:
        geo = new THREE.CylinderGeometry(0.3, 0.6, 1.0, 6);
        mat = new THREE.MeshStandardMaterial({ color: "#8844bb" });
        hp = 6;
        break;
    }

    const mesh = new THREE.Mesh(geo, mat);
    const enemy = new Enemy(mesh, type);
    enemy.hp = enemy.maxHp = hp;
    return enemy;
  }

  initializeAI(game: Game) {
    this.ai = AIFactory.createAI(this, game);
  }

  update(dt: number) {
    if (this.ai && !this.dead) {
      this.ai.update(dt);
    }
  }

  takeDamage(amount: number): boolean {
    if (this.dead) return false;

    this.hp -= amount;
    if (this.hp <= 0) {
      this.dead = true;
      return true; // Enemy died
    }
    return false; // Enemy still alive
  }
}
