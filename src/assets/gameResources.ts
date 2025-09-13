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
  .add("characters/Helios.png") // Helios character texture
  .add("characters/Kai.png") // Kai character texture
  .add("characters/Iris.png") // Iris character texture
  .add("characters/Kira.png") // Kira character texture
  .add("characters/Darius.png"); // Darius character texture

export type GameResources = typeof gameResources;
