import { EventEmitter } from "@elumixor/event-emitter";
import { Behavior } from "@engine";
import { HealthService } from "../services/health.service";

export interface HealthChangedEvent {
  health: number;
  maxHealth: number;
  isAlive: boolean;
}

export class PlayerHealthBehavior extends Behavior {
  readonly healthChanged = new EventEmitter<HealthChangedEvent>();
  private healthService!: HealthService;

  override async init() {
    await super.init();

    this.healthService = this.getService(HealthService);
  }

  get health() {
    return this.healthService.health;
  }

  get maxHealth() {
    return this.healthService.maxHealth;
  }

  get isAlive() {
    return this.healthService.isAlive;
  }

  takeDamage(amount: number) {
    this.healthService.takeDamage(amount);
    this.emitHealthChanged();
  }

  heal(amount: number) {
    this.healthService.heal(amount);
    this.emitHealthChanged();
  }

  private emitHealthChanged() {
    this.healthChanged.emit({
      health: this.health,
      maxHealth: this.maxHealth,
      isAlive: this.isAlive,
    });
  }
}
