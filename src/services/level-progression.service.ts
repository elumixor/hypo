import { EventEmitter } from "@elumixor/event-emitter";
import { Service } from "@engine";
import type { GameStateService } from "systems/game-state/game-state.service";
import type { LevelConfig } from "types/level-config";
import {
  BOSS_LEVELS_IN_WORLD_6,
  COMBAT_LEVELS_PER_WORLD,
  SAMPLE_LEVELS_PER_WORLD,
  TOTAL_WORLDS,
  WORLD_NAMES,
} from "types/level-config";

export interface LevelProgressionState {
  currentWorldNumber: number;
  currentLevelIndex: number; // 0 = safe zone, 1-5 = combat levels, 6 = boss
  isCompleted: boolean;
}

export interface LevelTransitionEvent {
  previousLevel: LevelConfig;
  nextLevel: LevelConfig;
}

export class LevelProgressionService extends Service {
  readonly levelChanged = new EventEmitter<LevelTransitionEvent>();
  readonly gameCompleted = new EventEmitter<void>();
  readonly playerDied = new EventEmitter<void>();

  private _state: LevelProgressionState = {
    currentWorldNumber: 1,
    currentLevelIndex: 0, // Start in safe zone
    isCompleted: false,
  };

  private readonly sampledCombatLevels: Map<number, number[]> = new Map();
  private gameStateService?: GameStateService; // Will be set in init

  override async init() {
    await super.init();
    this.gameStateService = this.getService((await import("systems/game-state")).GameStateService);
  }

  get currentState(): Readonly<LevelProgressionState> {
    return { ...this._state };
  }

  get currentLevel(): LevelConfig {
    return this.getLevelConfig(this._state.currentWorldNumber, this._state.currentLevelIndex);
  }

  initializeFromSave(state?: LevelProgressionState) {
    if (state) {
      this._state = { ...state };
    } else if (this.gameStateService?.levelProgression) {
      this._state = { ...this.gameStateService.levelProgression };
    } else {
      this.resetProgression();
    }
    this.ensureSampledLevels();
  }

  resetProgression() {
    this._state = {
      currentWorldNumber: 1,
      currentLevelIndex: 0,
      isCompleted: false,
    };
    this.sampledCombatLevels.clear();
    this.ensureSampledLevels();
    this.saveProgression();
  }

  nextLevel(): LevelConfig {
    const previousLevel = this.currentLevel;

    // Move to next level
    this.advanceLevel();

    const nextLevel = this.currentLevel;

    // Save progression state
    this.saveProgression();

    this.levelChanged.emit({ previousLevel, nextLevel });

    return nextLevel;
  }

  onPlayerDied() {
    this.playerDied.emit();
    this.resetProgression();
  }

  onGameCompleted() {
    this._state.isCompleted = true;
    this.gameCompleted.emit();
    // Reset progression after completion
    setTimeout(() => this.resetProgression(), 5000);
  }

  private advanceLevel() {
    if (this._state.currentWorldNumber === TOTAL_WORLDS) {
      // World 6 has 6 boss levels
      if (this._state.currentLevelIndex < BOSS_LEVELS_IN_WORLD_6) {
        this._state.currentLevelIndex++;
      } else {
        // Game completed!
        this.onGameCompleted();
        return;
      }
    } else {
      // Worlds 1-5 have: safe zone (0) -> 5 combat levels (1-5) -> boss (6)
      if (this._state.currentLevelIndex < 6) {
        this._state.currentLevelIndex++;
      } else {
        // Move to next world's safe zone
        this._state.currentWorldNumber++;
        this._state.currentLevelIndex = 0;
        this.ensureSampledLevels(); // Sample levels for new world
      }
    }
  }

  private getLevelConfig(worldNumber: number, levelIndex: number): LevelConfig {
    const worldName = WORLD_NAMES[worldNumber - 1];

    if (!worldName) {
      throw new Error(`Invalid world number: ${worldNumber}`);
    }

    if (worldNumber === TOTAL_WORLDS) {
      // World 6: all boss levels
      return {
        worldNumber,
        worldName,
        levelType: "boss",
        levelName: `Boss ${levelIndex}`,
      };
    }

    if (levelIndex === 0) {
      // Safe zone
      return {
        worldNumber,
        worldName,
        levelType: "safe_zone",
        levelName: "Safe Zone",
      };
    } else if (levelIndex <= COMBAT_LEVELS_PER_WORLD) {
      // Combat level
      const sampleNumber = this.getSampledLevelNumber(worldNumber, levelIndex - 1);
      return {
        worldNumber,
        worldName,
        levelType: "combat",
        levelName: `Combat Level ${levelIndex}`,
        sampleName: `Sample-${sampleNumber}`,
      };
    } else {
      // Boss level
      return {
        worldNumber,
        worldName,
        levelType: "boss",
        levelName: "Boss",
      };
    }
  }

  private ensureSampledLevels() {
    const worldNumber = this._state.currentWorldNumber;

    // Skip sampling for World 6 (all boss levels)
    if (worldNumber === TOTAL_WORLDS) return;

    if (!this.sampledCombatLevels.has(worldNumber)) {
      // Sample 5 levels from 12 available
      const availableLevels = Array.from({ length: SAMPLE_LEVELS_PER_WORLD }, (_, i) => i + 1);
      const sampledLevels: number[] = [];

      for (let i = 0; i < COMBAT_LEVELS_PER_WORLD; i++) {
        const randomIndex = Math.floor(Math.random() * availableLevels.length);
        const selectedLevel = availableLevels.splice(randomIndex, 1)[0];
        if (selectedLevel !== undefined) {
          sampledLevels.push(selectedLevel);
        }
      }

      this.sampledCombatLevels.set(worldNumber, sampledLevels);
      this.log(`Sampled levels for World ${worldNumber}: ${sampledLevels.join(", ")}`);
    }
  }

  private getSampledLevelNumber(worldNumber: number, levelIndex: number): number {
    const sampledLevels = this.sampledCombatLevels.get(worldNumber);
    if (!sampledLevels) {
      throw new Error(`No sampled levels found for world ${worldNumber}`);
    }
    const levelNumber = sampledLevels[levelIndex];
    if (levelNumber === undefined) {
      throw new Error(`No level found at index ${levelIndex} for world ${worldNumber}`);
    }
    return levelNumber;
  }

  private saveProgression() {
    if (this.gameStateService) {
      this.gameStateService.saveLevelProgression(this._state);
    }
  }
}
