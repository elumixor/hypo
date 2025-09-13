import type { Texture } from "pixi.js";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import { type LoadingProgress, Resources } from "../src/resources";

/**
 * Simple demo showcasing the type-safe resource loading system
 */
async function resourceDemo() {
  console.log("🎮 Resource System Demo");
  console.log("======================");

  // Create resources with fluent API
  const resources = new Resources()
    .add("Drone.glb") // Will be typed as 3D model (GLTF)
    .add("kira.png"); // Will be typed as 2D texture

  console.log("📋 Resources to load:", resources.names);
  console.log("📊 Initial progress:", resources.progress);

  // Load all resources with progress tracking
  try {
    await resources.loadAll((progress: LoadingProgress) => {
      console.log(`📥 Loading: ${progress.percentage.toFixed(1)}% (${progress.loaded}/${progress.total})`);
      if (progress.current) {
        console.log(`   Current: ${progress.current}`);
      }
    });

    console.log("✅ All resources loaded!");

    // Type-safe resource access
    const droneModel = resources.get("Drone") as GLTF;
    const kiraTexture = resources.get("kira") as Texture;

    console.log("🤖 Drone model:", droneModel.scene ? "✅ Has scene" : "❌ No scene");
    console.log(
      "🖼️ Kira texture:",
      kiraTexture.width ? `✅ ${kiraTexture.width}x${kiraTexture.height}px` : "❌ Invalid texture",
    );

    return { droneModel, kiraTexture };
  } catch (error) {
    console.error("❌ Failed to load resources:", error);
    throw error;
  }
}

// Export for use in game
export { resourceDemo };
