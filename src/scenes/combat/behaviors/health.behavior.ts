import { EventEmitter } from "@elumixor/event-emitter";
import { Behavior } from "@engine";

export interface HealthEvent {
  health: number;
  maxHealth: number;
  isAlive: boolean;
}

// todo: should be moved to player stats/skills/abilities service - no need to be sitting on the entity
export class HealthBehavior extends Behavior {
  readonly healthChanged = new EventEmitter<HealthEvent>();

  constructor(
    private _health: number,
    readonly maxHealth: number = _health,
  ) {
    super();
  }

  get health() {
    return this._health;
  }

  set health(value: number) {
    this._health = clamp(value, 0, this.maxHealth);
    this.healthChanged.emit({ health: this.health, maxHealth: this.maxHealth, isAlive: this.isAlive });
  }

  get isAlive() {
    return this.health > 0;
  }
}
