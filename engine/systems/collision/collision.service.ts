import { Service } from "@engine/core";
import { ColliderBehavior } from "./collider.behavior";
import { separateColliders } from "./collision-resolution";
import { SpatialGrid } from "./spatial-grid";

export class CollisionService extends Service {
  protected override _enabled = true;

  private readonly collisionMatrix: Map<string, Set<string>> = new Map();
  private readonly spatialGrid = new SpatialGrid(10); // 10 unit cell size
  private readonly staticColliders = new Set<ColliderBehavior>();
  private staticCollidersInitialized = false;

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

    // Initialize static colliders only once
    if (!this.staticCollidersInitialized) {
      this.initializeStaticColliders(colliders);
      this.staticCollidersInitialized = true;
    }

    // Clear spatial grid and rebuild with current positions
    this.spatialGrid.clear();

    // Insert static colliders (they don't move but we need them in the grid)
    for (const staticCollider of this.staticColliders) {
      this.spatialGrid.insert(staticCollider);
    }

    // Insert dynamic colliders
    for (const collider of colliders) {
      if (!collider.isStatic) {
        this.spatialGrid.insert(collider);
      }
    }

    const previousCollisions = new Map<ColliderBehavior, Set<ColliderBehavior>>();

    // Store previous collision state
    for (const collider of colliders) {
      const currentCollisions = new Set(collider.currentCollisions);
      previousCollisions.set(collider, currentCollisions);
      collider.currentCollisions.clear();
    }

    // Check collisions using spatial grid
    for (const collider of colliders) {
      if (!collider.isStatic) {
        // Only check dynamic colliders for collisions
        const candidates = this.spatialGrid.query(collider);

        for (const other of candidates) {
          // Skip if they don't belong to colliding groups
          if (!this.collisionMatrix.get(collider.collisionGroup)?.has(other.collisionGroup)) continue;

          // Check if they intersect
          const distance = collider.transform.position.distanceToSquared(other.transform.position);
          const radius = collider.radius * collider.transformScale + other.radius * other.transformScale;
          const intersects = distance < radius * radius;

          if (!intersects) continue;

          // Record the collision for both colliders
          collider.currentCollisions.add(other);
          other.currentCollisions.add(collider);

          // Emit collision events if this is a new collision
          const prevCollisions = previousCollisions.get(collider);

          if (prevCollisions && !prevCollisions.has(other)) {
            collider.collided.emit({ other, self: collider });
            other.collided.emit({ other: collider, self: other });
          }

          // Apply collision resolution to separate overlapping colliders
          separateColliders(collider, other);
        }
      }
    }
  }

  /**
   * Initialize static colliders - called only once
   */
  private initializeStaticColliders(colliders: ColliderBehavior[]): void {
    for (const collider of colliders) {
      if (collider.isStatic) {
        this.staticColliders.add(collider);
      }
    }
  }

  /**
   * Get potential collision targets for a collider at a given position
   * Useful for movement prediction
   */
  getCollisionCandidates(collider: ColliderBehavior): ColliderBehavior[] {
    const candidates = this.spatialGrid.query(collider);
    return Array.from(candidates).filter((other) =>
      this.collisionMatrix.get(collider.collisionGroup)?.has(other.collisionGroup),
    );
  }

  /**
   * Add a new static collider to the system
   */
  addStaticCollider(collider: ColliderBehavior): void {
    if (collider.isStatic) {
      this.staticColliders.add(collider);
    }
  }

  /**
   * Remove a static collider from the system
   */
  removeStaticCollider(collider: ColliderBehavior): void {
    this.staticColliders.delete(collider);
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
