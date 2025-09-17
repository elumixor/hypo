import { EventEmitter } from "@elumixor/event-emitter";
import { Behavior } from "@engine";

export interface HealthEvent {
  health: number;
  maxHealth: number;
  isAlive: boolean;
}

export class HealthBehavior extends Behavior {
  readonly healthChanged = new EventEmitter<HealthEvent>();

  constructor(
    private _health: number,
    private readonly _maxHealth: number = _health,
  ) {
    super();
  }

  get health() {
    return this._health;
  }

  get maxHealth() {
    return this._maxHealth;
  }

  get isAlive() {
    return this._health > 0;
  }

  takeDamage(amount: number) {
    this._health = Math.max(0, this._health - amount);
    console.log(`${this.entity.constructor.name} took ${amount} damage. Health: ${this._health}/${this._maxHealth}`);
    this.emitHealthChanged();
  }

  heal(amount: number) {
    this._health = Math.min(this._maxHealth, this._health + amount);
    console.log(`${this.entity.constructor.name} healed ${amount}. Health: ${this._health}/${this._maxHealth}`);
    this.emitHealthChanged();
  }

  reset() {
    this._health = this._maxHealth;
    this.emitHealthChanged();
  }

  private emitHealthChanged() {
    console.log(`Emitting healthChanged: ${this._health}/${this._maxHealth}`);
    this.healthChanged.emit({
      health: this.health,
      maxHealth: this.maxHealth,
      isAlive: this.isAlive,
    });
  }
}
