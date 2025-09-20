import { Behavior, ColliderBehavior, CollisionService, resolveMovement } from "@engine";
import { Vector3 } from "three";
import type { CombatInputMappingContext } from "../combat-input-mapping.context";

export class PlayerMovementBehavior extends Behavior {
  private readonly speed = 5;
  private readonly moveDirection = new Vector3();
  private collisionService!: CollisionService;

  override async init() {
    await super.init();
    this.collisionService = this.getService(CollisionService);
  }

  override update(dt: number) {
    super.update(dt);

    // Reset movement direction
    this.moveDirection.set(0, 0, 0);

    // Get movement from input
    const { x, y } = (this.input as CombatInputMappingContext).playerMovement.value;
    this.moveDirection.x = x;
    this.moveDirection.z = -y;

    // Apply movement with collision resolution
    if (this.moveDirection.length() > 0) {
      this.moveDirection.multiplyScalar(this.speed * dt * 0.01);

      // Calculate desired new position
      const currentPosition = this.transform.position.clone();
      const desiredPosition = currentPosition.clone().add(this.moveDirection);

      // Get the player's collider to check for collisions
      const playerCollider = this.entity.getBehavior(ColliderBehavior);
      if (playerCollider) {
        // Get collision candidates and resolve movement
        const candidates = this.collisionService.getCollisionCandidates(playerCollider);
        const correctedPosition = resolveMovement(playerCollider, desiredPosition, candidates);

        // Apply the corrected position
        this.transform.position.copy(correctedPosition);
      } else {
        // Fallback to simple movement if no collider
        this.transform.position.copy(desiredPosition);
      }

      // Rotate player to face movement direction
      const angle = Math.atan2(this.moveDirection.x, this.moveDirection.z);
      this.transform.rotation.y = angle;
    }
  }
}
