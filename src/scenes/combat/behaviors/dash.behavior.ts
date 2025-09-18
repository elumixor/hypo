import { Behavior, TransformBehavior } from "@engine";
import { Vector3 } from "three";
import type { CombatInputMappingContext } from "../combat-input-mapping.context";

export class DashBehavior extends Behavior {
  private readonly dashDistance = 8;
  private readonly dashDuration = 0.1; // seconds
  private readonly cooldownDuration = 0.5; // seconds

  private transform!: TransformBehavior;
  private isDashing = false;
  private cooldownRemaining = 0;
  private dashTimeRemaining = 0;
  private readonly dashDirection = new Vector3();

  override async init() {
    await super.init();

    this.transform = this.getBehavior(TransformBehavior);

    const dashActivated = this.input.dashActivated;

    // Subscribe to dash event if we haven't already
    dashActivated.subscribe(this.attemptDash);
  }

  override get input() {
    return super.input as CombatInputMappingContext;
  }

  override update(dt: number) {
    super.update(dt);

    // Update cooldown
    if (this.cooldownRemaining > 0) this.cooldownRemaining -= dt / 1000;

    // Update dash
    if (this.isDashing && this.dashTimeRemaining > 0) {
      this.dashTimeRemaining -= dt / 1000;

      // Apply dash movement
      const dashSpeed = this.dashDistance / this.dashDuration;
      const movement = this.dashDirection.clone().multiplyScalar((dashSpeed * dt) / 1000);
      this.transform.group.position.add(movement);

      if (this.dashTimeRemaining <= 0) this.isDashing = false;
    }
  }

  private readonly attemptDash = () => {
    // Check if dash is available (not on cooldown and not currently dashing)
    if (this.cooldownRemaining > 0 || this.isDashing) return;

    // Get dash direction from movement input, or use forward direction if no input
    const { x, y } = this.input.playerMovement.value;

    if (x !== 0 || y !== 0) {
      // Use movement input direction
      this.dashDirection.set(x, 0, -y).normalize();
    } else {
      // Use current facing direction (forward)
      this.dashDirection.set(0, 0, 1);
      this.dashDirection.applyEuler(this.transform.group.rotation);
    }

    // Start dash
    this.isDashing = true;
    this.dashTimeRemaining = this.dashDuration;

    // Start cooldown
    this.cooldownRemaining = this.cooldownDuration;
  };
}
