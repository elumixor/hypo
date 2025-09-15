import { Scene } from "../../../engine/scene";

export class MenuScene extends Scene {
  constructor() {
    super("menu");
  }

  protected override onInit(): void {
    super.onInit();
    console.log("[MenuScene] Menu scene initialized");
    // Add menu-specific UI widgets here
  }

  protected override onEnterScene(): void {
    super.onEnterScene();
    console.log("[MenuScene] Entered menu scene");
  }

  protected override onExitScene(): void {
    super.onExitScene();
    console.log("[MenuScene] Exited menu scene");
  }
}