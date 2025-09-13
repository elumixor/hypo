export interface QuestData {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  progress: Record<string, number>; // quest-specific progress tracking
  startedAt?: number; // timestamp
  completedAt?: number; // timestamp
}

export interface DialogueState {
  characterId: string;
  dialogueId: string;
  seen: boolean;
  choices: Record<string, string>; // choice id -> selected option
  seenAt?: number; // timestamp
}

export interface CharacterRelationship {
  characterId: string;
  relationLevel: number; // 0-4 relationship level
  interactions: number; // total interactions count
  lastInteraction?: number; // timestamp
}

export interface PlayerProgress {
  level: number;
  xp: number;
  xpToNext: number;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  skillPoints: number;
}

export interface WorldProgress {
  currentWorldIndex: number; // which world (0-5)
  currentLevelIndex: number; // which level in current world
  completedWorlds: number; // count of fully completed worlds
  completedLevels: number; // total levels completed across all worlds
}

export interface GameSettings {
  autoAttack: boolean;
  soundEnabled: boolean;
  musicEnabled: boolean;
  difficulty: "easy" | "normal" | "hard";
}

export interface GameState {
  // Core game progression
  player: PlayerProgress;
  world: WorldProgress;

  // Character and story progression
  unlockedCharacters: string[]; // character IDs that are unlocked
  activeCharacter: string; // currently active character ID
  characterSkills: Record<string, Record<string, number>>; // characterId -> skillId -> level
  relationships: Record<string, CharacterRelationship>; // characterId -> relationship data

  // Quest and dialogue system
  completedQuests: QuestData[];
  activeQuests: QuestData[];
  dialogueHistory: DialogueState[];

  // Game settings and metadata
  settings: GameSettings;
  playTime: number; // total play time in milliseconds
  lastSaved: number; // timestamp of last save
  saveVersion: string; // version of save format for future compatibility
  gameId: string; // unique identifier for this save game
}

export const DEFAULT_GAME_STATE: GameState = {
  player: {
    level: 1,
    xp: 0,
    xpToNext: 5,
    health: 10,
    maxHealth: 10,
    energy: 100,
    maxEnergy: 100,
    skillPoints: 0,
  },
  world: {
    currentWorldIndex: 0, // Start in Wrath
    currentLevelIndex: 0, // First level
    completedWorlds: 0,
    completedLevels: 0,
  },
  unlockedCharacters: ["helio"], // Helio starts unlocked
  activeCharacter: "helio",
  characterSkills: {},
  relationships: {
    helio: {
      characterId: "helio",
      relationLevel: 1,
      interactions: 0,
    },
  },
  completedQuests: [],
  activeQuests: [],
  dialogueHistory: [],
  settings: {
    autoAttack: true,
    soundEnabled: true,
    musicEnabled: true,
    difficulty: "normal",
  },
  playTime: 0,
  lastSaved: 0,
  saveVersion: "1.0.0",
  gameId: "",
};
