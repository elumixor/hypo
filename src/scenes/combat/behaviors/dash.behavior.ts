import { EventEmitter } from "@elumixor/event-emitter";
import { Behavior } from "@engine";
import { RuntimeCombatService } from "services/runtime-combat.service";
import { Vector3 } from "three";
import type { CombatInputMappingContext } from "../combat-input-mapping.context";

export interface DashChargeEvent {
  currentCharges: number;
  maxCharges: number;
  chargeTimers: readonly number[];
}

/**
 * Dash behavior that handles the actual movement/animation while delegating
 * charge logic to RuntimeCombatService
 */
export class DashBehavior extends Behavior {
  // Events
  readonly chargeChanged = new EventEmitter<DashChargeEvent>();

  private readonly combatService = this.require(RuntimeCombatService);
  private characterId?: string;

  // Movement state
  private readonly dashDirection = new Vector3();
  private isDashing = false;
  private dashTimeRemaining = 0;

  // Dash configuration (retrieved from combat service)
  private dashDistance = 8;
  private dashDuration = 0.1;

  override async init() {
    await super.init();

    // Try to determine character ID from entity
    this.characterId = this.entity.name === "Player" ? "helios" : undefined;

    if (this.characterId) {
      // Get dash configuration from combat service
      const state = this.combatService.getCharacterState(this.characterId);
      if (state) {
        this.dashDistance = state.dashDistance;
        this.dashDuration = 0.1; // Fixed duration for now
      }

      // Subscribe to dash charge updates
      this.combatService.dashChargesChanged.subscribe((event) => {
        if (event.characterId === this.characterId) {
          this.chargeChanged.emit({
            currentCharges: event.currentCharges,
            maxCharges: event.maxCharges,
            chargeTimers: event.chargeTimers,
          });
        }
      });

      // Emit initial charge state
      this.emitChargeChanged();
    }

    // Subscribe to dash event
    this.on(this.input.dashActivated, this.attemptDash.bind(this));
  }

  override get input() {
    return super.input as CombatInputMappingContext;
  }

  get currentCharges() {
    if (this.characterId) {
      const state = this.combatService.getCharacterState(this.characterId);
      return state?.currentDashCharges ?? 0;
    }
    return 0;
  }

  get maxCharges() {
    if (this.characterId) {
      const state = this.combatService.getCharacterState(this.characterId);
      return state?.maxDashCharges ?? 0;
    }
    return 0;
  }

  override update(dt: number) {
    super.update(dt);

    const deltaTime = dt / 1000;

    // Update dash movement
    if (this.isDashing && this.dashTimeRemaining > 0) {
      this.dashTimeRemaining -= deltaTime;

      // Apply dash movement
      const dashSpeed = this.dashDistance / this.dashDuration;
      const movement = this.dashDirection.clone().multiplyScalar(dashSpeed * deltaTime);
      this.transform.group.position.add(movement);

      if (this.dashTimeRemaining <= 0) {
        this.isDashing = false;
      }
    }
  }

  private attemptDash() {
    if (!this.characterId) return;

    // Check if dash is available through combat service
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

    // Use dash charge through combat service
    if (this.combatService.useDashCharge(this.characterId)) {
      // Start dash movement
      this.isDashing = true;
      this.dashTimeRemaining = this.dashDuration;
    }
  }

  private emitChargeChanged() {
    if (this.characterId) {
      const state = this.combatService.getCharacterState(this.characterId);
      if (state) {
        this.chargeChanged.emit({
          currentCharges: state.currentDashCharges,
          maxCharges: state.maxDashCharges,
          chargeTimers: [...state.dashChargeTimers],
        });
      }
    }
  }
}
