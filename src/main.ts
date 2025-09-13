import "utils/globals";
import "@elumixor/frontils";

import { initializeResources } from "./assets/gameResources";
import { Game } from "./core/Game";

async function startGame() {
  console.log("🎮 Initializing HYPO game...");

  // Initialize resources with progress tracking
  await initializeResources((progress) => {
    console.log(`Loading: ${progress.percentage.toFixed(1)}% (${progress.loaded}/${progress.total})`);
    if (progress.current) {
      console.log(`Current: ${progress.current}`);
    }
  });

  // Create and initialize the game
  const game = new Game(document.body);
  await game.init();
  console.log("✅ HYPO modular game started successfully!");
}

// Start the game
startGame().catch((error) => {
  console.error("❌ Failed to start game:", error);
});
