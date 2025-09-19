import { Game } from "@engine";
import { resources } from "resources";
import { CombatScene } from "scenes/combat/combat.scene";
import { MainMenuScene } from "scenes/main-menu/main-menu.scene";
import { ResourcesLoaderService } from "services/resources-loader.service";
import { SaveLoadService } from "services/save-load.service";
import { GameStateService } from "systems/game-state";

export class GameHypo extends Game {
  constructor() {
    super();

    this.addService(new ResourcesLoaderService());
    this.addService(new SaveLoadService());
    this.addService(new GameStateService());
  }

  override async start() {
    await super.start();

    await this.loadScene(new MainMenuScene());
    if (__DEV__) {
      await this.loadScene(new CombatScene()); // temporary, instantly load combat scene
    }
  }
}
