import "utils/globals";
import "@elumixor/frontils";

// Note: resources.ts still has some issues, so we'll initialize without it for now
// import { resources } from "resources";
import { GameHypo } from "./game";

async function startGame(): Promise<void> {
  console.log("🎮 Initializing HYPO game with new modular architecture...");

  // TODO: Once resources.ts is fixed, uncomment this section
  // console.log("Loading game resources...");
  // await resources.load(({ percentage, loaded, total }) =>
  //   console.log(`Loading: ${percentage.toFixed(1)}% (${loaded}/${total})`),
  // );
  // console.log("All resources loaded successfully!");

  // Create and initialize the new modular game
  const game = new GameHypo();
  game.init();

  // Set up the game loop
  let lastTime = performance.now();
  
  function gameLoop(currentTime: number): void {
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    // Update the game (this updates all scenes, services, entities, behaviors, widgets)
    game.update(deltaTime);

    // Continue the loop
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  requestAnimationFrame(gameLoop);

  console.log("✅ HYPO modular game started successfully!");
  console.log("🏗️  Architecture: Entity-Behavior-Service-Widget-Scene-Game");
  console.log("🎮 Current scene: Menu (use game.startCombat() to switch to combat)");
}

// Expose game controls for debugging
declare global {
  interface Window {
    hypoGame?: GameHypo;
  }
}

// Start the game
startGame().catch((error) => {
  console.error("❌ Failed to start game:", error);
});