import { ColliderBehavior, Entity } from "@engine";
import { CollisionGroup } from "collision-group";
import { Box3, Mesh, type Object3D, Vector3 } from "three";

/**
 * A static scene object that can be placed in the world with automatic collision detection.
 * Takes a 3D mesh and creates a sphere collider based on the mesh's bounding box.
 */
export class StaticSceneObject extends Entity {
  private readonly mesh;
  constructor(mesh: Object3D) {
    super();

    this.mesh = mesh.clone();

    // Calculate bounding sphere radius from bounding box
    const box = new Box3().setFromObject(this.mesh);
    const size = box.getSize(new Vector3());
    const radius = Math.max(size.x, size.y, size.z) * 0.5;

    // Add collider with calculated radius and mark as static
    this.addBehavior(new ColliderBehavior(CollisionGroup.Static, radius, true));

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
    this.transform.addChild(this.mesh);
  }
}
