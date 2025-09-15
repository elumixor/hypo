import "../../../utils/globals";
import { Widget } from "../../../../engine/widget";

export class MainMenu extends Widget {
  protected override onInit(): void {
    super.onInit();
    console.log("[MainMenu] Main menu initialized");
  }

  protected override onEnterScene(): void {
    super.onEnterScene();
    console.log("[MainMenu] Main menu entered scene");
  }

  // Placeholder methods for menu functionality
  startNewGame(): void {
    console.log("[MainMenu] Starting new game");
    // Would switch to combat scene
  }

  showOptions(): void {
    console.log("[MainMenu] Showing options");
  }

  exitGame(): void {
    console.log("[MainMenu] Exiting game");
  }
}