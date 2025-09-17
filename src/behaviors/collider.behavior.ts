import { EventEmitter } from "@elumixor/event-emitter";
import { Behavior } from "@engine";
import { TransformBehavior } from "behaviors/transform.behavior";
import type { Vector3 } from "three";
import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import { destroy } from "utils";

export interface CollisionEvent {
  other: ColliderBehavior;
  self: ColliderBehavior;
}

export class ColliderBehavior extends Behavior {
  private transform!: TransformBehavior;
  private debugMesh?: Mesh;
  private readonly currentCollisions = new Set<ColliderBehavior>();
  readonly radius = 1; // Simple sphere radius for all entities

  readonly collided = new EventEmitter<CollisionEvent>();
  initialized = false;

  override async init() {
    await super.init();
    this.transform = this.getBehavior(TransformBehavior);
    this.createDebugVisualization();
    this.initialized = true;
  }

  override update(dt: number) {
    super.update(dt);
    this.checkCollisions();
  }

  get position(): Vector3 {
    return this.transform.group.position;
  }

  /**
   * Check if this collider intersects with another collider
   */
  intersects(other: ColliderBehavior): boolean {
    const distance = this.position.distanceTo(other.position);
    return distance < this.radius + other.radius;
  }

  private createDebugVisualization() {
    // Create wireframe sphere geometry
    const geometry = new SphereGeometry(this.radius, 8, 6);

    // Create green wireframe material
    const material = new MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    // Create mesh
    this.debugMesh = new Mesh(geometry, material);

    // Add to transform group
    this.transform.group.add(this.debugMesh);
  }

  private checkCollisions() {
    const previousCollisions = new Set(this.currentCollisions);
    this.currentCollisions.clear();

    for (const other of this.scene.getBehaviors(ColliderBehavior)) {
      if (other === this) continue; // Skip self collision

      // Check if we intersect
      if (!this.intersects(other)) continue;

      // Only emit event if this is a new collision (not continuing from previous frame)
      this.currentCollisions.add(other);
      if (!previousCollisions.has(other)) {
        // Emit collision events for both colliders
        this.collided.emit({ other, self: this });
        other.collided.emit({ other: this, self: other });
      }
    }
  }

  override destroy() {
    if (this.debugMesh) {
      destroy(this.debugMesh);
    }
    super.destroy();
  }
}
