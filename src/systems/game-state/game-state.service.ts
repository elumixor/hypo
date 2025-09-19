import { Service } from "@engine";
import type { LevelProgressionState } from "services/level-progression.service";
import { SaveLoadService } from "services/save-load.service";
import type { CharacterProgressionState } from "./game-state";

export class GameStateService extends Service {
  private saveLoadService!: SaveLoadService;

  override async init() {
    await super.init();
    this.saveLoadService = this.getService(SaveLoadService);
  }

  get state() {
    return this.saveLoadService.currentSavedGame?.state;
  }

  get levelProgression(): LevelProgressionState | undefined {
    return this.state?.levelProgression;
  }

  get characterProgression(): CharacterProgressionState | undefined {
    return this.state?.characterProgression;
  }

  saveLevelProgression(progressionState: LevelProgressionState) {
    const currentSave = this.saveLoadService.currentSavedGame;
    if (currentSave) {
      currentSave.state.levelProgression = progressionState;
      this.saveLoadService.saveGame();
    }
  }

  saveCharacterProgression(progressionState: CharacterProgressionState) {
    const currentSave = this.saveLoadService.currentSavedGame;
    if (currentSave) {
      currentSave.state.characterProgression = progressionState;
      this.saveLoadService.saveGame();
    }
  }
}
