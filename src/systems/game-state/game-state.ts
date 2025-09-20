import type { CharacterStatus } from "services/character-status.service";
import type { LevelProgressionState } from "services/level-progression.service";

export interface CharacterProgressionState {
  currentXP: number;
  currentLevel: number;
}

export interface CharacterStatusState {
  characters: Record<
    string,
    {
      status: CharacterStatus;
      unlockedSkills: string[];
      unlockedUpgrades: Record<string, string[]>;
    }
  >;
  partyMembers: string[];
}

export interface GameState {
  // Level progression data
  levelProgression?: LevelProgressionState;

  // Character progression data
  characterProgression?: CharacterProgressionState;

  // Character status and unlock data
  characterStatus?: CharacterStatusState;

  // For future expansion
  data: null;
}
