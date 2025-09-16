import { EventEmitter } from "@elumixor/frontils";
import { Service } from "@engine";

export interface HealthChangeData {
  currentHealth: number;
  maxHealth: number;
  damage?: number;
}

export class HealthService extends Service {
  readonly onHealthChanged = new EventEmitter<HealthChangeData>();
  readonly onDeath = new EventEmitter<void>();
  readonly onHealed = new EventEmitter<{ amount: number; currentHealth: number }>();

  private currentHealth: number;
  private readonly maxHealth: number;

  constructor(maxHealth: number) {
    super();
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
  }

  get health(): number {
    return this.currentHealth;
  }

  get maxHealthValue(): number {
    return this.maxHealth;
  }

  get isAlive(): boolean {
    return this.currentHealth > 0;
  }

  takeDamage(amount: number): void {
    if (!this.isAlive) return;

    const oldHealth = this.currentHealth;
    this.currentHealth = Math.max(0, this.currentHealth - amount);

    this.onHealthChanged.emit({
      currentHealth: this.currentHealth,
      maxHealth: this.maxHealth,
      damage: amount,
    });

    if (this.currentHealth <= 0 && oldHealth > 0) {
      this.onDeath.emit();
    }
  }

  heal(amount: number): void {
    if (!this.isAlive) return;

    const oldHealth = this.currentHealth;
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);

    if (this.currentHealth > oldHealth) {
      this.onHealed.emit({
        amount: this.currentHealth - oldHealth,
        currentHealth: this.currentHealth,
      });

      this.onHealthChanged.emit({
        currentHealth: this.currentHealth,
        maxHealth: this.maxHealth,
      });
    }
  }

  setFullHealth(): void {
    const wasAlive = this.isAlive;
    this.currentHealth = this.maxHealth;

    this.onHealthChanged.emit({
      currentHealth: this.currentHealth,
      maxHealth: this.maxHealth,
    });

    if (!wasAlive) {
      // If was dead and now alive, could emit resurrection event
    }
  }

  // For save/load functionality
  getState() {
    return {
      currentHealth: this.currentHealth,
      maxHealth: this.maxHealth,
    };
  }

  setState(state: { currentHealth: number }): void {
    this.currentHealth = Math.min(state.currentHealth, this.maxHealth);
  }
}
