import { EventEmitter } from "@elumixor/event-emitter";
import { Service } from "@engine";
import { GameStateService } from "systems/game-state";
import type { LevelConfig } from "types/level-config";

export interface LevelProgressionState {
  currentWorld: number;
  currentLevel: number; // 0 = safe zone, 1-5 = combat levels, 6 = boss
  isCompleted: boolean;
}

export interface LevelTransitionEvent {
  previousLevel: LevelConfig;
  nextLevel: LevelConfig;
}

export const WORLD_NAMES = [
  "Krodha", // World 1
  "Kama", // World 2
  "Lobha", // World 3
  "Moha", // World 4
  "Matsarya", // World 5
  "Mada", // World 6
] as const;

export const TOTAL_WORLDS = 6;
export const COMBAT_LEVELS_PER_WORLD = 5;
export const SAMPLE_LEVELS_PER_WORLD = 12;
export const BOSS_LEVELS_IN_WORLD_6 = 6;

export class LevelProgressionService extends Service {
  readonly levelChanged = new EventEmitter<LevelTransitionEvent>();
  readonly gameCompleted = new EventEmitter();
  readonly playerDied = new EventEmitter();

  state: LevelProgressionState = {
    currentWorld: 1,
    currentLevel: 0, // Start in safe zone
    isCompleted: false,
  };

  private readonly sampledCombatLevels: Map<number, number[]> = new Map();
  private gameStateService!: GameStateService; // Will be set in init

  override async init() {
    await super.init();

    this.gameStateService = this.getService(GameStateService);
  }

  get currentLevel(): LevelConfig {
    return this.getLevelConfig(this.state.currentWorld, this.state.currentLevel);
  }

  initializeFromSave(state?: LevelProgressionState) {
    if (state) {
      this.state = { ...state };
    } else if (this.gameStateService?.levelProgression) {
      this.state = { ...this.gameStateService.levelProgression };
    } else {
      this.resetProgression();
    }
    this.ensureSampledLevels(this.state.currentWorld);
  }

  resetProgression() {
    console.log("resetting progression");
    this.state = {
      currentWorld: 1,
      currentLevel: 0,
      isCompleted: false,
    };
    this.sampledCombatLevels.clear();
    this.ensureSampledLevels(this.state.currentWorld);
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
    this.state.isCompleted = true;
    this.gameCompleted.emit();
    // Reset progression after completion
    window.setTimeout(() => this.resetProgression(), 5000);
  }

  private advanceLevel() {
    // First check the last, 6th world, it's a special case
    if (this.state.currentWorld === TOTAL_WORLDS) {
      // World 6 has 6 boss levels
      if (this.state.currentLevel < BOSS_LEVELS_IN_WORLD_6) this.state.currentLevel++;
      // Game completed!
      else this.onGameCompleted();
      return;
    }

    // Worlds 1-5 have: safe zone (0) -> 5 combat levels (1-5) -> boss (6)
    if (this.state.currentLevel < 6) {
      this.state.currentLevel++;
    } else {
      // Move to next world's safe zone
      this.state.currentWorld++;
      this.state.currentLevel = 0;
      this.ensureSampledLevels(this.state.currentWorld); // Sample levels for new world
    }
  }

  private getLevelConfig(worldNumber: number, levelIndex: number): LevelConfig {
    const worldName = WORLD_NAMES[worldNumber - 1];
    if (!worldName) throw new Error(`Invalid world number: ${worldNumber}`);

    if (levelIndex === 0) {
      // Safe zone
      return {
        worldNumber,
        worldName,
        levelType: "safe_zone",
        levelName: "Safe Zone",
      };
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

    if (levelIndex <= COMBAT_LEVELS_PER_WORLD) {
      console.log(`Getting combat level for World ${worldNumber}, Index ${levelIndex}`);
      // Combat level
      this.ensureSampledLevels(worldNumber);
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

  private ensureSampledLevels(worldNumber: number) {
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

      console.log("Setting sampled levels for world", worldNumber, sampledLevels);
      this.sampledCombatLevels.set(worldNumber, sampledLevels);
      this.log(`Sampled levels for World ${worldNumber}: ${sampledLevels.join(", ")}`);
    }
  }

  private getSampledLevelNumber(worldNumber: number, levelIndex: number): number {
    console.log(`Getting sampled level for World ${worldNumber}, Index ${levelIndex}`);
    console.log(this.sampledCombatLevels);
    const sampledLevels = this.sampledCombatLevels.get(worldNumber);
    console.log(sampledLevels);
    if (!sampledLevels) throw new Error(`No sampled levels found for world ${worldNumber}`);

    const levelNumber = sampledLevels[levelIndex];
    if (levelNumber === undefined) throw new Error(`No level found at index ${levelIndex} for world ${worldNumber}`);

    return levelNumber;
  }

  private saveProgression() {
    if (this.gameStateService) {
      this.gameStateService.saveLevelProgression(this.state);
    }
  }
}
