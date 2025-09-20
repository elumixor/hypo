import { ColliderBehavior, Entity, TransformBehavior, ticker } from "@engine";
import { resources } from "resources";
import type { Object3D } from "three";
import { CollisionGroup } from "../../../collision-group";
import { CameraFollowBehavior } from "../behaviors/camera-follow.behavior";
import { SafeZoneMovementBehavior } from "../behaviors/safe-zone-movement.behavior";

export class SafeZonePlayer extends Entity {
  private readonly cameraFollow = this.addBehavior(new CameraFollowBehavior());

  private model!: Object3D;

  constructor() {
    super();
    // Add collision for interaction detection
    this.addBehavior(new ColliderBehavior(CollisionGroup.Player));
    this.addBehavior(new SafeZoneMovementBehavior());
  }

  override async init() {
    await super.init();

    this.cameraFollow.targetTransform = this.transform;

    // Load the helios model
    const { scene } = resources.get("models/helios");
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
    super.destroy();
    if (this.model) {
      this.model.removeFromParent();
    }
  }
}
