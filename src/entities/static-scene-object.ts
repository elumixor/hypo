import { ColliderBehavior, Entity, TransformBehavior } from "@engine";
import { Box3, Mesh, type Object3D, Vector3 } from "three";
import { destroy } from "utils";
import { CollisionGroup } from "../scenes/combat/collision-group";

/**
 * A static scene object that can be placed in the world with automatic collision detection.
 * Takes a 3D mesh and creates a sphere collider based on the mesh's bounding box.
 */
export class StaticSceneObject extends Entity {
  private readonly transform = this.addBehavior(new TransformBehavior());
  private readonly collider;
  private readonly mesh: Object3D;
  private readonly originalRadius: number;

  constructor(mesh: Object3D, collisionGroup = CollisionGroup.Static) {
    super();

    // Clone the mesh to avoid sharing references
    this.mesh = mesh.clone();

    // Calculate bounding sphere radius from bounding box
    const box = new Box3().setFromObject(this.mesh);
    const size = box.getSize(new Vector3());
    const radius = Math.max(size.x, size.y, size.z) * 0.5;

    // Store original radius
    this.originalRadius = radius;

    // Add collider with calculated radius
    this.collider = this.addBehavior(new ColliderBehavior(collisionGroup, radius));

    // Enable shadow casting for all meshes in the object
    this.mesh.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  override async init() {
    await super.init();

    // Add mesh to transform group
    this.transform.group.add(this.mesh);
  }

  setPosition(x: number, y: number, z: number) {
    this.transform.group.position.set(x, y, z);
  }

  setRotation(x: number, y: number, z: number) {
    this.transform.group.rotation.set(x, y, z);
  }

  setScale(scale: number | Vector3) {
    if (typeof scale === "number") {
      this.transform.group.scale.setScalar(scale);
      this.collider.radius = this.originalRadius * scale;
    } else {
      this.transform.group.scale.copy(scale);
      const scaleFactor = Math.max(scale.x, scale.y, scale.z);
      this.collider.radius = this.originalRadius * scaleFactor;
    }
  }

  override destroy() {
    destroy(this.mesh);
    super.destroy();
  }
}
