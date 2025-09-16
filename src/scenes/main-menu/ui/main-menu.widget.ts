import { nonNullAssert } from "@elumixor/frontils";
import { Widget } from "@engine";
import type { ResizeData } from "@engine/game";
import { Text as PixiText } from "pixi.js";
import { CombatScene } from "scenes/combat/combat.scene";
import { ResourcesLoaderService } from "services/resources-loader.service";
import { SaveLoadService } from "services/save-load.service";
import { Button } from "ui/button";
import { textStyle } from "ui/fonts";

export class MainMenuWidget extends Widget {
  private readonly gameTitle = new PixiText({
    text: "HYPO",
    style: { ...textStyle.basic, fontSize: 72, fontWeight: "bold" },
  });
  private readonly loadStatusText = new PixiText({ text: "Loading...", style: textStyle.basic });

  private readonly newGameButton = new Button("New Game");
  private readonly resumeGameButton = new Button("Resume Game");
  private readonly loadGameButton = new Button("Load Game");
  private readonly settingsButton = new Button("Settings");
  private readonly buttons = [this.newGameButton, this.resumeGameButton, this.loadGameButton, this.settingsButton];

  private saveLoadService!: SaveLoadService;

  constructor() {
    super();

    this.gameTitle.anchor.set(0.5);
    this.loadStatusText.anchor.set(0, 1);

    this.addChild(...this.buttons, this.gameTitle, this.loadStatusText);

    this.setupButtonHandlers();
  }

  override async init() {
    await super.init();

    // Get game state service
    this.saveLoadService = this.getService(SaveLoadService);

    // Set button visibility based on game state
    this.resumeGameButton.visible = this.saveLoadService.savedGames.nonEmpty;
    this.loadGameButton.visible = this.saveLoadService.savedGames.nonEmpty;

    // Resize
    this.game.resized.subscribeImmediate(this.resize.bind(this));

    // For testing - show load progress
    const loaderService = this.getService(ResourcesLoaderService);
    loaderService?.loadProgress.subscribe((p) => {
      this.loadStatusText.text = `Loading... ${p.percentage.toFixed(2)}%`;
      if (p.percentage >= 100) this.loadStatusText.text = "Load Complete";
    });
  }

  private setupButtonHandlers() {
    this.newGameButton.clicked.subscribe(() => {
      this.saveLoadService.startNewGame();
      this.game.loadScene(new CombatScene());
    });

    this.resumeGameButton.clicked.subscribe(() => {
      this.saveLoadService.resumeLastGame();
      this.game.loadScene(new CombatScene());
    });

    this.loadGameButton.clicked.subscribe(() => {
      // For now, load the last saved game
      // TODO: Implement proper load game menu
      const lastSave = this.saveLoadService.currentSavedGame;

      // Should be non-null, as button is hidden otherwise
      nonNullAssert(lastSave);
      this.saveLoadService.loadGame(lastSave);
      this.game.loadScene(new CombatScene());
    });

    this.settingsButton.clicked.subscribe(() => {
      // TODO: Implement settings scene
      console.log("Settings not implemented yet");
    });
  }

  private resize({ width, height }: ResizeData) {
    // Position title at top
    this.gameTitle.y = -225;

    // Position buttons vertically centered
    const buttonSpacing = 90;
    const visibleButtons = this.buttons.filter((b) => b.visible);

    for (const [i, button] of visibleButtons.entries())
      button.y = buttonSpacing * (i - (visibleButtons.length - 1) / 2);

    // Position load status at bottom left
    this.loadStatusText.y = height / 2 - 15;
    this.loadStatusText.x = -width / 2 + 15;
  }
}
