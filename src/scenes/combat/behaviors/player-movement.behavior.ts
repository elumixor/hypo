import { Behavior, TransformBehavior } from "@engine";
import { Vector3 } from "three";
import type { CombatInputMappingContext } from "../combat-input-mapping.context";

export class PlayerMovementBehavior extends Behavior {
  private readonly speed = 5;
  private readonly dashSpeed = 15;
  private readonly dashDuration = 200; // milliseconds
  private readonly dashCooldown = 1000; // milliseconds

  private readonly moveDirection = new Vector3();
  private transform!: TransformBehavior;

  private isDashing = false;
  private dashTimeRemaining = 0;
  private dashCooldownRemaining = 0;
  private dashDirection = new Vector3();

  override async init() {
    await super.init();

    this.transform = this.getBehavior(TransformBehavior);

    // Subscribe to dash events
    this.input.dashActivated.subscribe(this.onDashActivated);
    this.input.touchDashActivated.subscribe(this.onDashActivated);
  }

  override get input() {
    return super.input as CombatInputMappingContext;
  }

  private readonly onDashActivated = () => {
    if (this.dashCooldownRemaining > 0 || this.isDashing) return;

    // Get current movement direction for dash
    const { x, y } = this.input.playerMovement.value;
    if (x === 0 && y === 0) return; // Can't dash without direction

    this.dashDirection.set(x, 0, -y).normalize();
    this.isDashing = true;
    this.dashTimeRemaining = this.dashDuration;
    this.dashCooldownRemaining = this.dashCooldown;
  };

  override update(dt: number) {
    super.update(dt);

    // Update dash cooldown
    if (this.dashCooldownRemaining > 0) {
      this.dashCooldownRemaining -= dt;
    }

    // Handle dashing
    if (this.isDashing) {
      this.dashTimeRemaining -= dt;

      if (this.dashTimeRemaining <= 0) {
        this.isDashing = false;
        this.dashTimeRemaining = 0;
      } else {
        // Apply dash movement
        const dashMovement = this.dashDirection.clone().multiplyScalar(this.dashSpeed * dt * 0.01);
        this.transform.group.position.add(dashMovement);

        // Rotate to face dash direction
        const angle = Math.atan2(this.dashDirection.x, this.dashDirection.z);
        this.transform.group.rotation.y = angle;
        return; // Skip normal movement during dash
      }
    }

    // Normal movement (only when not dashing)
    this.moveDirection.set(0, 0, 0);

    // Get movement from input
    const { x, y } = this.input.playerMovement.value;
    this.moveDirection.x = x;
    this.moveDirection.z = -y;

    // Apply movement
    if (this.moveDirection.length() > 0) {
      this.moveDirection.multiplyScalar(this.speed * dt * 0.01);

      this.transform.group.position.add(this.moveDirection);

      // Rotate player to face movement direction
      const angle = Math.atan2(this.moveDirection.x, this.moveDirection.z);
      this.transform.group.rotation.y = angle;
    }
  }

  override destroy() {
    this.input.dashActivated.unsubscribe(this.onDashActivated);
    this.input.touchDashActivated.unsubscribe(this.onDashActivated);
    super.destroy();
  }
}
