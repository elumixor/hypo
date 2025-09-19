import { Widget } from "@engine";
import { Text as PixiText } from "pixi.js";
import { SafeZoneScene } from "scenes/safe-zone/safe-zone.scene";
import { LevelProgressionService } from "services/level-progression.service";
import { textStyle } from "ui/fonts";

export class DeathWidget extends Widget {
  private readonly deathText = new PixiText({
    text: "YOU DIED",
    style: { ...textStyle.basic, fontSize: 48, fontWeight: "bold", fill: "#ff4444" },
  });

  private readonly restartText = new PixiText({
    text: "Restarting in 3 seconds...",
    style: { ...textStyle.basic, fontSize: 18, fill: "#aaaaaa" },
  });

  constructor() {
    super();

    // Center the texts
    this.deathText.anchor.set(0.5, 0.5);
    this.restartText.anchor.set(0.5, 0.5);

    // Position restart text below death text
    this.restartText.y = 80;

    this.addChild(this.deathText, this.restartText);
  }

  override async init() {
    await super.init();

    // Get the level progression service to reset progress
    const progressionService = this.getService(LevelProgressionService);
    progressionService.onPlayerDied();

    // Wait 3 seconds then load the safe zone scene (world 1 restart)
    setTimeout(() => {
      const firstWorldSafeZone = progressionService.currentLevel;
      this.game.loadScene(new SafeZoneScene(firstWorldSafeZone));
    }, 3000);
  }
}
