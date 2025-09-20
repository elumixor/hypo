import { Entity } from "@engine";
import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

// This is a simple example entity that adds a rotating cube to the scene
// We could create a behavior for this, but it's better to keep simple code directly in entities
// Only extract to behaviors if it is:
// - complex
// - reusable
// - parameterized
export class RotatingCube extends Entity {
  private readonly cube = new Mesh(new BoxGeometry(3, 3, 3), new MeshBasicMaterial({ color: 0x0095dd }));

  override async init() {
    await super.init();

    this.scene.sceneRoot.add(this.cube);
  }

  override update(dt: number): void {
    super.update(dt);

    // Simple rotation animation
    this.cube.rotation.x += 0.001 * dt;
    this.cube.rotation.y += 0.001 * dt;
  }

  override destroy(): void {
    // Clean up
    this.cube.removeFromParent();
    this.cube.geometry.dispose();

    super.destroy();
  }
}
