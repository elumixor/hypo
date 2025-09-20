import { Entity } from "@engine";
import { resources } from "resources";
import { StaticSceneObject } from "../../../entities/static-scene-object";
import type { ObstacleConfig } from "../../configs";

/**
 * Manages obstacle placement in the combat scene based on configuration
 */
export class ObstacleManager extends Entity {
  private readonly obstacles: StaticSceneObject[] = [];

  constructor(private readonly obstacleConfigs: ObstacleConfig[]) {
    super();
  }

  override async init() {
    await super.init();

    // Get all rock models from the rocks.glb file
    const { scene } = resources.get("models/rocks");
    const rockMeshes = scene.children;

    // Place obstacles based on configuration
    for (let i = 0; i < this.obstacleConfigs.length; i++) {
      const config = this.obstacleConfigs[i];
      if (!config) continue;

      // For now, only handle rock type obstacles
      if (config.type !== 'rock') continue;

      // Cycle through available rock models
      const rockMesh = rockMeshes[i % rockMeshes.length];
      if (!rockMesh) continue;

      // Create static scene object for this obstacle
      const obstacle = new StaticSceneObject(rockMesh);

      // Apply transform from configuration
      obstacle.position.set(config.position.x, config.position.y, config.position.z);
      
      // Apply scale
      const scale = config.position.scale ?? 1.0;
      if (config.position.scaleX || config.position.scaleY || config.position.scaleZ) {
        obstacle.scale.set(
          (config.position.scaleX ?? 1.0) * 5,
          (config.position.scaleY ?? 1.0) * 5,
          (config.position.scaleZ ?? 1.0) * 5
        );
      } else {
        obstacle.scale.setScalar(scale * 5);
      }

      // Apply rotation
      obstacle.rotation.set(
        config.position.rotationX ?? 0,
        config.position.rotationY ?? 0,
        config.position.rotationZ ?? 0
      );

      this.obstacles.push(obstacle);
      this.scene.addEntity(obstacle);
    }
  }

  override destroy() {
    for (const obstacle of this.obstacles) {
      obstacle.destroy();
    }
    this.obstacles.length = 0;
    super.destroy();
  }
}
