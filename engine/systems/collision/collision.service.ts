import { Service } from "@engine/core";
import { ColliderBehavior } from "./collider.behavior";

export class CollisionService extends Service {
  protected override _enabled = true;

  private readonly collisionMatrix: Map<string, Set<string>> = new Map();

  addCollisionGroup(group: string, collidesWith: string[]) {
    this.collisionMatrix.set(group, new Set(collidesWith));

    for (const targetGroup of collidesWith) {
      const existing = this.collisionMatrix.get(targetGroup);

      if (existing) existing.add(group);
      else this.collisionMatrix.set(targetGroup, new Set([group]));
    }
  }

  override update(dt: number) {
    super.update(dt);

    if (!this.scene) throw new Error("CollisionService has no scene");

    const colliders = this.scene.getBehaviors(ColliderBehavior);
    const previousCollisions = new Map<ColliderBehavior, Set<ColliderBehavior>>();

    // Store previous collision state
    for (const collider of colliders) {
      const currentCollisions = new Set(collider.currentCollisions);
      previousCollisions.set(collider, currentCollisions);
      collider.currentCollisions.clear();
    }

    // Check all pairs of colliders
    for (let i = 0; i < colliders.length; i++) {
      for (let j = i + 1; j < colliders.length; j++) {
        const colliderA = colliders[i];
        const colliderB = colliders[j];

        if (!colliderA || !colliderB) continue;

        // Skip if they don't belong to colliding groups
        if (!this.collisionMatrix.get(colliderA.collisionGroup)?.has(colliderB.collisionGroup)) continue;

        // Check if they intersect
        const distance = colliderA.transform.position.distanceToSquared(colliderB.transform.position);
        const radius = colliderA.radius * colliderA.transformScale + colliderB.radius * colliderB.transformScale;
        const intersects = distance < radius * radius;

        if (!intersects) continue;

        // Record the collision for both colliders
        colliderA.currentCollisions.add(colliderB);
        colliderB.currentCollisions.add(colliderA);

        // Emit collision events if this is a new collision
        const prevCollisionsA = previousCollisions.get(colliderA);

        if (prevCollisionsA && !prevCollisionsA.has(colliderB)) {
          colliderA.collided.emit({ other: colliderB, self: colliderA });
          colliderB.collided.emit({ other: colliderA, self: colliderB });
        }
      }
    }
  }

  /** Utility function to log the collision matrix as a table to the console */
  logCollisionMatrix() {
    const groups = Array.from(this.collisionMatrix.keys());

    const table = groups.map((group) => {
      const row: Record<string, unknown> = { Group: group };

      for (const other of groups) row[other] = this.collisionMatrix.get(group)?.has(other) ?? false;
      return row;
    });

    console.table(table);
  }
}
