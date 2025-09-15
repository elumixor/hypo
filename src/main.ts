import "./utils/globals";
import "@elumixor/frontils";

import { GameHypo } from "./game";

async function startGame(): Promise<void> {
  console.log("🎮 Initializing HYPO game with new engine architecture...");

  // Create and initialize the new game
  const game = new GameHypo();
  game.init();

  // Start the game loop
  let lastTime = performance.now();
  
  function gameLoop(currentTime: number): void {
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    // Update the game
    game.update(deltaTime);

    // Continue the loop
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  requestAnimationFrame(gameLoop);

  console.log("✅ HYPO modular game started successfully!");
  console.log("🏗️  Architecture: Entity-Behavior-Service-Widget-Scene-Game");
  
  // Expose game for debugging
  (window as any).hypoGame = game;
}

// Start the game
startGame().catch((error) => {
  console.error("❌ Failed to start game:", error);
});
