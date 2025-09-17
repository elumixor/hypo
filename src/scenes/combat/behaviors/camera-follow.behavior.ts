import { Behavior } from "@engine";
import type { TransformBehavior } from "behaviors/transform.behavior";
import { Vector3 } from "three";

export class CameraFollowBehavior extends Behavior {
  offset = new Vector3(1, 1, 1).multiplyScalar(20); // Offset for isometric view
  followSpeed = 0.02; // How quickly camera follows (higher = faster)

  private readonly targetPosition = new Vector3(); // Position to interpolate to
  private _targetTransform?: TransformBehavior;

  get targetTransform(): TransformBehavior | undefined {
    return this._targetTransform;
  }
  set targetTransform(transform: TransformBehavior) {
    this._targetTransform = transform;

    // Calculate target camera position based on player position + offset
    this.targetPosition.copy(transform.group.position).add(this.offset);

    // Smoothly interpolate camera position
    this.entity.scene.camera.position.copy(this.targetPosition);
    this.entity.scene.camera.lookAt(transform.group.position);
  }

  override update(dt: number) {
    super.update(dt);

    const { targetTransform } = this;
    if (!targetTransform) return;

    // Calculate target camera position based on player position + offset
    this.targetPosition.copy(targetTransform.group.position).add(this.offset);

    // Smoothly interpolate camera position
    this.entity.scene.camera.position.lerp(this.targetPosition, this.followSpeed * dt);
  }
}
