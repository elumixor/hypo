import type { Vector3 } from "three";
import type { ColliderBehavior } from "./collider.behavior";

/**
 * Resolve collision between two colliders by separating them
 * @param colliderA First collider
 * @param colliderB Second collider
 * @param separationDistance Minimum distance to maintain between colliders
 */
export function separateColliders(
  colliderA: ColliderBehavior,
  colliderB: ColliderBehavior,
  separationDistance?: number,
): void {
  const posA = colliderA.transform.position;
  const posB = colliderB.transform.position;

  // Calculate radii
  const radiusA = colliderA.radius * colliderA.transformScale;
  const radiusB = colliderB.radius * colliderB.transformScale;
  const minDistance = separationDistance ?? radiusA + radiusB;

  // Calculate current distance (only X and Z, ignoring Y)
  const dx = posA.x - posB.x;
  const dz = posA.z - posB.z;
  const currentDistance = Math.sqrt(dx * dx + dz * dz);

  // If colliders are overlapping, separate them
  if (currentDistance < minDistance && currentDistance > 0) {
    const separationAmount = minDistance - currentDistance;

    // Normalize the direction vector
    const dirX = dx / currentDistance;
    const dirZ = dz / currentDistance;

    // Determine how much each collider should move based on whether they're static
    let moveAmountA = separationAmount * 0.5;
    let moveAmountB = separationAmount * 0.5;

    if (colliderA.isStatic && !colliderB.isStatic) {
      // A is static, only move B
      moveAmountA = 0;
      moveAmountB = separationAmount;
    } else if (!colliderA.isStatic && colliderB.isStatic) {
      // B is static, only move A
      moveAmountA = separationAmount;
      moveAmountB = 0;
    }
    // If both are static, don't move either (shouldn't happen in normal gameplay)

    // Apply separation
    posA.x += dirX * moveAmountA;
    posA.z += dirZ * moveAmountA;
    posB.x -= dirX * moveAmountB;
    posB.z -= dirZ * moveAmountB;
  }
}

/**
 * Check if a movement would cause a collision and return a corrected position
 * @param collider The collider trying to move
 * @param newPosition The desired new position
 * @param otherColliders Other colliders to check against
 * @returns Corrected position that avoids collisions
 */
export function resolveMovement(
  collider: ColliderBehavior,
  newPosition: Vector3,
  otherColliders: ColliderBehavior[],
): Vector3 {
  const radius = collider.radius * collider.transformScale;
  const correctedPosition = newPosition.clone();

  for (const other of otherColliders) {
    if (other === collider) continue;

    const otherRadius = other.radius * other.transformScale;
    const minDistance = radius + otherRadius;

    const dx = correctedPosition.x - other.transform.position.x;
    const dz = correctedPosition.z - other.transform.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance < minDistance && distance > 0) {
      // Push the position away from the other collider
      const pushDistance = minDistance - distance;
      const dirX = dx / distance;
      const dirZ = dz / distance;

      correctedPosition.x += dirX * pushDistance;
      correctedPosition.z += dirZ * pushDistance;
    }
  }

  return correctedPosition;
}

/**
 * Check if a position would cause a collision with any of the given colliders
 * @param position Position to check
 * @param radius Radius of the object at this position
 * @param otherColliders Colliders to check against
 * @returns True if collision would occur
 */
export function wouldCollide(position: Vector3, radius: number, otherColliders: ColliderBehavior[]): boolean {
  for (const other of otherColliders) {
    const otherRadius = other.radius * other.transformScale;
    const minDistance = radius + otherRadius;

    const dx = position.x - other.transform.position.x;
    const dz = position.z - other.transform.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance < minDistance) {
      return true;
    }
  }

  return false;
}
