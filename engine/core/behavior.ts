import type { Constructor } from "@elumixor/frontils";
import { EngineObject } from "./engine-object";
import type { Entity } from "./entity";
import type { Service } from "./service";

/**
 * Behaviors define reusable logic that can be attached to entities.
 */
export abstract class Behavior extends EngineObject {
  private _entity?: Entity;

  get entity() {
    if (!this._entity) throw new Error(`Behavior ${this.name} is not attached to an entity yet`);
    return this._entity;
  }
  set entity(entity: Entity) {
    this._entity = entity;
  }

  get transform() {
    return this.entity.transform;
  }

  protected get scene() {
    return this.entity.scene;
  }

  protected get input() {
    return this.scene.input;
  }

  getService<T extends Service>(serviceClass: Constructor<T>) {
    return this.entity.getService(serviceClass);
  }

  getBehavior<T extends Behavior>(behaviorClass: Constructor<T>) {
    return this.entity.getBehavior(behaviorClass);
  }

  override destroy() {
    this._entity?.removeBehavior(this);
    super.destroy();
  }
}
