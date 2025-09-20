import { Behavior } from "@engine";
import { Vector3 } from "three";
import type { SafeZoneInputMappingContext } from "../safe-zone-input-mapping.context";

export class SafeZoneMovementBehavior extends Behavior {
  private readonly speed = 5;
  private readonly moveDirection = new Vector3();

  override update(dt: number) {
    super.update(dt);

    // Reset movement direction
    this.moveDirection.set(0, 0, 0);

    // Get movement from input
    const { x, y } = (this.input as SafeZoneInputMappingContext).playerMovement.value;
    this.moveDirection.x = x;
    this.moveDirection.z = -y;

    // Apply movement
    if (this.moveDirection.length() > 0) {
      this.moveDirection.multiplyScalar(this.speed * dt * 0.01);

      this.transform.position.add(this.moveDirection);

      // Rotate player to face movement direction
      const angle = Math.atan2(this.moveDirection.x, this.moveDirection.z);
      this.transform.rotation.y = angle;
    }
  }
}
