import { Service } from "../../engine/service";
import { EventEmitter } from "@elumixor/frontils";
import type { Entity } from "../../engine/entity";

export class CombatService extends Service {
  readonly entityDamaged = new EventEmitter<{ entity: Entity; amount: number }>();

  damageEntity(entity: Entity, amount: number): void {
    this.entityDamaged.emit({ entity, amount });
  }
}