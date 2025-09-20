import { Behavior } from "@engine/core";
import { Group, type Object3D } from "three";

/**
 * TransformBehavior provides a standardized way for entities to be positioned in the scene.
 * It acts as a root container using a Three.js Group, which can have position, scale, and rotation.
 * Other behaviors can use this transform to add models and manipulate movement.
 */
export class TransformBehavior extends Behavior {
  readonly group = new Group();

  readonly position = this.group.position;
  readonly rotation = this.group.rotation;
  readonly scale = this.group.scale;

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

  addChild<T extends Object3D[]>(...child: T): T[0] {
    this.group.add(...child);
    return child[0] as T[0];
  }

  override async init() {
    await super.init();
    this.entity.scene.sceneRoot.add(this.group);
  }

  override destroy() {
    this.entity.scene.sceneRoot.remove(this.group);
    super.destroy();
  }
}
