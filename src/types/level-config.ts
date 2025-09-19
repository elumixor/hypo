export interface LevelConfig {
  worldNumber: number;
  worldName: string;
  levelType: "safe_zone" | "combat" | "boss";
  levelName: string;
  sampleName?: string; // For combat levels: Sample-1, Sample-2, etc.
}
