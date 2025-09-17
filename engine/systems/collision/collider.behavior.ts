import { EventEmitter } from "@elumixor/event-emitter";
import { TransformBehavior } from "@engine/behaviors/transform.behavior";
import { Behavior } from "@engine/core";
import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import { destroy } from "utils";

export interface CollisionEvent {
  other: ColliderBehavior;
  self: ColliderBehavior;
}

export class ColliderBehavior extends Behavior {
  private transform!: TransformBehavior;
  private debugMesh?: Mesh;
  readonly currentCollisions = new Set<ColliderBehavior>();
  public radius: number; // Simple sphere radius for all entities

  readonly collided = new EventEmitter<CollisionEvent>();

  constructor(readonly collisionGroup: string, radius = 1) {
    super();
    this.radius = radius;
  }

  override async init() {
    await super.init();
    this.transform = this.getBehavior(TransformBehavior);
  }

  get position() {
    return this.transform.group.position;
  }

  get debugSphereShown() {
    return !!this.debugMesh;
  }

  set debugSphereShown(value: boolean) {
    if (value === !!this.debugMesh) return; // No change

    // Remove if present
    if (this.debugMesh) {
      this.debugMesh.removeFromParent();
      destroy(this.debugMesh);
      this.debugMesh = undefined;
    }
    // Add if requested
    else {
      // Create wireframe sphere geometry
      const geometry = new SphereGeometry(this.radius, 8, 6);

      // Create green wireframe material
      const material = new MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
        depthTest: false,
      });

      // Create mesh
      this.debugMesh = new Mesh(geometry, material);

      // Add to transform group
      this.transform.group.add(this.debugMesh);
    }
  }

  /**
   * Check if this collider intersects with another collider
   */
  intersects(other: ColliderBehavior): boolean {
    const distance = this.position.distanceTo(other.position);
    return distance < this.radius + other.radius;
  }

  override destroy() {
    this.debugSphereShown = false;
    super.destroy();
  }
}
