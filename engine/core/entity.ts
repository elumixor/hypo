import type { Constructor } from "@elumixor/frontils";
import { type InputMappingContext, InputService } from "@engine/systems/input";
import type { Behavior } from "./behavior";
import type { Scene } from "./scene";
import type { Service } from "./service";

/**
 * Entity is the core building block of a scene. It can have multiple behaviors attached to it to define its functionality.
 */
export abstract class Entity {
  readonly behaviors = [] as Behavior[];
  enabled = true;

  private _scene?: Scene;

  get name() {
    return this.constructor.name;
  }

  get scene() {
    if (!this._scene) throw new Error(`Entity ${this.name} is not part of a scene yet`);
    return this._scene;
  }

  set scene(scene: Scene) {
    this._scene = scene;
  }

  get input() {
    return this.scene.input;
  }

  /** Called when the entity is initialized. This is effectively when it appears in the scene */
  async init() {
    await Promise.all(this.behaviors.map((b) => b.init()));
  }

  /** Called every frame while the entity is active in the scene. */
  update(dt: number) {
    for (const behavior of this.behaviors) if (behavior.enabled) behavior.update(dt);
  }

  /** Called when the entity is destroyed. */
  destroy() {
    this._scene?.removeEntity(this);
    while (this.behaviors.length) this.removeBehavior(this.behaviors.first);
  }

  /** This should be called before onInit() - in constructor() */
  addBehavior<T extends Behavior>(behavior: T) {
    behavior.entity = this;
    this.behaviors.push(behavior);
    return behavior;
  }

  removeBehavior(behavior: Behavior) {
    if (!this.behaviors.includes(behavior)) return;
    this.behaviors.remove(behavior);
    behavior.destroy();
  }

  getService<T extends Service>(serviceClass: Constructor<T>) {
    return this.scene.getService(serviceClass);
  }

  getBehavior<T extends Behavior>(behaviorClass: Constructor<T>) {
    const behavior = this.behaviors.find((b) => b instanceof behaviorClass && b.enabled) as T | undefined;
    if (!behavior) throw new Error(`Behavior ${behaviorClass.name} not found on entity ${this.name}`);
    return behavior;
  }

  getBehaviors<T extends Behavior>(behaviorClass: Constructor<T>): T[] {
    return this.behaviors.filter((b) => b instanceof behaviorClass && b.enabled) as T[];
  }

  getInputContext(): InputMappingContext | undefined {
    return this.getService(InputService).context;
  }
}
