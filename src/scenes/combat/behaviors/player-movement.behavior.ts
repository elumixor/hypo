import { Behavior } from "@engine";
import { TransformBehavior } from "behaviors/transform-behavior";
import { Vector3 } from "three";

export class PlayerMovementBehavior extends Behavior {
  private readonly speed = 5;
  private readonly keys = new Set<string>();
  private readonly moveDirection = new Vector3();
  private transform!: TransformBehavior;

  override async init() {
    await super.init();

    this.transform = this.getBehavior(TransformBehavior);

    // Set up keyboard event listeners
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  private readonly onKeyDown = (event: KeyboardEvent) => {
    this.keys.add(event.code);
  };

  private readonly onKeyUp = (event: KeyboardEvent) => {
    this.keys.delete(event.code);
  };

  override update(dt: number) {
    super.update(dt);

    // Reset movement direction
    this.moveDirection.set(0, 0, 0);

    // Check for movement keys (WASD)
    if (this.keys.has("KeyW") || this.keys.has("ArrowUp")) {
      this.moveDirection.z -= 1;
    }
    if (this.keys.has("KeyS") || this.keys.has("ArrowDown")) {
      this.moveDirection.z += 1;
    }
    if (this.keys.has("KeyA") || this.keys.has("ArrowLeft")) {
      this.moveDirection.x -= 1;
    }
    if (this.keys.has("KeyD") || this.keys.has("ArrowRight")) {
      this.moveDirection.x += 1;
    }

    // Normalize and apply movement
    if (this.moveDirection.length() > 0) {
      this.moveDirection.normalize();
      this.moveDirection.multiplyScalar(this.speed * dt * 0.01);

      this.transform.group.position.add(this.moveDirection);

      // Rotate player to face movement direction
      if (this.moveDirection.x !== 0 || this.moveDirection.z !== 0) {
        const angle = Math.atan2(this.moveDirection.x, this.moveDirection.z);
        this.transform.group.rotation.y = angle;
      }
    }
  }

  override destroy() {
    super.destroy();

    // Clean up event listeners
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }
}
