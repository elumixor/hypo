import { Game } from "../engine/game";
import { CombatScene } from "./scenes/combat-scene/scene";
import { MenuScene } from "./scenes/menu-scene/scene";
import { SafeZoneScene } from "./scenes/safe-zone-scene/scene";

export class GameHypo extends Game {
  protected override onInit(): void {
    super.onInit();
    
    // Register scenes
    this.registerScene(new MenuScene());
    this.registerScene(new CombatScene());
    this.registerScene(new SafeZoneScene());
    
    // Switch to initial scene
    this.switchToScene("menu");
  }

  // Convenience methods for scene switching
  startCombat(): void {
    this.switchToScene("combat");
  }

  enterSafeZone(): void {
    this.switchToScene("safe-zone");
  }

  returnToMenu(): void {
    this.switchToScene("menu");
  }
}