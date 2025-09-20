import { EventEmitter } from "@elumixor/event-emitter";
import { Behavior } from "@engine";
import { RuntimeCombatService } from "services/runtime-combat.service";

export interface EnergyEvent {
  energy: number;
  diff: number;
  maxEnergy: number;
}

/**
 * Energy behavior that bridges the old entity-based energy system with the new combat service
 * Most energy logic is now centralized in RuntimeCombatService
 */
export class EnergyBehavior extends Behavior {
  readonly energyChanged = new EventEmitter<EnergyEvent>();
  readonly energyDepleted = new EventEmitter();

  private readonly combatService = this.require(RuntimeCombatService);
  private characterId?: string;

  constructor(
    private _energy: number,
    readonly maxEnergy = _energy,
    readonly energyRegenRate = 5, // Energy per second
    readonly rechargeDelay = 0.5, // Seconds after energy use before regen starts
  ) {
    super();
  }

  override async init() {
    await super.init();

    // Try to determine character ID from entity
    this.characterId = this.entity.name === "Player" ? "helios" : undefined;

    if (this.characterId) {
      // Subscribe to combat service updates for this character
      this.combatService.energyChanged.subscribe((event) => {
        if (event.characterId === this.characterId) {
          this._energy = event.currentEnergy;
          this.energyChanged.emit({
            energy: event.currentEnergy,
            diff: event.diff,
            maxEnergy: event.maxEnergy,
          });

          if (event.currentEnergy === 0) {
            this.energyDepleted.emit();
          }
        }
      });
    }
  }

  get energy() {
    if (this.characterId) {
      const state = this.combatService.getCharacterState(this.characterId);
      return state?.currentEnergy ?? this._energy;
    }
    return this._energy;
  }

  set energy(value: number) {
    if (this.characterId) {
      // Delegate to combat service
      const currentEnergy = this.energy;
      const diff = value - currentEnergy;
      this.combatService.modifyEnergy(this.characterId, diff);
    } else {
      // Fallback to old behavior for non-character entities
      const clampedValue = Math.max(0, Math.min(value, this.maxEnergy));
      const diff = clampedValue - this._energy;
      this._energy = clampedValue;

      this.energyChanged.emit({
        energy: this._energy,
        diff,
        maxEnergy: this.maxEnergy,
      });

      if (this._energy === 0) {
        this.energyDepleted.emit();
      }
    }
  }

  override update(dt: number) {
    super.update(dt);

    // Energy regeneration is now handled by RuntimeCombatService
    // This is kept for backward compatibility with non-character entities
    if (!this.characterId && this._energy < this.maxEnergy) {
      this.energy += this.energyRegenRate * (dt / 1000);
    }
  }
}
