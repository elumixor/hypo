import { EventEmitter } from "@elumixor/event-emitter";
import { Service } from "@engine";

/**
 * Health service manages player health for the combat scene
 */
export class HealthService extends Service {
  readonly died = new EventEmitter();

  private _health = 100;
  private readonly _maxHealth = 100;

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
    const wasAlive = this.isAlive;
    this._health = Math.max(0, this._health - amount);
    this.log(`Player took ${amount} damage. Health: ${this._health}/${this._maxHealth}`);
    if (wasAlive && !this.isAlive) {
      this.log("Player has died.");
      this.died.emit();
    }
  }

  heal(amount: number) {
    this._health = Math.min(this._maxHealth, this._health + amount);
    this.log(`Player healed ${amount}. Health: ${this._health}/${this._maxHealth}`);
  }

  reset() {
    this._health = this._maxHealth;
  }
}
