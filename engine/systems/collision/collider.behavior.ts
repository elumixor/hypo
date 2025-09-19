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
  private _radius: number;
  readonly currentCollisions = new Set<ColliderBehavior>();

  readonly collided = new EventEmitter<CollisionEvent>();

  constructor(
    readonly collisionGroup: string,
    radius = 1,
  ) {
    super();
    this._radius = radius;
  }

  get radius() {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;

    // Update debug mesh if shown
    if (!this.debugMesh) return;

    // Dispose old geometry
    this.debugMesh.geometry.dispose();

    // Create new geometry with updated radius
    const geometry = new SphereGeometry(this._radius, 8, 6);
    this.debugMesh.geometry = geometry;
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
