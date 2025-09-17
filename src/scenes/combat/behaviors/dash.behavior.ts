import { Behavior, TransformBehavior } from "@engine";
import { Vector3 } from "three";
import type { CombatInputMappingContext } from "../combat-input-mapping.context";

export class DashBehavior extends Behavior {
  private readonly dashDistance = 8;
  private readonly dashDuration = 0.2; // seconds
  private readonly cooldownDuration = 1.0; // seconds
  private readonly invulnerabilityDuration = 0.15; // seconds, slightly less than dash duration

  private transform!: TransformBehavior;
  private isDashing = false;
  private isInvulnerable = false;
  private cooldownRemaining = 0;
  private dashTimeRemaining = 0;
  private invulnerabilityTimeRemaining = 0;
  private readonly dashDirection = new Vector3();
  private dashEventSubscribed = false;

  override async init() {
    await super.init();
    this.transform = this.getBehavior(TransformBehavior);
  }

  override get input() {
    return super.input as CombatInputMappingContext;
  }

  override update(dt: number) {
    super.update(dt);

    // Simple space key detection using direct input context access
    try {
      // Try to get the dashActivated event from the input context if available
      const dashActivated = this.input.dashActivated;

      // Subscribe to dash event if we haven't already
      if (dashActivated && !this.dashEventSubscribed) {
        if (typeof dashActivated.subscribe === "function") {
          dashActivated.subscribe(() => {
            this.attemptDash();
          });
          this.dashEventSubscribed = true;
        }
      }
    } catch (_error) {
      // Fallback: ignore for now to prevent crashes
    }

    // Update cooldown
    if (this.cooldownRemaining > 0) {
      this.cooldownRemaining -= dt;
    }

    // Update dash
    if (this.isDashing && this.dashTimeRemaining > 0) {
      this.dashTimeRemaining -= dt;

      // Apply dash movement
      const dashSpeed = this.dashDistance / this.dashDuration;
      const movement = this.dashDirection.clone().multiplyScalar(dashSpeed * dt * 0.01);
      this.transform.group.position.add(movement);

      if (this.dashTimeRemaining <= 0) {
        this.isDashing = false;
      }
    }

    // Update invulnerability frames
    if (this.isInvulnerable && this.invulnerabilityTimeRemaining > 0) {
      this.invulnerabilityTimeRemaining -= dt;

      if (this.invulnerabilityTimeRemaining <= 0) {
        this.isInvulnerable = false;
      }
    }
  }

  private attemptDash() {
    // Check if dash is available (not on cooldown and not currently dashing)
    if (this.cooldownRemaining > 0 || this.isDashing) {
      return;
    }

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

    // Start invulnerability frames
    this.isInvulnerable = true;
    this.invulnerabilityTimeRemaining = this.invulnerabilityDuration;

    // Start cooldown
    this.cooldownRemaining = this.cooldownDuration;

    console.log("Player dashed!");
  }

  // Public getters for other systems to check dash state
  get isCurrentlyDashing() {
    return this.isDashing;
  }

  get isCurrentlyInvulnerable() {
    return this.isInvulnerable;
  }

  get isCooldownActive() {
    return this.cooldownRemaining > 0;
  }

  get cooldownProgress() {
    return Math.max(0, 1 - this.cooldownRemaining / this.cooldownDuration);
  }
}
