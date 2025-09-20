import { Behavior, type TransformBehavior } from "@engine";
import { Vector3 } from "three";

export class CameraFollowBehavior extends Behavior {
  offset = new Vector3(1, 1, 1).multiplyScalar(20);
  followSpeed = 10;
  targetTransform?: TransformBehavior;

  private readonly targetPosition = new Vector3(); // Position to interpolate to

  updateInstantly() {
    if (!this.targetTransform) return;

    const { camera } = this.entity.scene;

    camera.position.copy(this.targetTransform.position).add(this.offset);
    camera.lookAt(this.targetTransform.position);
  }

  override update(dt: number) {
    super.update(dt);

    if (!this.targetTransform) return;

    // Calculate target camera position based on player position + offset
    this.targetPosition.copy(this.targetTransform.position).add(this.offset);

    // Smoothly interpolate camera position
    this.entity.scene.camera.position.lerp(this.targetPosition, (this.followSpeed * dt) / 1000);
  }
}
