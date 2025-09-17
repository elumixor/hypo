import { Entity, ticker } from "@engine";
import { TransformBehavior } from "behaviors/transform-behavior";
import { resources } from "resources";
import type { Object3D } from "three";
import { destroy } from "utils";
import { CameraFollowBehavior } from "../behaviors/camera-follow.behavior";
import { PlayerHealthBehavior } from "../behaviors/player-health.behavior";
import { PlayerMovementBehavior } from "../behaviors/player-movement.behavior";

export class Player extends Entity {
  private model!: Object3D;

  constructor() {
    super();

    this.addBehavior(new TransformBehavior());
    this.addBehavior(new PlayerMovementBehavior());
    this.addBehavior(new CameraFollowBehavior());
    this.addBehavior(new PlayerHealthBehavior());
  }

  override async init() {
    await super.init();

    this.getBehavior(CameraFollowBehavior).targetTransform = this.getBehavior(TransformBehavior);

    // Load the drone model
    const { scene } = resources.get("models/drone");
    this.model = scene.children.first.clone();

    // Enable shadow casting for all meshes in the model
    this.model.traverse((child) => {
      if (child.type === "Mesh") child.castShadow = true;
    });

    // Add model to transform behavior's group
    const transform = this.getBehavior(TransformBehavior);
    transform.group.add(this.model);
    transform.group.position.y = 5;
  }

  override update(dt: number) {
    super.update(dt);

    // Add subtle hover animation to the model
    this.model.position.y = Math.sin(ticker.lastTime * 0.002) * 0.1;
  }

  override destroy() {
    destroy(this.model);

    super.destroy();
  }
}
