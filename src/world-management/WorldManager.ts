import { GameConfig } from "../config/GameConfig";
import { bossDefeated, gameOver, levelComplete, worldTransition } from "../events/GameEvents";

/**
 * Represents a single level in the game
 */
export interface LevelData {
  id: number;
  worldId: number;
  type: "regular" | "boss" | "safe_zone";
  enemyTypes: string[];
  enemyCount: number;
  specialEvents?: string[];
  rewards?: string[];
}

/**
 * Represents a world (collection of levels)
 */
export interface WorldData {
  id: number;
  name: string;
  theme: string;
  backgroundMusic?: string;
  levels: LevelData[];
  boss: {
    type: string;
    name: string;
    abilities: string[];
  };
}

/**
 * Manages world progression and level transitions
 */
export class WorldManager {
  private readonly worlds: WorldData[];
  private currentWorldId = 1;
  private currentLevelId = 1;

  constructor() {
    this.worlds = this.createWorldData();
  }

  /**
   * Create the world data for all 8 worlds
   */
  private createWorldData(): WorldData[] {
    return [
      {
        id: 1,
        name: "Solar Meadows",
        theme: "bright_grassland",
        levels: this.generateLevels(1, ["basic"]),
        boss: {
          type: "shadow_guardian",
          name: "Shadow Guardian",
          abilities: ["shadow_bolt", "dark_shield"],
        },
      },
      {
        id: 2,
        name: "Crystal Caves",
        theme: "underground_crystal",
        levels: this.generateLevels(2, ["basic", "fast"]),
        boss: {
          type: "crystal_golem",
          name: "Crystal Golem",
          abilities: ["crystal_spikes", "earth_slam", "crystal_armor"],
        },
      },
      {
        id: 3,
        name: "Windy Heights",
        theme: "floating_islands",
        levels: this.generateLevels(3, ["basic", "fast"]),
        boss: {
          type: "storm_elemental",
          name: "Storm Elemental",
          abilities: ["lightning_storm", "wind_blast", "tornado"],
        },
      },
      {
        id: 4,
        name: "Molten Depths",
        theme: "volcanic_caverns",
        levels: this.generateLevels(4, ["basic", "tank"]),
        boss: {
          type: "magma_titan",
          name: "Magma Titan",
          abilities: ["lava_burst", "fire_shield", "earthquake"],
        },
      },
      {
        id: 5,
        name: "Frozen Wastes",
        theme: "ice_tundra",
        levels: this.generateLevels(5, ["basic", "fast", "tank"]),
        boss: {
          type: "frost_king",
          name: "Frost King",
          abilities: ["ice_prison", "blizzard", "frozen_spears"],
        },
      },
      {
        id: 6,
        name: "Shadow Realm",
        theme: "dark_dimension",
        levels: this.generateLevels(6, ["fast", "tank"]),
        boss: {
          type: "void_lord",
          name: "Void Lord",
          abilities: ["void_portal", "dark_energy", "shadow_clone"],
        },
      },
      {
        id: 7,
        name: "Celestial Gardens",
        theme: "heavenly_realm",
        levels: this.generateLevels(7, ["basic", "fast", "tank"]),
        boss: {
          type: "angel_warden",
          name: "Angel Warden",
          abilities: ["divine_light", "holy_shield", "judgment_beam"],
        },
      },
      {
        id: 8,
        name: "The Final Convergence",
        theme: "chaos_dimension",
        levels: this.generateLevels(8, ["fast", "tank"]),
        boss: {
          type: "chaos_emperor",
          name: "Chaos Emperor",
          abilities: ["reality_tear", "chaos_storm", "dimension_shift", "ultimate_destruction"],
        },
      },
    ];
  }

  /**
   * Generate levels for a world
   */
  private generateLevels(worldId: number, enemyTypes: string[]): LevelData[] {
    const levels: LevelData[] = [];

    // Add safe zone at the start
    levels.push({
      id: 1,
      worldId,
      type: "safe_zone",
      enemyTypes: [],
      enemyCount: 0,
    });

    // Add regular levels
    for (let i = 2; i <= GameConfig.LEVELS_PER_WORLD + 1; i++) {
      levels.push({
        id: i,
        worldId,
        type: "regular",
        enemyTypes: [...enemyTypes],
        enemyCount: Math.min(GameConfig.ENEMIES.WAVE_SIZE + Math.floor(worldId / 2), 10),
      });
    }

    // Add boss level
    levels.push({
      id: GameConfig.LEVELS_PER_WORLD + 2,
      worldId,
      type: "boss",
      enemyTypes: [`boss_world_${worldId}`],
      enemyCount: 1,
    });

    return levels;
  }

  /**
   * Get current world data
   */
  getCurrentWorld(): WorldData | undefined {
    return this.worlds.find((w) => w.id === this.currentWorldId);
  }

  /**
   * Get current level data
   */
  getCurrentLevel(): LevelData | undefined {
    const world = this.getCurrentWorld();
    return world?.levels.find((l) => l.id === this.currentLevelId);
  }

  /**
   * Advance to next level
   */
  advanceLevel(): boolean {
    const currentWorld = this.getCurrentWorld();
    if (!currentWorld) return false;

    const currentLevel = this.getCurrentLevel();
    if (!currentLevel) return false;

    // Check if this was the boss level
    if (currentLevel.type === "boss") {
      // Move to next world
      this.currentWorldId++;
      this.currentLevelId = 1;

      if (this.currentWorldId > GameConfig.WORLD_COUNT) {
        // Game completed!
        gameOver.emit({});
        return false;
      }

      worldTransition.emit({
        from: this.currentWorldId - 1,
        to: this.currentWorldId,
      });
    } else {
      // Move to next level in same world
      this.currentLevelId++;
    }

    return true;
  }

  /**
   * Complete current level
   */
  completeLevel(): void {
    const currentLevel = this.getCurrentLevel();
    if (!currentLevel) return;

    levelComplete.emit({
      worldId: this.currentWorldId,
      levelId: this.currentLevelId,
    });

    if (currentLevel.type === "boss") {
      bossDefeated.emit({
        worldId: this.currentWorldId,
        bossId: `boss_world_${this.currentWorldId}`,
      });
    }

    this.advanceLevel();
  }

  /**
   * Get world progress (0-1)
   */
  getWorldProgress(): number {
    return (this.currentWorldId - 1) / GameConfig.WORLD_COUNT;
  }

  /**
   * Get level progress within current world (0-1)
   */
  getLevelProgress(): number {
    const currentWorld = this.getCurrentWorld();
    if (!currentWorld) return 0;

    return (this.currentLevelId - 1) / currentWorld.levels.length;
  }

  /**
   * Get total game progress (0-1)
   */
  getTotalProgress(): number {
    const worldProgress = (this.currentWorldId - 1) / GameConfig.WORLD_COUNT;
    const levelProgress = this.getLevelProgress() / GameConfig.WORLD_COUNT;
    return worldProgress + levelProgress;
  }

  /**
   * Reset to beginning
   */
  reset(): void {
    this.currentWorldId = 1;
    this.currentLevelId = 1;
  }

  /**
   * Get all worlds (for UI)
   */
  getAllWorlds(): WorldData[] {
    return [...this.worlds];
  }

  /**
   * Check if world is unlocked
   */
  isWorldUnlocked(worldId: number): boolean {
    return worldId <= this.currentWorldId;
  }

  /**
   * Check if level is unlocked
   */
  isLevelUnlocked(worldId: number, levelId: number): boolean {
    if (worldId < this.currentWorldId) return true;
    if (worldId === this.currentWorldId && levelId <= this.currentLevelId) return true;
    return false;
  }
}

// Global world manager instance
export const worldManager: WorldManager = new WorldManager();
