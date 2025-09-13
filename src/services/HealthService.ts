import { EventEmitter } from "@elumixor/frontils";
import { BaseService } from "./BaseService";

export interface HealthData {
  current: number;
  maximum: number;
  percentage: number;
}

/**
 * Manages player health, damage, healing, and death states
 */
export class HealthService extends BaseService {
  private _current = 10;
  private _maximum = 10;

  // Events
  readonly onHealthChanged = new EventEmitter<HealthData>();
  readonly onDamaged = new EventEmitter<{ amount: number; newHealth: number }>();
  readonly onHealed = new EventEmitter<{ amount: number; newHealth: number }>();
  readonly onDeath = new EventEmitter();
  readonly onRevived = new EventEmitter<HealthData>();

  constructor() {
    super();
    this.reset();
  }

  /**
   * Get current health
   */
  get current(): number {
    return this._current;
  }

  /**
   * Get maximum health
   */
  get maximum(): number {
    return this._maximum;
  }

  /**
   * Get health as percentage (0-1)
   */
  get percentage(): number {
    return this._maximum > 0 ? this._current / this._maximum : 0;
  }

  /**
   * Check if player is alive
   */
  get isAlive(): boolean {
    return this._current > 0;
  }

  /**
   * Check if player is at full health
   */
  get isFullHealth(): boolean {
    return this._current >= this._maximum;
  }

  /**
   * Set maximum health (also heals to full if current > new max)
   */
  setMaxHealth(max: number) {
    if (max <= 0) throw new Error("Maximum health must be positive");

    this._maximum = max;
    if (this._current > max) {
      this._current = max;
    }
    this.emitHealthChanged();
  }

  /**
   * Deal damage to the player
   */
  takeDamage(amount: number): boolean {
    if (amount <= 0) return false;

    const oldHealth = this._current;
    this._current = Math.max(0, this._current - amount);

    const actualDamage = oldHealth - this._current;
    if (actualDamage > 0) {
      this.onDamaged.emit({ amount: actualDamage, newHealth: this._current });
      this.emitHealthChanged();

      if (this._current === 0) {
        this.onDeath.emit();
      }

      return true;
    }

    return false;
  }

  /**
   * Heal the player
   */
  heal(amount: number): boolean {
    if (amount <= 0 || this.isFullHealth) return false;

    const oldHealth = this._current;
    this._current = Math.min(this._maximum, this._current + amount);

    const actualHealing = this._current - oldHealth;
    if (actualHealing > 0) {
      this.onHealed.emit({ amount: actualHealing, newHealth: this._current });
      this.emitHealthChanged();
      return true;
    }

    return false;
  }

  /**
   * Fully heal the player
   */
  healToFull() {
    const oldHealth = this._current;
    this._current = this._maximum;

    if (oldHealth < this._maximum) {
      const actualHealing = this._current - oldHealth;
      this.onHealed.emit({ amount: actualHealing, newHealth: this._current });
      this.emitHealthChanged();
    }
  }

  /**
   * Reset health to default values (for respawn/restart)
   */
  reset() {
    const wasAlive = this.isAlive;
    this._current = this._maximum;

    this.emitHealthChanged();

    if (!wasAlive && this.isAlive) {
      this.onRevived.emit(this.getHealthData());
    }
  }

  /**
   * Get current health data
   */
  getHealthData(): HealthData {
    return {
      current: this._current,
      maximum: this._maximum,
      percentage: this.percentage,
    };
  }

  private emitHealthChanged() {
    this.onHealthChanged.emit(this.getHealthData());
  }
}
