import type { Constructor } from "@elumixor/frontils";
import type { Entity } from "./entity";
import type { Service } from "./service";

/**
 * Behaviors define reusable logic that can be attached to entities.
 */
export abstract class Behavior {
  private _entity?: Entity;
  private _enabled = true;

  get name() {
    return this.constructor.name;
  }

  get enabled() {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  get entity() {
    if (!this._entity) throw new Error(`Behavior ${this.name} is not attached to an entity yet`);
    return this._entity;
  }

  set entity(entity: Entity) {
    this._entity = entity;
  }

  get scene() {
    return this.entity.scene;
  }

  protected get input() {
    return this.scene.input;
  }

  /** Called when the behavior appears in the scene. */
  async init() {
    // Override in subclasses
  }

  update(_dt: number) {
    // Override in subclasses
  }

  destroy() {
    this._entity?.removeBehavior(this);
  }

  protected getService<T extends Service>(serviceClass: Constructor<T>) {
    return this.entity.getService(serviceClass);
  }

  protected getBehavior<T extends Behavior>(behaviorClass: Constructor<T>) {
    return this.entity.getBehavior(behaviorClass);
  }
}
