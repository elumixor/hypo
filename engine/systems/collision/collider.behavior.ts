import { EventEmitter } from "@elumixor/event-emitter";
import { Behavior } from "@engine/core";
import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import type { CollisionEvent } from "./collision-event";

export class ColliderBehavior extends Behavior {
  private static debugGeometry = new SphereGeometry(1, 8, 6);
  private static debugMaterial = new MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
  });

  readonly collided = new EventEmitter<CollisionEvent>();
  readonly currentCollisions = new Set<ColliderBehavior>();

  private debugMesh?: Mesh;

  constructor(
    readonly collisionGroup: string,
    private _radius = 1,
  ) {
    super();
  }

  get radius() {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;
    if (this.debugMesh) this.debugMesh.scale.setScalar(this._radius);
  }

  get transformScale() {
    const { x, y, z } = this.transform.scale;
    return Math.max(x, y, z);
  }

  get debugSphereShown() {
    return !!this.debugMesh;
  }

  set debugSphereShown(value: boolean) {
    if (value === !!this.debugMesh) return; // No change

    // Remove if present
    if (this.debugMesh) {
      this.debugMesh.removeFromParent();
      this.debugMesh = undefined;
    }
    // Add if requested
    else {
      // Create mesh
      this.debugMesh = new Mesh(ColliderBehavior.debugGeometry, ColliderBehavior.debugMaterial);
      this.debugMesh.scale.setScalar(this._radius);

      // Add to transform
      this.transform.addChild(this.debugMesh);
    }
  }
}
