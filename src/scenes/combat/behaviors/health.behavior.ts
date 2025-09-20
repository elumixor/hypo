import { EventEmitter } from "@elumixor/event-emitter";
import { Behavior } from "@engine";
import { RuntimeCombatService } from "services/runtime-combat.service";

export interface HealthEvent {
  health: number;
  maxHealth: number;
  isAlive: boolean;
}

/**
 * Health behavior that bridges the old entity-based health system with the new combat service
 * Most health logic is now centralized in RuntimeCombatService
 */
export class HealthBehavior extends Behavior {
  readonly healthChanged = new EventEmitter<HealthEvent>();

  private readonly combatService = this.require(RuntimeCombatService);
  private characterId?: string;

  constructor(
    private _health: number,
    readonly maxHealth: number = _health,
  ) {
    super();
  }

  override async init() {
    await super.init();

    // Try to determine character ID from entity
    // For now, we'll use a simple heuristic - if this is the player entity
    this.characterId = this.entity.name === "Player" ? "helios" : undefined;

    if (this.characterId) {
      // Subscribe to combat service updates for this character
      this.combatService.healthChanged.subscribe((event) => {
        if (event.characterId === this.characterId) {
          this._health = event.currentHealth;
          this.healthChanged.emit({
            health: event.currentHealth,
            maxHealth: event.maxHealth,
            isAlive: event.isAlive,
          });
        }
      });
    }
  }

  get health() {
    if (this.characterId) {
      const state = this.combatService.getCharacterState(this.characterId);
      return state?.currentHealth ?? this._health;
    }
    return this._health;
  }

  set health(value: number) {
    if (this.characterId) {
      // Delegate to combat service
      const currentHealth = this.health;
      const diff = value - currentHealth;
      this.combatService.modifyHealth(this.characterId, diff);
    } else {
      // Fallback to old behavior for non-character entities
      const clampedValue = Math.max(0, Math.min(value, this.maxHealth));
      this._health = clampedValue;
      this.healthChanged.emit({
        health: this.health,
        maxHealth: this.maxHealth,
        isAlive: this.isAlive,
      });
    }
  }

  get isAlive() {
    return this.health > 0;
  }
}
