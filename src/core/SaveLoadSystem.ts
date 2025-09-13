import { DEFAULT_GAME_STATE, type GameState } from "./GameState";

const SAVE_KEY = "hypo_game_save";
const SAVE_SLOTS_KEY = "hypo_save_slots";

export interface SaveSlot {
  id: string;
  name: string;
  gameState: GameState;
  timestamp: number;
  playTime: number;
  worldName: string;
  level: number;
}

export class SaveLoadSystem {
  private gameStartTime = Date.now();
  private sessionPlayTime = 0;

  /**
   * Generate a unique game ID
   */
  private generateGameId(): string {
    return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get the default game state with a unique game ID
   */
  getDefaultGameState(): GameState {
    return {
      ...DEFAULT_GAME_STATE,
      gameId: this.generateGameId(),
    };
  }

  /**
   * Save current game state to localStorage
   */
  save(gameState: GameState, slotId?: string): boolean {
    try {
      // Update timing information
      const currentTime = Date.now();
      const updatedState: GameState = {
        ...gameState,
        playTime: gameState.playTime + this.sessionPlayTime,
        lastSaved: currentTime,
      };

      if (slotId) {
        // Save to specific slot
        return this.saveToSlot(updatedState, slotId);
      } else {
        // Quick save to main save slot
        localStorage.setItem(SAVE_KEY, JSON.stringify(updatedState));
        log("SaveLoadSystem", "Game saved successfully");
        return true;
      }
    } catch (error) {
      log("SaveLoadSystem", "Failed to save game:", error);
      return false;
    }
  }

  /**
   * Load game state from localStorage
   */
  load(slotId?: string): GameState | null {
    try {
      let savedData: string | null;

      if (slotId) {
        // Load from specific slot
        const slot = this.loadFromSlot(slotId);
        if (!slot) return null;
        return slot.gameState;
      } else {
        // Load from main save slot
        savedData = localStorage.getItem(SAVE_KEY);
      }

      if (!savedData) {
        log("SaveLoadSystem", "No save data found");
        return null;
      }

      const gameState: GameState = JSON.parse(savedData);

      // Validate save format version
      if (!this.isValidSaveData(gameState)) {
        log("SaveLoadSystem", "Invalid save data format");
        return null;
      }

      // Reset session timing
      this.gameStartTime = Date.now();
      this.sessionPlayTime = 0;

      log("SaveLoadSystem", "Game loaded successfully");
      return gameState;
    } catch (error) {
      log("SaveLoadSystem", "Failed to load game:", error);
      return null;
    }
  }

  /**
   * Save to a specific slot
   */
  saveToSlot(gameState: GameState, slotId: string, customName?: string): boolean {
    try {
      const slots = this.getSaveSlots();
      const worldNames = ["Wrath", "Desire", "Greed", "Attachment", "Envy", "Pride"];
      const worldName = worldNames[gameState.world.currentWorldIndex] || "Unknown";

      const saveSlot: SaveSlot = {
        id: slotId,
        name: customName || `${worldName} - Level ${gameState.player.level}`,
        gameState,
        timestamp: Date.now(),
        playTime: gameState.playTime + this.sessionPlayTime,
        worldName,
        level: gameState.player.level,
      };

      slots[slotId] = saveSlot;
      localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots));

      log("SaveLoadSystem", `Game saved to slot ${slotId}:`, saveSlot.name);
      return true;
    } catch (error) {
      log("SaveLoadSystem", "Failed to save to slot:", error);
      return false;
    }
  }

  /**
   * Load from a specific slot
   */
  loadFromSlot(slotId: string): SaveSlot | null {
    try {
      const slots = this.getSaveSlots();
      const slot = slots[slotId];

      if (!slot) {
        log("SaveLoadSystem", `No save data found in slot ${slotId}`);
        return null;
      }

      return slot;
    } catch (error) {
      log("SaveLoadSystem", "Failed to load from slot:", error);
      return null;
    }
  }

  /**
   * Get all save slots
   */
  getSaveSlots(): Record<string, SaveSlot> {
    try {
      const savedSlots = localStorage.getItem(SAVE_SLOTS_KEY);
      if (!savedSlots) return {};

      return JSON.parse(savedSlots);
    } catch (error) {
      log("SaveLoadSystem", "Failed to load save slots:", error);
      return {};
    }
  }

  /**
   * Delete a save slot
   */
  deleteSlot(slotId: string): boolean {
    try {
      const slots = this.getSaveSlots();
      if (slots[slotId]) {
        delete slots[slotId];
        localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots));
        log("SaveLoadSystem", `Deleted save slot ${slotId}`);
        return true;
      }
      return false;
    } catch (error) {
      log("SaveLoadSystem", "Failed to delete save slot:", error);
      return false;
    }
  }

  /**
   * Check if quick save exists
   */
  hasQuickSave(): boolean {
    return localStorage.getItem(SAVE_KEY) !== null;
  }

  /**
   * Delete quick save
   */
  deleteQuickSave(): boolean {
    try {
      localStorage.removeItem(SAVE_KEY);
      log("SaveLoadSystem", "Quick save deleted");
      return true;
    } catch (error) {
      log("SaveLoadSystem", "Failed to delete quick save:", error);
      return false;
    }
  }

  /**
   * Update session play time (call regularly from game loop)
   */
  updateSessionTime(): void {
    this.sessionPlayTime = Date.now() - this.gameStartTime;
  }

  /**
   * Get formatted play time string
   */
  getFormattedPlayTime(totalMilliseconds: number): string {
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }

  /**
   * Clear all save data (for debugging or reset)
   */
  clearAllSaves(): void {
    try {
      localStorage.removeItem(SAVE_KEY);
      localStorage.removeItem(SAVE_SLOTS_KEY);
      log("SaveLoadSystem", "All save data cleared");
    } catch (error) {
      log("SaveLoadSystem", "Failed to clear save data:", error);
    }
  }

  /**
   * Validate save data format
   */
  private isValidSaveData(data: any): data is GameState {
    if (!data || typeof data !== "object") return false;

    // Check required properties exist
    const requiredProps = ["player", "world", "unlockedCharacters", "activeCharacter", "settings"];
    for (const prop of requiredProps) {
      if (!(prop in data)) return false;
    }

    // Check player object
    if (!data.player || typeof data.player !== "object") return false;
    if (typeof data.player.level !== "number") return false;
    if (typeof data.player.xp !== "number") return false;

    // Check world object
    if (!data.world || typeof data.world !== "object") return false;
    if (typeof data.world.currentWorldIndex !== "number") return false;
    if (typeof data.world.currentLevelIndex !== "number") return false;

    // Basic validation passed
    return true;
  }

  /**
   * Export save data as JSON string (for backup/sharing)
   */
  exportSave(gameState: GameState): string {
    return JSON.stringify(gameState, null, 2);
  }

  /**
   * Import save data from JSON string
   */
  importSave(jsonString: string): GameState | null {
    try {
      const gameState = JSON.parse(jsonString);
      if (this.isValidSaveData(gameState)) {
        return gameState;
      }
      return null;
    } catch (error) {
      log("SaveLoadSystem", "Failed to import save data:", error);
      return null;
    }
  }
}
