import { Widget } from "@engine";
import { Text as PixiText } from "pixi.js";
import type { LevelConfig } from "services/level-progression.service";
import { textStyle } from "ui/fonts";

export class LevelInfoWidget extends Widget {
  private readonly worldText = new PixiText({ text: "", style: textStyle.basic });
  private readonly levelText = new PixiText({ text: "", style: textStyle.basic });
  private readonly sampleText = new PixiText({ text: "", style: textStyle.basic });

  // todo: we should get level config from service
  constructor(private levelConfig: LevelConfig) {
    super();

    // Set up text styles
    this.worldText.style = { ...textStyle.basic, fontSize: 16, fontWeight: "bold" };
    this.levelText.style = { ...textStyle.basic, fontSize: 14 };
    this.sampleText.style = { ...textStyle.basic, fontSize: 12, fill: 0xaaaaaa };

    // Add texts to widget
    this.addChild(this.worldText, this.levelText, this.sampleText);

    // Update display
    this.updateDisplay();
  }

  override async init() {
    await super.init();

    this.onImmediate(this.game.resized, this.onResize.bind(this));
  }

  updateLevel(levelConfig: LevelConfig) {
    this.levelConfig = levelConfig;
    this.updateDisplay();
  }

  private updateDisplay() {
    this.worldText.text = `World ${this.levelConfig.worldNumber}: ${this.levelConfig.worldName}`;
    this.levelText.text = this.levelConfig.levelName;

    if (this.levelConfig.sampleName) {
      this.sampleText.text = this.levelConfig.sampleName;
      this.sampleText.visible = true;
    } else {
      this.sampleText.visible = false;
    }

    // Position texts vertically
    this.levelText.y = this.worldText.height + 4;
    this.sampleText.y = this.levelText.y + this.levelText.height + 2;
  }

  private onResize({ width, height }: { width: number; height: number }) {
    this.position.set(width / 2 - 220, -height / 2 + 20);
  }
}
