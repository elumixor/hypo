import { Scene } from "../../../engine/scene";

export class SafeZoneScene extends Scene {
  constructor() {
    super("safe-zone");
  }

  protected override onInit(): void {
    super.onInit();
    console.log("[SafeZoneScene] Safe zone scene initialized");
    // Add safe zone NPCs, vendors, etc.
  }

  protected override onEnterScene(): void {
    super.onEnterScene();
    console.log("[SafeZoneScene] Entered safe zone");
  }

  protected override onExitScene(): void {
    super.onExitScene();
    console.log("[SafeZoneScene] Exited safe zone");
  }
}