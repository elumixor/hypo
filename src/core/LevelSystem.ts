/**
 * Level progression system for HYPO
 *
 * Manages the overall progression through 6 worlds:
 * - 5 regular worlds (Wrath, Desire, Greed, Attachment, Envy)
 * - 1 final world (Pride)
 *
 * Each regular world: safe-zone → 5 random levels → boss
 * Final world: safe-zone → 6 boss fights
 */

export enum WorldType {
  WRATH = 0,
  DESIRE = 1,
  GREED = 2,
  ATTACHMENT = 3,
  ENVY = 4,
  PRIDE = 5,
}

export enum LevelType {
  SAFE_ZONE = "safe_zone",
  REGULAR = "regular",
  BOSS = "boss",
}

export interface LevelConfig {
  id: string;
  type: LevelType;
  world: WorldType;
  name: string;
  description?: string;
  // Simple tile-based level configuration
  tiles: TileConfig[][];
  targetPosition?: { x: number; y: number }; // For safe zones
  enemySpawns?: SpawnConfig[];
  bossConfig?: BossConfig;
}

export interface TileConfig {
  type: "empty" | "wall" | "spawn" | "target" | "hazard";
  elevation?: number;
}

export interface SpawnConfig {
  x: number;
  y: number;
  enemyType: string;
  count: number;
}

export interface BossConfig {
  type: string;
  health: number;
  phase1?: Record<string, unknown>;
  phase2?: Record<string, unknown>;
  phase3?: Record<string, unknown>;
}

export class LevelSystem {
  private currentWorld: WorldType = WorldType.WRATH;
  private currentLevelIndex = 0;
  private readonly worldProgress: Map<WorldType, number> = new Map();

  // Level configurations
  private readonly safeZoneLevels: LevelConfig[] = [];
  private readonly regularLevels: Map<WorldType, LevelConfig[]> = new Map();
  private readonly bossLevels: LevelConfig[] = [];

  // Current playthrough state
  private currentWorldLevels: LevelConfig[] = [];

  constructor() {
    this.initializeWorlds();
    this.generateLevels();
    this.startWorld(WorldType.WRATH);
  }

  private initializeWorlds(): void {
    // Initialize progress tracking for all worlds
    for (let world = WorldType.WRATH; world <= WorldType.PRIDE; world++) {
      this.worldProgress.set(world, 0);
      this.regularLevels.set(world, []);
    }
  }

  private generateLevels(): void {
    this.generateSafeZoneLevels();
    this.generateRegularLevels();
    this.generateBossLevels();
  }

  private generateSafeZoneLevels(): void {
    // Create safe zone levels for the start of each world
    for (let world = WorldType.WRATH; world <= WorldType.PRIDE; world++) {
      const worldName = WorldType[world].toLowerCase();
      this.safeZoneLevels.push({
        id: `safe_${worldName}`,
        type: LevelType.SAFE_ZONE,
        world,
        name: `${WorldType[world]} Safe Zone`,
        description: `Prepare for the challenges of ${WorldType[world]}`,
        tiles: this.createSafeZoneTiles(),
        targetPosition: { x: 8, y: 8 },
      });
    }
  }

  private generateRegularLevels(): void {
    // Generate 12 levels per world for the first 5 worlds
    for (let world = WorldType.WRATH; world <= WorldType.ENVY; world++) {
      const worldLevels: LevelConfig[] = [];
      const worldName = WorldType[world].toLowerCase();

      for (let i = 0; i < 12; i++) {
        worldLevels.push({
          id: `${worldName}_regular_${i + 1}`,
          type: LevelType.REGULAR,
          world,
          name: `${WorldType[world]} Level ${i + 1}`,
          tiles: this.createRegularLevelTiles(i),
          enemySpawns: this.createEnemySpawns(world, i),
        });
      }

      this.regularLevels.set(world, worldLevels);
    }
  }

  private generateBossLevels(): void {
    // Generate boss levels for first 5 worlds (1 each)
    for (let world = WorldType.WRATH; world <= WorldType.ENVY; world++) {
      const worldName = WorldType[world].toLowerCase();
      this.bossLevels.push({
        id: `${worldName}_boss`,
        type: LevelType.BOSS,
        world,
        name: `${WorldType[world]} Boss`,
        tiles: this.createBossLevelTiles(),
        bossConfig: {
          type: `${worldName}_boss`,
          health: 50 + world * 25,
        },
      });
    }

    // Generate 6 boss fights for Pride world
    for (let i = 0; i < 6; i++) {
      this.bossLevels.push({
        id: `pride_boss_${i + 1}`,
        type: LevelType.BOSS,
        world: WorldType.PRIDE,
        name: `Pride Boss ${i + 1}`,
        tiles: this.createBossLevelTiles(),
        bossConfig: {
          type: `pride_boss_${i + 1}`,
          health: 100 + i * 20,
        },
      });
    }
  }

  private createSafeZoneTiles(): TileConfig[][] {
    const size = 16;
    const tiles: TileConfig[][] = [];

    for (let y = 0; y < size; y++) {
      tiles[y] = [];
      for (let x = 0; x < size; x++) {
        if (x === 0 || x === size - 1 || y === 0 || y === size - 1) {
          tiles[y]![x] = { type: "wall" };
        } else if (x === 2 && y === 2) {
          tiles[y]![x] = { type: "spawn" };
        } else if (x === 8 && y === 8) {
          tiles[y]![x] = { type: "target" };
        } else {
          tiles[y]![x] = { type: "empty" };
        }
      }
    }

    return tiles;
  }

  private createRegularLevelTiles(levelIndex: number): TileConfig[][] {
    const size = 20;
    const tiles: TileConfig[][] = [];

    // Create varied level layouts based on level index
    const seed = levelIndex * 123; // Simple pseudo-random seed

    for (let y = 0; y < size; y++) {
      tiles[y] = [];
      for (let x = 0; x < size; x++) {
        // Border walls
        if (x === 0 || x === size - 1 || y === 0 || y === size - 1) {
          tiles[y]![x] = { type: "wall" };
        } else if (x === 1 && y === 1) {
          // Player spawn
          tiles[y]![x] = { type: "spawn" };
        } else {
          // Add some variety with walls and hazards
          const hash = (x * 31 + y * 17 + seed) % 100;
          if (hash < 10 && x > 2 && y > 2) {
            tiles[y]![x] = { type: "wall" };
          } else if (hash < 15 && x > 3 && y > 3) {
            tiles[y]![x] = { type: "hazard" };
          } else {
            tiles[y]![x] = { type: "empty" };
          }
        }
      }
    }

    return tiles;
  }

  private createBossLevelTiles(): TileConfig[][] {
    const size = 24;
    const tiles: TileConfig[][] = [];

    for (let y = 0; y < size; y++) {
      tiles[y] = [];
      for (let x = 0; x < size; x++) {
        if (x === 0 || x === size - 1 || y === 0 || y === size - 1) {
          tiles[y]![x] = { type: "wall" };
        } else if (x === 2 && y === 2) {
          tiles[y]![x] = { type: "spawn" };
        } else {
          tiles[y]![x] = { type: "empty" };
        }
      }
    }

    return tiles;
  }

  private createEnemySpawns(world: WorldType, levelIndex: number): SpawnConfig[] {
    const spawns: SpawnConfig[] = [];
    const enemyCount = 3 + (levelIndex % 4); // 3-6 enemies per level

    for (let i = 0; i < enemyCount; i++) {
      spawns.push({
        x: 5 + ((i * 3) % 15),
        y: 5 + Math.floor(i / 5) * 3,
        enemyType: `${WorldType[world].toLowerCase()}_enemy`,
        count: 1,
      });
    }

    return spawns;
  }

  public startWorld(world: WorldType) {
    this.currentWorld = world;
    this.currentLevelIndex = 0;
    this.worldProgress.set(world, 0);

    // Generate the sequence of levels for this world
    this.currentWorldLevels = this.generateWorldSequence(world);
  }

  private generateWorldSequence(world: WorldType): LevelConfig[] {
    const sequence: LevelConfig[] = [];

    // Add safe zone if available
    const safeZone = this.safeZoneLevels.find((level) => level.world === world);
    if (safeZone) {
      sequence.push(safeZone);
    }

    if (world === WorldType.PRIDE) {
      // Pride world: add all 6 boss fights
      const prideBosses = this.bossLevels.filter((level) => level.world === WorldType.PRIDE);
      sequence.push(...prideBosses);
    } else {
      // Regular world: add 5 random regular levels + boss
      const worldLevels = this.regularLevels.get(world) || [];
      const selectedLevels = this.selectRandomLevels(worldLevels, 5);
      sequence.push(...selectedLevels);

      // Add boss level
      const bossLevel = this.bossLevels.find((level) => level.world === world && !level.id.includes("pride"));
      if (bossLevel) {
        sequence.push(bossLevel);
      }
    }

    return sequence;
  }

  private selectRandomLevels(levels: LevelConfig[], count: number): LevelConfig[] {
    const shuffled = [...levels];
    // Simple shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tempI = shuffled[i];
      const tempJ = shuffled[j];
      if (tempI && tempJ) {
        shuffled[i] = tempJ;
        shuffled[j] = tempI;
      }
    }
    return shuffled.slice(0, count);
  }

  public getCurrentLevel(): LevelConfig | null {
    if (this.currentLevelIndex >= this.currentWorldLevels.length) {
      return null;
    }
    return this.currentWorldLevels[this.currentLevelIndex] || null;
  }

  public completeCurrentLevel(): boolean {
    this.currentLevelIndex++;
    const progress = this.worldProgress.get(this.currentWorld) || 0;
    this.worldProgress.set(this.currentWorld, progress + 1);

    // Check if world is completed
    if (this.currentLevelIndex >= this.currentWorldLevels.length) {
      return this.advanceToNextWorld();
    }

    return true;
  }

  private advanceToNextWorld(): boolean {
    if (this.currentWorld >= WorldType.PRIDE) {
      // Game completed!
      return false;
    }

    this.startWorld(this.currentWorld + 1);
    return true;
  }

  public getCurrentWorld(): WorldType {
    return this.currentWorld;
  }

  public getCurrentLevelIndex(): number {
    return this.currentLevelIndex;
  }

  public getWorldProgress(world: WorldType): number {
    return this.worldProgress.get(world) || 0;
  }

  public getTotalLevelsInCurrentWorld(): number {
    return this.currentWorldLevels.length;
  }

  public isGameCompleted(): boolean {
    return this.currentWorld >= WorldType.PRIDE && this.currentLevelIndex >= this.currentWorldLevels.length;
  }

  public reset() {
    this.currentWorld = WorldType.WRATH;
    this.currentLevelIndex = 0;
    this.worldProgress.clear();
    this.initializeWorlds();
    this.startWorld(WorldType.WRATH);
  }
}
