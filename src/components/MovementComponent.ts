import * as THREE from "three";
import { Component } from "./Component";

export interface MovementConfig {
  speed: number;
  dashSpeed?: number;
  dashDuration?: number;
  dashCooldown?: number;
}

/**
 * Component for handling entity movement, including dashing
 */
export class MovementComponent extends Component {
  private _speed: number;
  private readonly _dashSpeed: number;
  private readonly _dashDuration: number;
  private readonly _dashCooldown: number;

  private _dashTime = 0;
  private _dashCooldownTimer = 0;
  private readonly _velocity = new THREE.Vector3();
  private readonly _tmpVector = new THREE.Vector3();

  constructor(config: MovementConfig) {
    super();
    this._speed = config.speed;
    this._dashSpeed = config.dashSpeed ?? config.speed * 2.5;
    this._dashDuration = config.dashDuration ?? 0.18;
    this._dashCooldown = config.dashCooldown ?? 0.5;
  }

  /**
   * Get current movement speed
   */
  get speed(): number {
    return this._speed;
  }

  /**
   * Set movement speed
   */
  set speed(value: number) {
    this._speed = Math.max(0, value);
  }

  /**
   * Get current velocity
   */
  get velocity(): THREE.Vector3 {
    return this._velocity.clone();
  }

  /**
   * Check if currently dashing
   */
  get isDashing(): boolean {
    return this._dashTime > 0;
  }

  /**
   * Check if dash is on cooldown
   */
  get isDashOnCooldown(): boolean {
    return this._dashCooldownTimer > 0;
  }

  /**
   * Get dash cooldown progress (0-1, where 1 = ready)
   */
  get dashCooldownProgress(): number {
    return this._dashCooldown > 0 ? Math.max(0, 1 - this._dashCooldownTimer / this._dashCooldown) : 1;
  }

  /**
   * Move in a direction
   */
  move(direction: THREE.Vector3) {
    if (!this.entity || !this.enabled) return;

    this._velocity.copy(direction).normalize();
  }

  /**
   * Set velocity directly
   */
  setVelocity(velocity: THREE.Vector3) {
    this._velocity.copy(velocity);
  }

  /**
   * Add velocity (for knockback, etc.)
   */
  addVelocity(velocity: THREE.Vector3) {
    this._velocity.add(velocity);
  }

  /**
   * Start a dash in the current movement direction
   */
  startDash(): boolean {
    if (this._dashCooldownTimer > 0 || !this.enabled) return false;

    this._dashTime = this._dashDuration;
    this._dashCooldownTimer = this._dashCooldown;
    return true;
  }

  /**
   * Stop all movement
   */
  stop() {
    this._velocity.set(0, 0, 0);
  }

  protected override onUpdate(deltaTime: number) {
    if (!this.entity) return;

    // Update dash timers
    if (this._dashTime > 0) {
      this._dashTime = Math.max(0, this._dashTime - deltaTime);
    }
    if (this._dashCooldownTimer > 0) {
      this._dashCooldownTimer = Math.max(0, this._dashCooldownTimer - deltaTime);
    }

    // Apply movement
    if (this._velocity.lengthSq() > 0.001) {
      const currentSpeed = this.isDashing ? this._dashSpeed : this._speed;

      this._tmpVector
        .copy(this._velocity)
        .normalize()
        .multiplyScalar(currentSpeed * deltaTime);

      this.entity.position.add(this._tmpVector);
    }
  }

  /**
   * Get movement statistics
   */
  getStats(): {
    speed: number;
    velocity: THREE.Vector3;
    isDashing: boolean;
    dashCooldownProgress: number;
  } {
    return {
      speed: this._speed,
      velocity: this.velocity,
      isDashing: this.isDashing,
      dashCooldownProgress: this.dashCooldownProgress,
    };
  }
}
