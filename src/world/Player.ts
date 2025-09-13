import * as THREE from "three";
import type { ProjectileTarget } from "../combat/ProjectileTarget";
import {
  ComponentManager,
  HealthComponent,
  type HealthConfig,
  MovementComponent,
  type MovementConfig,
  ShieldComponent,
  type ShieldConfig,
} from "../components";
import type { Keyboard } from "../input/Keyboard";

export interface PlayerConfig {
  position?: THREE.Vector3;
  yaw?: number;
  movement?: MovementConfig;
  health?: HealthConfig;
  shield?: ShieldConfig;
}

/**
 * Refactored Player class using component-based architecture
 */
export class Player implements ProjectileTarget {
  readonly mesh: THREE.Mesh;
  readonly components: ComponentManager;
  readonly yaw: number;

  // Component references for easy access
  private _movement?: MovementComponent;
  private _health?: HealthComponent;
  private _shield?: ShieldComponent;

  constructor(
    private readonly keyboard: Keyboard,
    config: PlayerConfig = {},
  ) {
    this.yaw = config.yaw ?? Math.PI * 0.25;

    // Create player mesh
    const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const material = new THREE.MeshStandardMaterial({
      color: "#4ec9ff",
      roughness: 0.4,
    });
    this.mesh = new THREE.Mesh(geometry, material);

    const position = config.position ?? new THREE.Vector3(0, 0.4, 0);
    this.mesh.position.copy(position);

    // Set up component system
    this.components = new ComponentManager(this.mesh);
    this.setupComponents(config);
  }

  /**
   * Get movement component
   */
  get movement(): MovementComponent | undefined {
    return this._movement;
  }

  /**
   * Get health component
   */
  get health(): HealthComponent | undefined {
    return this._health;
  }

  /**
   * Get shield component
   */
  get shield(): ShieldComponent | undefined {
    return this._shield;
  }

  /**
   * Update player logic
   */
  update(deltaTime: number) {
    this.handleInput();
    this.components.update(deltaTime);
  }

  /**
   * Start a dash if possible
   */
  startDash(): boolean {
    return this._movement?.startDash() ?? false;
  }

  /**
   * Toggle shield state
   */
  toggleShield() {
    this._shield?.toggle();
  }

  /**
   * Set shield active state
   */
  setShield(active: boolean) {
    if (active) {
      this._shield?.activate();
    } else {
      this._shield?.deactivate();
    }
  }

  /**
   * Get shield active state
   */
  get shieldActive(): boolean {
    return this._shield?.isActive ?? false;
  }

  /**
   * Destroy the player and clean up resources
   */
  destroy() {
    this.components.destroy();

    // Clean up mesh resources
    this.mesh.geometry.dispose();
    const material = this.mesh.material as THREE.Material;
    material.dispose();
  }

  private setupComponents(config: PlayerConfig) {
    // Movement component
    const movementConfig: MovementConfig = {
      speed: 4,
      dashSpeed: 10,
      dashDuration: 0.18,
      dashCooldown: 0.5,
      ...config.movement,
    };
    this._movement = this.components.addComponent(new MovementComponent(movementConfig));

    // Health component
    const healthConfig: HealthConfig = {
      maxHealth: 10,
      invincibilityTime: 0.5, // Brief invincibility after damage
      ...config.health,
    };
    this._health = this.components.addComponent(new HealthComponent(healthConfig));

    // Shield component
    const shieldConfig: ShieldConfig = {
      radius: 1.1,
      color: "#6cf",
      opacity: 0.25,
      emissiveColor: "#58b",
      ...config.shield,
    };
    this._shield = this.components.addComponent(new ShieldComponent(shieldConfig));
  }

  private handleInput() {
    if (!this._movement) return;

    // Handle movement input
    const forward = new THREE.Vector3(-Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    const right = new THREE.Vector3(-forward.z, 0, forward.x);
    const moveDirection = new THREE.Vector3();

    if (this.keyboard.has("w") || this.keyboard.has("arrowup")) {
      moveDirection.add(forward);
    }
    if (this.keyboard.has("s") || this.keyboard.has("arrowdown")) {
      moveDirection.sub(forward);
    }
    if (this.keyboard.has("a") || this.keyboard.has("arrowleft")) {
      moveDirection.sub(right);
    }
    if (this.keyboard.has("d") || this.keyboard.has("arrowright")) {
      moveDirection.add(right);
    }

    if (moveDirection.lengthSq() > 0) {
      this._movement.move(moveDirection.normalize());
    } else {
      this._movement.stop();
    }
  }
}
