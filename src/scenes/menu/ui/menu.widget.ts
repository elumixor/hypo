import { Widget } from "@engine";
import type { ResizeData } from "@engine/game";
import { Text as PixiText } from "pixi.js";
import { LoaderService } from "services/loader.service";
import { Button } from "ui/button";
import { textStyle } from "ui/fonts";
import { MenuScene } from "../menu.scene";

export class MenuWidget extends Widget {
  private readonly loadStatusText = new PixiText({ text: "Loading...", style: textStyle.basic });
  private readonly startGameButton = new Button("Start Game");
  private readonly reloadGameButton = new Button("Reload Game");

  constructor() {
    super();

    this.loadStatusText.anchor.set(0, 1);
    this.addChild(this.reloadGameButton, this.loadStatusText);

    this.reloadGameButton.clicked.subscribe(() => {
      const randomColor = Math.floor(Math.random() * 0xffffff);
      this.game.threeRenderer.setClearColor(randomColor, 1);
      this.game.loadScene(new MenuScene());
    });
  }

  override async init() {
    await super.init();

    this.game.resized.subscribeImmediate(this.resize.bind(this));

    // For testing
    const loaderService = this.getService(LoaderService);
    loaderService?.loadProgress.subscribe((p) => {
      this.loadStatusText.text = `Loading... ${p.percentage.toFixed(2)}%`;
      if (p.percentage >= 100) this.loadStatusText.text = "Load Complete";
    });
  }

  private resize({ width, height, aspect }: ResizeData) {
    this.reloadGameButton.y = -height / 2 + 200;
    this.loadStatusText.y = height / 2 - 15;
    this.loadStatusText.x = -width / 2 + 15;
  }
}
