import { Entity } from "@engine";
import { resources } from "resources";
import { StaticSceneObject } from "../../../entities/static-scene-object";

/**
 * Manages rock placement in the combat scene
 */
export class RockManager extends Entity {
  private readonly rocks: StaticSceneObject[] = [];

  override async init() {
    await super.init();

    // Get all rock models from the rocks.glb file
    const { scene } = resources.get("models/rocks");
    const rockMeshes = scene.children;

    console.log(`Found ${rockMeshes.length} rock models`);

    // Define placement positions around the level (50x50 ground)
    // Place rocks in a scattered pattern, avoiding the center where combat happens
    const positions = [
      // Outer ring
      { x: -18, z: -18, scale: 1.2 },
      { x: 20, z: -15, scale: 0.8 },
      { x: -15, z: 22, scale: 1.5 },
      { x: 18, z: 20, scale: 1.0 },
      { x: -22, z: 5, scale: 1.1 },
      { x: 25, z: -5, scale: 0.9 },
      { x: 5, z: -20, scale: 1.3 },
      { x: -8, z: 18, scale: 1.0 },
      // Inner positions (further from center but still accessible)
      { x: -12, z: -10, scale: 0.7 },
      { x: 15, z: -8, scale: 1.1 },
      { x: -10, z: 12, scale: 0.9 },
      { x: 12, z: 10, scale: 1.2 },
    ];

    // Place rocks using different models and positions
    for (let i = 0; i < positions.length && i < rockMeshes.length * 1.5; i++) {
      const position = positions[i];
      if (!position) continue;

      // Cycle through available rock models
      const rockIndex = i % rockMeshes.length;
      const rockMesh = rockMeshes[rockIndex];
      if (!rockMesh) continue;

      // Create static scene object for this rock
      const rock = new StaticSceneObject(rockMesh);

      // Position and scale the rock
      rock.setPosition(position.x, 0, position.z);
      rock.setScale(position.scale * 5);

      // Add some random rotation for variety
      rock.setRotation(0, Math.random() * Math.PI * 2, 0);

      this.rocks.push(rock);
      this.scene.addEntity(rock);
    }

    console.log(`Placed ${this.rocks.length} rocks in the scene`);
  }
}
