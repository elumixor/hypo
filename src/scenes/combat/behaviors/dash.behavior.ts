import { EventEmitter } from "@elumixor/event-emitter";
import { Behavior, TransformBehavior } from "@engine";
import { Vector3 } from "three";
import { type CharacterStats, defaultCharacterStats } from "../character-stats";
import type { CombatInputMappingContext } from "../combat-input-mapping.context";

export interface DashChargeEvent {
  currentCharges: number;
  maxCharges: number;
  chargeTimers: readonly number[];
}

export class DashBehavior extends Behavior {
  // Events
  readonly chargeChanged = new EventEmitter<DashChargeEvent>();

  // Configuration
  private readonly config: CharacterStats["dash"];

  // State
  private transform!: TransformBehavior;
  isDashing = false;
  private dashTimeRemaining = 0;
  private readonly dashDirection = new Vector3();

  // Charge system
  private currentCharges: number;
  private readonly chargeTimers: number[];

  constructor(stats: CharacterStats = defaultCharacterStats) {
    super();
    this.config = stats.dash;
    this.currentCharges = this.config.maxCharges;
    this.chargeTimers = Array(this.config.maxCharges).fill(0);
  }

  get availableCharges() {
    return this.currentCharges;
  }

  get maxCharges() {
    return this.config.maxCharges;
  }

  override async init() {
    await super.init();

    this.transform = this.getBehavior(TransformBehavior);

    // Subscribe to dash event if we haven't already
    this.input.dashActivated.subscribe(this.attemptDash);

    // Emit initial charge state
    this.emitChargeChanged();
  }

  override get input() {
    return super.input as CombatInputMappingContext;
  }

  override update(dt: number) {
    super.update(dt);

    const deltaTime = dt / 1000;

    // Update charge timers
    for (let i = 0; i < this.chargeTimers.length; i++) {
      const currentTimer = this.chargeTimers[i];
      if (currentTimer !== undefined && currentTimer > 0) {
        const newTimer = currentTimer - deltaTime;

        // Charge is ready
        if (newTimer <= 0) {
          this.chargeTimers[i] = 0;
          this.currentCharges = Math.min(this.currentCharges + 1, this.config.maxCharges);
          this.emitChargeChanged();
        } else {
          this.chargeTimers[i] = newTimer;
        }
      }
    }

    // Update dash
    if (this.isDashing && this.dashTimeRemaining > 0) {
      this.dashTimeRemaining -= deltaTime;

      // Apply dash movement
      const dashSpeed = this.config.dashDistance / this.config.dashDuration;
      const movement = this.dashDirection.clone().multiplyScalar(dashSpeed * deltaTime);
      this.transform.group.position.add(movement);

      if (this.dashTimeRemaining <= 0) this.isDashing = false;
    }
  }

  private readonly attemptDash = () => {
    // Check if dash is available (has charges and not currently dashing)
    if (this.currentCharges <= 0 || this.isDashing) return;

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
    this.dashTimeRemaining = this.config.dashDuration;

    // Use one charge
    this.currentCharges--;

    // Start recharge timer for this charge
    const nextAvailableSlot = this.findNextAvailableChargeSlot();
    if (nextAvailableSlot !== -1) {
      this.chargeTimers[nextAvailableSlot] = this.config.chargeRegenTime;
    }

    this.emitChargeChanged();
  };

  private findNextAvailableChargeSlot(): number {
    return this.chargeTimers.indexOf(0);
  }

  private emitChargeChanged() {
    this.chargeChanged.emit({
      currentCharges: this.currentCharges,
      maxCharges: this.config.maxCharges,
      chargeTimers: [...this.chargeTimers], // Create a copy for readonly access
    });
  }

  override destroy() {
    this.input.dashActivated.unsubscribe(this.attemptDash);
    super.destroy();
  }
}
