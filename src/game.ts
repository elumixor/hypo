import { Game } from "../engine/game";
import { CombatScene } from "./scenes/combat-scene/scene";

export class GameHypo extends Game {
  protected override onInit(): void {
    super.onInit();
    
    // Register scenes
    this.registerScene(new CombatScene());
    
    // Switch to initial scene
    this.switchToScene("combat");
  }
}