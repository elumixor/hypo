import { Resources } from "../resources";

/**
 * Game resources - all assets used in the game
 * This provides type-safe access to all game assets
 */
export const gameResources = new Resources()
  // 3D Models
  .add("Drone.glb") // 3D model for player and enemies
  .add("helios.glb") // Helios character model
  .add("portal-round.glb") // Round portal model
  .add("rocks.glb") // Rocks/environment model

  // 2D Textures
  .add("iris.png") // Iris character texture
  .add("helios.jpg") // Helios character texture
  .add("lucy.jpg") // Lucy character texture
  .add("lucy-concept.png") // Lucy concept art
  .add("iris-concept.png") // Iris concept art
  .add("kai-concept.png"); // Kai concept art

export type GameResources = typeof gameResources;

/**
 * Initialize and load all game resources
 * @param onProgress Optional progress callback for loading screen
 */
export async function initializeResources(
  onProgress?: (progress: { loaded: number; total: number; percentage: number; current?: string }) => void,
): Promise<void> {
  console.log("Loading game resources...");

  await gameResources.loadAll(onProgress);

  console.log("All resources loaded successfully!");
  console.log("Available resources:", gameResources.names);
}

// Example usage:
//
// await initializeResources((progress) => {
//   console.log(`Loading: ${progress.percentage}% (${progress.loaded}/${progress.total})`);
//   if (progress.current) {
//     console.log(`Current: ${progress.current}`);
//   }
// });
//
// // Now you can use resources with full type safety:
// const droneModel = gameResources.get("Drone"); // Type: GLTF
// const irisTexture = gameResources.get("iris"); // Type: Texture
//
// // Use in Three.js:
// scene.add(droneModel.scene);
//
// // Use in Pixi.js:
// const sprite = new PIXI.Sprite(irisTexture);
