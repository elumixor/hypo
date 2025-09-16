import { Game } from "@engine";
import { MainMenuScene } from "scenes/main-menu/main-menu.scene";
import { ResourcesLoaderService } from "services/resources-loader.service";
import { SaveLoadService } from "services/save-load.service";
import { GameStateService } from "systems/game-state";

export class GameHypo extends Game {
  readonly menuScene = new MainMenuScene();

  constructor() {
    super();

    this.addService(new ResourcesLoaderService());
    this.addService(new SaveLoadService());
    this.addService(new GameStateService());
  }

  override async start() {
    await super.start();
    await this.loadScene(this.menuScene);
  }
}
