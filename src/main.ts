import "@elumixor/frontils";
import "./utils/globals";

import { GameHypo } from "./game";

async function start() {
  // Create and initialize the new game
  const game = new GameHypo();
  await game.start();
}

// Start the game
start().catch((error) => {
  console.error("❌ Game crashed:", error);
});
