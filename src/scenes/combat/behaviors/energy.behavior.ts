import { EventEmitter } from "@elumixor/event-emitter";
import { Behavior, type TimeoutHandle, timeout } from "@engine";

export interface EnergyEvent {
  energy: number;
  diff: number;
  maxEnergy: number;
}

export class EnergyBehavior extends Behavior {
  readonly energyChanged = new EventEmitter<EnergyEvent>();
  readonly energyDepleted = new EventEmitter();

  private rechargeTimeout?: TimeoutHandle;

  constructor(
    private _energy: number,
    readonly maxEnergy = _energy,
    readonly energyRegenRate = 5, // Energy per second
    readonly rechargeDelay = 0.5, // Seconds after energy use before regen starts
  ) {
    super();
  }

  get energy() {
    return this._energy;
  }

  set energy(value: number) {
    const newEnergy = clamp(value, 0, this.maxEnergy);
    const diff = newEnergy - this._energy;
    if (diff === 0) return; // No change

    this._energy = newEnergy;
    this.energyChanged.emit({ energy: this._energy, diff, maxEnergy: this.maxEnergy });

    if (diff < 0) {
      this.enabled = false;

      // After a delay, re-enable energy regeneration
      this.rechargeTimeout?.cancel();
      this.rechargeTimeout = timeout(this.rechargeDelay, () => {
        this.enabled = true;
      });
    }

    if (this._energy === 0) this.energyDepleted.emit();
  }

  override update(dt: number) {
    super.update(dt);

    // Slowly regenerate energy over time
    this.energy += this.energyRegenRate * (dt / 1000);
  }
}
