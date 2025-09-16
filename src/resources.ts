import { Resources } from "@elumixor/thrixi-resources";

/**
 * Game resources - all assets used in the game
 * This provides type-safe access to all game assets
 */
export const resources = new Resources("/hypo/assets")
  // 3D Models
  .add("models/drone.glb") // 3D model for player and enemies
  .add("models/helios.glb") // Helios (main character) model
  .add("models/portal.glb") // Portal model
  .add("models/rocks.glb") // Rocks model

  // 2D - character sprites
  .add("sprites/characters/kira.png")
  .add("sprites/characters/helios.jpg")
  .add("sprites/characters/lucy.jpg")
  .add("sprites/characters/darius.png")
  .add("sprites/characters/iris.png")
  .add("sprites/characters/kai.png");

export type GameResources = typeof resources;
