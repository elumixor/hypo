import { Widget } from "@engine";
import { Text as PixiText } from "pixi.js";
import { CombatScene } from "scenes/combat/combat.scene";
import { LevelProgressionService } from "services/level-progression.service";
import type { LevelConfig } from "types/level-config";
import { Button, textStyle } from "ui";

export class SafeZoneWidget extends Widget {
  private readonly titleText = new PixiText({
    text: "SAFE ZONE",
    style: { ...textStyle.basic, fontSize: 32, fontWeight: "bold", fill: "#44aa44" },
  });

  private readonly worldText = new PixiText({ text: "", style: textStyle.basic });

  private readonly enterCombatButton = new Button("Enter Combat");

  constructor(private readonly levelConfig: LevelConfig) {
    super();

    // Center the texts
    this.titleText.anchor.set(0.5, 0.5);
    this.worldText.anchor.set(0.5, 0.5);

    // Position elements
    this.worldText.y = 50;
    this.enterCombatButton.y = 120;

    // Update display with level config
    this.updateDisplay();

    this.addChild(this.titleText, this.worldText, this.enterCombatButton);
  }

  private updateDisplay() {
    this.worldText.text = `${this.levelConfig.worldName} - World ${this.levelConfig.worldNumber}`;
  }

  override async init() {
    await super.init();

    // Set up button handler
    this.enterCombatButton.clicked.subscribe(() => {
      const progressionService = this.getService(LevelProgressionService);
      const nextLevel = progressionService.nextLevel();
      this.game.loadScene(new CombatScene(nextLevel));
    });
  }
}
