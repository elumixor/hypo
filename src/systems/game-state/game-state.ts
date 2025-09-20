import type { LevelProgressionState } from "services/level-progression.service";

export interface CharacterProgressionState {
  currentXP: number;
  currentLevel: number;
}

export interface GameState {
  // Level progression data
  levelProgression?: LevelProgressionState;

  // Character progression data
  characterProgression?: CharacterProgressionState;
}
