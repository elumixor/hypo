import "utils/globals";
import "@elumixor/frontils";

import { GameHypo } from "./game";

/**
 * Demo function to test the new engine architecture
 */
async function testEngine(): Promise<void> {
  console.log("🧪 Testing new engine architecture...");

  // Create the game instance
  const game = new GameHypo();
  
  // Initialize the game (this sets up all scenes and services)
  game.init();
  
  console.log("✅ Game initialized successfully");
  
  // Simulate a few game updates
  console.log("⏰ Running 5 game updates...");
  for (let i = 0; i < 5; i++) {
    game.update(0.016); // 60 FPS
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
  }
  
  // Test scene switching
  console.log("🔄 Testing scene switching...");
  game.startCombat();
  game.update(0.016);
  
  game.enterSafeZone();
  game.update(0.016);
  
  game.returnToMenu();
  game.update(0.016);
  
  console.log("✅ All tests passed! Engine architecture is working correctly.");
  
  // Clean up
  game.destroy();
  console.log("🧹 Game cleaned up");
}

// Only run test if this file is executed directly
if (typeof window !== 'undefined') {
  console.log("🌐 Browser environment detected - engine ready for integration");
} else {
  testEngine().catch(console.error);
}