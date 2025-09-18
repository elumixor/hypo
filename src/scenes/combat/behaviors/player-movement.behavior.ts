import { Behavior, TransformBehavior } from "@engine";
import { Vector3 } from "three";
import type { CombatInputMappingContext } from "../combat-input-mapping.context";

export class PlayerMovementBehavior extends Behavior {
  private readonly speed = 5;
  private readonly moveDirection = new Vector3();
  private transform!: TransformBehavior;
  override async init() {
    await super.init();

    this.transform = this.getBehavior(TransformBehavior);
  }

  override get input() {
    return super.input as CombatInputMappingContext;
  }

  override update(dt: number) {
    super.update(dt);

    // Reset movement direction
    this.moveDirection.set(0, 0, 0);

    // Get movement from input
    const { x, y } = this.input.playerMovement.value;
    this.moveDirection.x = x;
    this.moveDirection.z = -y;

    // Apply movement
    if (this.moveDirection.length() > 0) {
      this.moveDirection.multiplyScalar(this.speed * dt * 0.01);

      this.transform.group.position.add(this.moveDirection);

      // Rotate player to face movement direction
      const angle = Math.atan2(this.moveDirection.x, this.moveDirection.z);
      this.transform.group.rotation.y = angle;
    }
  }
}
