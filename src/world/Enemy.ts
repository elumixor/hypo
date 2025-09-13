import * as THREE from "three";
import { ComponentManager, HealthComponent, type HealthConfig } from "../components";

export interface EnemyConfig {
  position?: THREE.Vector3;
  health?: HealthConfig;
  shootInterval?: number;
  color?: string;
  size?: number;
}

/**
 * Enemy class using component-based architecture
 */
export class Enemy {
  readonly mesh: THREE.Mesh;
  readonly components: ComponentManager;

  private _health?: HealthComponent;
  private readonly _shootInterval: number;
  private _nextShootTime: number;

  constructor(config: EnemyConfig = {}) {
    this._shootInterval = config.shootInterval ?? 1500; // ms between shots
    this._nextShootTime = performance.now() + 800 + Math.random() * 800;

    // Create enemy mesh
    const size = config.size ?? 0.7;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({
      color: config.color ?? "#ff2b2b",
    });
    this.mesh = new THREE.Mesh(geometry, material);

    // Set position
    if (config.position) {
      this.mesh.position.copy(config.position);
    } else {
      // Default random position around origin
      const angle = Math.random() * Math.PI * 2;
      const distance = 3 + Math.random() * 3;
      this.mesh.position.set(Math.cos(angle) * distance, 0.35, Math.sin(angle) * distance);
    }

    // Set up component system
    this.components = new ComponentManager(this.mesh);
    this.setupComponents(config);
  }

  /**
   * Get health component
   */
  get health(): HealthComponent | undefined {
    return this._health;
  }

  /**
   * Check if enemy is dead
   */
  get isDead(): boolean {
    return this._health ? !this._health.isAlive : false;
  }

  /**
   * Get current HP for legacy compatibility
   */
  get hp(): number {
    return this._health?.currentHealth ?? 0;
  }

  /**
   * Get dead state for legacy compatibility
   */
  get dead(): boolean {
    return this.isDead;
  }

  /**
   * Get next shoot time for legacy compatibility
   */
  get tShoot(): number {
    return this._nextShootTime;
  }

  /**
   * Set next shoot time for legacy compatibility
   */
  set tShoot(value: number) {
    this._nextShootTime = value;
  }

  /**
   * Check if enemy can shoot now
   */
  canShoot(): boolean {
    return performance.now() >= this._nextShootTime;
  }

  /**
   * Schedule next shot
   */
  scheduleNextShot() {
    this._nextShootTime = performance.now() + this._shootInterval + Math.random() * 600;
  }

  /**
   * Update enemy logic
   */
  update(deltaTime: number) {
    this.components.update(deltaTime);
  }

  /**
   * Take damage (legacy compatibility)
   */
  takeDamage(amount: number): boolean {
    return this._health?.takeDamage(amount) ?? false;
  }

  /**
   * Mark enemy as dead (used by spawner)
   */
  kill() {
    if (this._health) {
      this._health.takeDamage(this._health.currentHealth);
    }
  }

  /**
   * Factory method to create enemy with default settings
   */
  static create(config?: EnemyConfig): Enemy {
    return new Enemy(config);
  }

  /**
   * Destroy the enemy and clean up resources
   */
  destroy() {
    this.components.destroy();

    // Clean up mesh resources
    this.mesh.geometry.dispose();
    const material = this.mesh.material as THREE.Material;
    material.dispose();
  }

  private setupComponents(config: EnemyConfig) {
    // Health component
    const healthConfig: HealthConfig = {
      maxHealth: 3,
      ...config.health,
    };
    this._health = this.components.addComponent(new HealthComponent(healthConfig));

    // Set up health events
    this._health.onDeath.subscribe(() => {
      log("Enemy", "Enemy died");
    });
  }
}
