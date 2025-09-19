import type { LevelProgressionState } from "services/level-progression.service";

export interface GameState {
  // Level progression data
  levelProgression?: LevelProgressionState;

  // For future expansion
  data: null;
}
