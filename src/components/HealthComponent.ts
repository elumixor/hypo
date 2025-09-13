import { EventEmitter } from "@elumixor/frontils";
import { Component } from "./Component";

export interface HealthConfig {
  maxHealth: number;
  currentHealth?: number;
  invincibilityTime?: number;
}

export interface HealthData {
  current: number;
  maximum: number;
  percentage: number;
}

/**
 * Component for handling entity health, damage, and death
 */
export class HealthComponent extends Component {
  private _maxHealth: number;
  private _currentHealth: number;
  private readonly _invincibilityTime: number;
  private _invincibilityTimer = 0;

  // Events
  readonly onHealthChanged = new EventEmitter<HealthData>();
  readonly onDamaged = new EventEmitter<{ amount: number; newHealth: number }>();
  readonly onHealed = new EventEmitter<{ amount: number; newHealth: number }>();
  readonly onDeath = new EventEmitter();
  readonly onInvincibilityStarted = new EventEmitter<number>();
  readonly onInvincibilityEnded = new EventEmitter();

  constructor(config: HealthConfig) {
    super();
    this._maxHealth = config.maxHealth;
    this._currentHealth = config.currentHealth ?? config.maxHealth;
    this._invincibilityTime = config.invincibilityTime ?? 0;
  }

  /**
   * Get current health
   */
  get currentHealth(): number {
    return this._currentHealth;
  }

  /**
   * Get maximum health
   */
  get maxHealth(): number {
    return this._maxHealth;
  }

  /**
   * Get health as percentage (0-1)
   */
  get healthPercentage(): number {
    return this._maxHealth > 0 ? this._currentHealth / this._maxHealth : 0;
  }

  /**
   * Check if entity is alive
   */
  get isAlive(): boolean {
    return this._currentHealth > 0;
  }

  /**
   * Check if entity is at full health
   */
  get isFullHealth(): boolean {
    return this._currentHealth >= this._maxHealth;
  }

  /**
   * Check if entity is currently invincible
   */
  get isInvincible(): boolean {
    return this._invincibilityTimer > 0;
  }

  /**
   * Get invincibility progress (0-1, where 0 = vulnerable, 1 = just became invincible)
   */
  get invincibilityProgress(): number {
    return this._invincibilityTime > 0 ? this._invincibilityTimer / this._invincibilityTime : 0;
  }

  /**
   * Set maximum health
   */
  setMaxHealth(maxHealth: number) {
    if (maxHealth <= 0) throw new Error("Max health must be positive");

    this._maxHealth = maxHealth;
    if (this._currentHealth > maxHealth) {
      this._currentHealth = maxHealth;
    }
    this.emitHealthChanged();
  }

  /**
   * Deal damage to this entity
   */
  takeDamage(amount: number): boolean {
    if (!this.enabled || amount <= 0 || this.isInvincible || !this.isAlive) return false;

    const oldHealth = this._currentHealth;
    this._currentHealth = Math.max(0, this._currentHealth - amount);

    const actualDamage = oldHealth - this._currentHealth;
    if (actualDamage > 0) {
      this.onDamaged.emit({ amount: actualDamage, newHealth: this._currentHealth });
      this.emitHealthChanged();

      // Start invincibility if configured
      if (this._invincibilityTime > 0) {
        this.startInvincibility();
      }

      // Check for death
      if (this._currentHealth === 0) {
        this.onDeath.emit();
      }

      return true;
    }

    return false;
  }

  /**
   * Heal this entity
   */
  heal(amount: number): boolean {
    if (!this.enabled || amount <= 0 || this.isFullHealth || !this.isAlive) return false;

    const oldHealth = this._currentHealth;
    this._currentHealth = Math.min(this._maxHealth, this._currentHealth + amount);

    const actualHealing = this._currentHealth - oldHealth;
    if (actualHealing > 0) {
      this.onHealed.emit({ amount: actualHealing, newHealth: this._currentHealth });
      this.emitHealthChanged();
      return true;
    }

    return false;
  }

  /**
   * Fully heal this entity
   */
  healToFull() {
    if (!this.enabled || !this.isAlive) return;

    const oldHealth = this._currentHealth;
    this._currentHealth = this._maxHealth;

    if (oldHealth < this._maxHealth) {
      const actualHealing = this._currentHealth - oldHealth;
      this.onHealed.emit({ amount: actualHealing, newHealth: this._currentHealth });
      this.emitHealthChanged();
    }
  }

  /**
   * Restore entity to full health (e.g., for respawn)
   */
  revive() {
    const wasAlive = this.isAlive;
    this._currentHealth = this._maxHealth;
    this._invincibilityTimer = 0;

    this.emitHealthChanged();

    if (!wasAlive) {
      // Could emit a revive event here if needed
    }
  }

  /**
   * Start invincibility period
   */
  startInvincibility(duration?: number) {
    const invincibilityDuration = duration ?? this._invincibilityTime;
    if (invincibilityDuration <= 0) return;

    this._invincibilityTimer = invincibilityDuration;
    this.onInvincibilityStarted.emit(invincibilityDuration);
  }

  /**
   * Get current health data
   */
  getHealthData(): HealthData {
    return {
      current: this._currentHealth,
      maximum: this._maxHealth,
      percentage: this.healthPercentage,
    };
  }

  protected override onUpdate(deltaTime: number) {
    // Update invincibility timer
    if (this._invincibilityTimer > 0) {
      this._invincibilityTimer = Math.max(0, this._invincibilityTimer - deltaTime);

      if (this._invincibilityTimer === 0) {
        this.onInvincibilityEnded.emit();
      }
    }
  }

  private emitHealthChanged() {
    this.onHealthChanged.emit(this.getHealthData());
  }
}
