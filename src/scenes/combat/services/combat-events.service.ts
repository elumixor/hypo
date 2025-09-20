import { EventEmitter } from "@elumixor/event-emitter";
import { type Entity, Service } from "@engine";
import type { Vector3 } from "three";

export interface DamageEvent {
  target: Entity;
  damage: number;
  position: Vector3;
}

export class CombatEventsService extends Service {
  readonly damageDealt = new EventEmitter<DamageEvent>();

  dealDamage(target: Entity, damage: number, position: Vector3) {
    this.damageDealt.emit({ target, damage, position });
  }
}
