import "utils/globals";
import "@elumixor/frontils";

import { resources } from "resources";
import { Game } from "./core/Game";

async function startGame() {
  console.log("🎮 Initializing HYPO game...");

  // Initialize resources with progress tracking
  console.log("Loading game resources...");
  await resources.load(({ percentage, loaded, total }) =>
    console.log(`Loading: ${percentage.toFixed(1)}% (${loaded}/${total})`),
  );

  console.log("All resources loaded successfully!");
  console.log("Available resources:", resources.names);

  // Create and initialize the game
  const game = new Game(document.body);
  await game.init();
  console.log("✅ HYPO modular game started successfully!");
}

// Start the game
startGame().catch((error) => {
  console.error("❌ Failed to start game:", error);
});
