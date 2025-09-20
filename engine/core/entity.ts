import type { Constructor } from "@elumixor/frontils";
import { TransformBehavior } from "@engine/behaviors/transform.behavior";
import type { Object3D } from "three";
import type { Behavior } from "./behavior";
import { EngineObject } from "./engine-object";
import type { Scene } from "./scene";
import type { Service } from "./service";

/**
 * Entity is the core building block of a scene.
 * It can have multiple behaviors attached to it to define its functionality.
 * It always has a TransformBehavior attached to it.
 */
export abstract class Entity extends EngineObject {
  readonly behaviors = [] as Behavior[];
  readonly transform = this.addBehavior(new TransformBehavior());
  readonly position = this.transform.position;
  readonly rotation = this.transform.rotation;
  readonly scale = this.transform.scale;

  private _scene?: Scene;

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

  get x() {
    return this.position.x;
  }
  set x(value: number) {
    this.position.x = value;
  }
  get y() {
    return this.position.y;
  }
  set y(value: number) {
    this.position.y = value;
  }
  get z() {
    return this.position.z;
  }
  set z(value: number) {
    this.position.z = value;
  }

  /** Called when the entity is initialized. This is effectively when it appears in the scene */
  override async init() {
    await super.init();
    await Promise.all(this.behaviors.map((b) => b.init()));
  }

  /** Called every frame while the entity is active in the scene. */
  override update(dt: number) {
    super.update(dt);
    for (const behavior of this.behaviors) if (behavior.enabled) behavior.update(dt);
  }

  /** Called when the entity is destroyed. */
  override destroy() {
    this._scene?.removeEntity(this);
    while (this.behaviors.length) this.removeBehavior(this.behaviors.first);
    super.destroy();
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

  addChild<T extends Object3D[]>(...child: T) {
    return this.transform.addChild(...child);
  }
}
