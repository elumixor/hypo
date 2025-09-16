import "../utils/globals";
import { Behavior } from "../../engine/behavior";

export interface MovementConfig {
  speed: number;
  dashSpeed?: number;
  dashDuration?: number;
  dashCooldown?: number;
}

export class MovementBehavior extends Behavior {
  private readonly config: Required<MovementConfig>;
  private isDashing = false;
  private dashTime = 0;
  private dashCooldownTime = 0;

  constructor(config: MovementConfig) {
    super();
    this.config = {
      speed: config.speed,
      dashSpeed: config.dashSpeed ?? config.speed * 2,
      dashDuration: config.dashDuration ?? 0.2,
      dashCooldown: config.dashCooldown ?? 1.0,
    };
  }

  get currentSpeed(): number {
    return this.isDashing ? this.config.dashSpeed : this.config.speed;
  }

  get canDash(): boolean {
    return this.dashCooldownTime <= 0 && !this.isDashing;
  }

  override update(dt: number): void {
    // Update dash timing
    if (this.isDashing) {
      this.dashTime -= dt;
      if (this.dashTime <= 0) {
        this.isDashing = false;
        this.dashCooldownTime = this.config.dashCooldown;
      }
    }

    // Update dash cooldown
    if (this.dashCooldownTime > 0) {
      this.dashCooldownTime -= dt;
    }
  }

  dash(): boolean {
    if (!this.canDash) return false;

    this.isDashing = true;
    this.dashTime = this.config.dashDuration;
    log("[MovementBehavior] Entity started dash");
    return true;
  }

  // Helper methods for position management (would need actual position component)
  move(direction: { x: number; y: number; z: number }, dt: number): void {
    const speed = this.currentSpeed;
    const distance = speed * dt;

    // Normalize direction
    const length = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2);
    if (length === 0) return;

    const normalizedDirection = {
      x: direction.x / length,
      y: direction.y / length,
      z: direction.z / length,
    };

    // Move entity (this would update actual position in a real implementation)
    log(`[MovementBehavior] Entity moving at speed ${speed}, distance ${distance}`, normalizedDirection);
  }
}
