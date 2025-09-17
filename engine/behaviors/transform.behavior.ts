import { Behavior } from "@engine/core";
import { Group } from "three";

/**
 * TransformBehavior provides a standardized way for entities to be positioned in the scene.
 * It acts as a root container using a Three.js Group, which can have position, scale, and rotation.
 * Other behaviors can use this transform to add models and manipulate movement.
 */
export class TransformBehavior extends Behavior {
  readonly group = new Group();

  override async init() {
    await super.init();
    this.entity.scene.sceneRoot.add(this.group);
  }

  override destroy() {
    this.entity.scene.sceneRoot.remove(this.group);
    super.destroy();
  }
}
