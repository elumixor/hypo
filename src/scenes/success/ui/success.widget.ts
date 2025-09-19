import { Widget } from "@engine";
import { Text as PixiText } from "pixi.js";
import { SafeZoneScene } from "scenes/safe-zone/safe-zone.scene";
import { LevelProgressionService } from "services/level-progression.service";
import { textStyle } from "ui/fonts";

export class SuccessWidget extends Widget {
  private readonly victoryText = new PixiText({
    text: "VICTORY!",
    style: { ...textStyle.basic, fontSize: 48, fontWeight: "bold", fill: "#44ff44" },
  });

  private readonly completionText = new PixiText({
    text: "You have conquered all 6 worlds!",
    style: { ...textStyle.basic, fontSize: 24, fill: "#ffffff" },
  });

  private readonly restartText = new PixiText({
    text: "Restarting in 5 seconds...",
    style: { ...textStyle.basic, fontSize: 18, fill: "#aaaaaa" },
  });

  constructor() {
    super();

    // Center the texts
    this.victoryText.anchor.set(0.5, 0.5);
    this.completionText.anchor.set(0.5, 0.5);
    this.restartText.anchor.set(0.5, 0.5);

    // Position texts vertically
    this.completionText.y = 60;
    this.restartText.y = 120;

    this.addChild(this.victoryText, this.completionText, this.restartText);
  }

  override async init() {
    await super.init();

    // Get the level progression service to reset progress
    const progressionService = this.getService(LevelProgressionService);

    // Wait 5 seconds then restart the progression
    setTimeout(() => {
      progressionService.resetProgression();
      const firstWorldSafeZone = progressionService.currentLevel;
      this.game.loadScene(new SafeZoneScene(firstWorldSafeZone));
    }, 5000);
  }
}
