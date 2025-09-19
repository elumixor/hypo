import { EventEmitter } from "@elumixor/event-emitter";
import { Service, Entity } from "@engine";
import { Vector3 } from "three";

export interface DamageEvent {
  entity: Entity;
  damage: number;
  position: Vector3;
}

export class CombatEventsService extends Service {
  readonly damageDealt = new EventEmitter<DamageEvent>();

  dealDamage(entity: Entity, damage: number, position: Vector3) {
    this.damageDealt.emit({ entity, damage, position });
  }
}