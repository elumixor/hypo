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
  .add("helios.jpg") // Helios character texture
  .add("kai-concept.png") // Kai character texture (concept art)
  .add("iris.png") // Iris character texture
  .add("iris-concept.png") // Iris character texture (concept art)
  .add("lucy-concept.png"); // Lucy character texture (concept art)

export type GameResources = typeof gameResources;
