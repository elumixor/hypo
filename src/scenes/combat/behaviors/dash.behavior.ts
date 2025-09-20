import { EventEmitter } from "@elumixor/event-emitter";
import { Behavior } from "@engine";
import { Vector3 } from "three";
import { type CharacterStats, defaultCharacterStats } from "../character-stats";
import type { CombatInputMappingContext } from "../combat-input-mapping.context";

export interface DashChargeEvent {
  currentCharges: number;
  maxCharges: number;
  chargeTimers: readonly number[];
}

// todo: overall charges logic, recharge logic should be moved to a skills service
// because we are basically emitting events here for UI
// This behavior should only handle the actual dash movement of the entity
export class DashBehavior extends Behavior {
  // Events
  readonly chargeChanged = new EventEmitter<DashChargeEvent>();

  private readonly config: CharacterStats["dash"];

  // State
  private readonly dashDirection = new Vector3();
  private readonly chargeTimers: number[];
  private isDashing = false;
  private dashTimeRemaining = 0;

  get currentCharges() {
    return this.chargeTimers.filter((t) => t === 0).length;
  }

  get maxCharges() {
    return this.config.maxCharges;
  }

  get chargeRegenTime() {
    return this.config.chargeRegenTime;
  }

  // fixme: This should be retrieved from the character stats service
  constructor(stats: CharacterStats = defaultCharacterStats) {
    super();
    this.config = stats.dash;
    this.chargeTimers = Array(this.config.maxCharges).fill(0);
  }

  override async init() {
    await super.init();

    // Subscribe to dash event if we haven't already
    this.on(this.input.dashActivated, this.attemptDash.bind(this));

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
    for (const [i, currentTimer] of this.chargeTimers.entries())
      this.chargeTimers[i] = Math.max(currentTimer - deltaTime, 0);

    this.emitChargeChanged();

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

  private attemptDash() {
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

    // Start recharge timer for this charge
    const nextAvailableSlot = this.chargeTimers.indexOf(0);
    if (nextAvailableSlot !== -1) this.chargeTimers[nextAvailableSlot] = this.config.chargeRegenTime;

    this.emitChargeChanged();
  }

  private emitChargeChanged() {
    this.chargeChanged.emit({
      currentCharges: this.currentCharges,
      maxCharges: this.config.maxCharges,
      chargeTimers: [...this.chargeTimers], // Create a copy for readonly access
    });
  }
}
