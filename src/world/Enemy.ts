import * as THREE from "three";
import { GameConfig } from "../config/GameConfig";

/**
 * Base enemy configuration
 */
export interface EnemyConfig {
  hp: number;
  color: string;
  size: number;
  speed: number;
  damage: number;
  shootCooldownMin: number;
  shootCooldownVariance: number;
}

/**
 * Default enemy configurations for different types
 */
export const ENEMY_CONFIGS = {
  basic: {
    hp: GameConfig.ENEMIES.BASE_HP,
    color: GameConfig.COLORS.ENEMY,
    size: 0.7,
    speed: GameConfig.ENEMIES.MOVEMENT_SPEED,
    damage: 1,
    shootCooldownMin: GameConfig.ENEMIES.SHOOT_COOLDOWN_MIN,
    shootCooldownVariance: GameConfig.ENEMIES.SHOOT_COOLDOWN_VARIANCE,
  },
  // Future enemy types can be added here
  fast: {
    hp: 2,
    color: "#ff8c42",
    size: 0.5,
    speed: 2.0,
    damage: 1,
    shootCooldownMin: 600,
    shootCooldownVariance: 400,
  },
  tank: {
    hp: 6,
    color: "#8b0000",
    size: 1.0,
    speed: 0.8,
    damage: 2,
    shootCooldownMin: 1200,
    shootCooldownVariance: 800,
  },
} as const satisfies Record<string, EnemyConfig>;

export class Enemy {
  hp: number;
  readonly maxHp: number;
  dead = false;
  tShoot: number;
  readonly config: EnemyConfig;
  readonly type: string;

  constructor(
    readonly mesh: THREE.Mesh,
    type: string = "basic",
  ) {
    this.type = type;
    this.config = ENEMY_CONFIGS[type as keyof typeof ENEMY_CONFIGS] || ENEMY_CONFIGS.basic;
    this.hp = this.config.hp;
    this.maxHp = this.config.hp;
    this.tShoot = performance.now() + this.config.shootCooldownMin + Math.random() * this.config.shootCooldownVariance;
  }

  /**
   * Create an enemy of a specific type
   */
  static create(type: string = "basic", position?: THREE.Vector3): Enemy {
    const config = ENEMY_CONFIGS[type as keyof typeof ENEMY_CONFIGS] || ENEMY_CONFIGS.basic;

    const geometry = new THREE.BoxGeometry(config.size, config.size, config.size);
    const material = new THREE.MeshStandardMaterial({ color: config.color });
    const mesh = new THREE.Mesh(geometry, material);

    if (position) {
      mesh.position.copy(position);
    } else {
      // Default spawn position (random around origin)
      mesh.position.set(
        Math.cos(Math.random() * Math.PI * 2) * (3 + Math.random() * 3),
        config.size * 0.5, // Half height above ground
        Math.sin(Math.random() * Math.PI * 2) * (3 + Math.random() * 3),
      );
    }

    return new Enemy(mesh, type);
  }

  /**
   * Create multiple enemies of random types
   */
  static createWave(count: number, availableTypes: string[] = ["basic"]): Enemy[] {
    const enemies: Enemy[] = [];

    for (let i = 0; i < count; i++) {
      const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
      enemies.push(Enemy.create(type));
    }

    return enemies;
  }

  /**
   * Take damage and return actual damage dealt
   */
  takeDamage(amount: number): number {
    const oldHp = this.hp;
    this.hp = Math.max(0, this.hp - amount);
    return oldHp - this.hp;
  }

  /**
   * Check if enemy should shoot based on its cooldown
   */
  shouldShoot(currentTime: number): boolean {
    if (currentTime >= this.tShoot) {
      this.tShoot = currentTime + this.config.shootCooldownMin + Math.random() * this.config.shootCooldownVariance;
      return true;
    }
    return false;
  }

  /**
   * Get movement speed for this enemy
   */
  getMovementSpeed(): number {
    return this.config.speed;
  }

  /**
   * Get damage this enemy deals
   */
  getDamage(): number {
    return this.config.damage;
  }

  /**
   * Mark enemy as dead and clean up
   */
  kill(): void {
    this.dead = true;
    this.hp = 0;
  }

  /**
   * Check if enemy is alive
   */
  isAlive(): boolean {
    return this.hp > 0 && !this.dead;
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    if (this.mesh.geometry) this.mesh.geometry.dispose();
    if (this.mesh.material) {
      if (Array.isArray(this.mesh.material)) {
        for (const mat of this.mesh.material) {
          mat.dispose();
        }
      } else {
        this.mesh.material.dispose();
      }
    }
  }
}
