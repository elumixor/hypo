import { Game } from "@engine";
import { CombatScene } from "scenes/combat/combat.scene";
import { MainMenuScene } from "scenes/main-menu/main-menu.scene";
import { LevelProgressionService } from "services/level-progression.service";
import { ResourcesLoaderService } from "services/resources-loader.service";
import { SaveLoadService } from "services/save-load.service";
import { GameStateService } from "systems/game-state";

export class GameHypo extends Game {
  constructor() {
    super();

    this.addService(new ResourcesLoaderService());
    this.addService(new SaveLoadService());
    this.addService(new GameStateService());
    this.addService(new LevelProgressionService());
  }

  override async start() {
    await super.start();

    await this.loadScene(new MainMenuScene());
    if (__DEV__) {
      // In development, start a new game automatically but use proper progression
      const saveLoadService = this.getService(SaveLoadService);
      const levelProgressionService = this.getService(LevelProgressionService);

      saveLoadService.startNewGame();
      levelProgressionService.resetProgression();
      const initialLevel = levelProgressionService.currentLevel;

      if (initialLevel.levelType === "safe_zone") {
        const { SafeZoneScene } = await import("scenes/safe-zone/safe-zone.scene");
        await this.loadScene(new SafeZoneScene(initialLevel));
      } else {
        await this.loadScene(new CombatScene(initialLevel));
      }
    }
  }
}
