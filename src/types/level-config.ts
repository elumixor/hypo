export interface LevelConfig {
  worldNumber: number;
  worldName: string;
  levelType: "safe_zone" | "combat" | "boss";
  levelName: string;
  sampleName?: string; // For combat levels: Sample-1, Sample-2, etc.
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
