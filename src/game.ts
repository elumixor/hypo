import { Game } from "@engine";
import { MenuScene } from "scenes/menu/menu.scene";
import { LoaderService } from "services/loader.service";

export class GameHypo extends Game {
  readonly menuScene = new MenuScene();

  constructor() {
    super();

    this.addService(new LoaderService());
  }

  override async start() {
    await super.start();
    await this.loadScene(this.menuScene);
  }
}
