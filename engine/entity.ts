import type { Constructor } from "@elumixor/frontils";
import type { Behavior } from "./behavior";
import { InputService } from "./input/input.service";
import type { InputMappingContext } from "./input/input-mapping-context";
import type { Scene } from "./scene";
import type { Service } from "./service";

/**
 * Entity is the core building block of a scene. It can have multiple behaviors attached to it to define its functionality.
 */
export abstract class Entity {
  private _scene?: Scene;
  readonly behaviors = [] as Behavior[];

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
    for (const behavior of this.behaviors) behavior.update(dt);
  }

  /** Called when the entity is destroyed. */
  destroy() {
    for (const behavior of this.behaviors) behavior.destroy();
  }

  /** This should be called before onInit() - in constructor() */
  addBehavior<T extends Behavior>(behavior: T) {
    behavior.entity = this;
    this.behaviors.push(behavior);
    return behavior;
  }

  removeBehavior(behavior: Behavior) {
    if (!this.behaviors.includes(behavior)) return;
    if (this._scene) behavior.destroy();
    this.behaviors.remove(behavior);
  }

  getService<T extends Service>(serviceClass: Constructor<T>) {
    return this.scene.getService(serviceClass);
  }

  getBehavior<T extends Behavior>(behaviorClass: Constructor<T>) {
    const behavior = this.behaviors.find((b) => b instanceof behaviorClass) as T | undefined;
    if (!behavior) throw new Error(`Behavior ${behaviorClass.name} not found on entity ${this.name}`);
    return behavior;
  }

  getInputContext(): InputMappingContext | undefined {
    return this.getService(InputService).context;
  }
}
