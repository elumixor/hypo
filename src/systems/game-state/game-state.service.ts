import { Service } from "@engine";
import { SaveLoadService } from "services/save-load.service";

export class GameStateService extends Service {
  private saveLoadService!: SaveLoadService;

  override async init() {
    await super.init();
    this.saveLoadService = this.getService(SaveLoadService);
  }

  get state() {
    return this.saveLoadService.currentSavedGame?.state;
  }
}
