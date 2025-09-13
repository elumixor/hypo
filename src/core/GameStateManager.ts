import type { GameState } from "./GameState";
import { SaveLoadSystem, type SaveSlot } from "./SaveLoadSystem";

export type GameStateEvent =
  | "state_loaded"
  | "state_saved"
  | "character_unlocked"
  | "quest_completed"
  | "level_completed"
  | "world_completed";

export class GameStateManager {
  private readonly saveLoadSystem = new SaveLoadSystem();
  private currentState: GameState;
  private readonly eventHandlers: Record<GameStateEvent, Array<(data?: unknown) => void>> = {
    state_loaded: [],
    state_saved: [],
    character_unlocked: [],
    quest_completed: [],
    level_completed: [],
    world_completed: [],
  };

  constructor(initialState?: GameState) {
    this.currentState = initialState || this.saveLoadSystem.getDefaultGameState();
  }

  /**
   * Get current game state
   */
  getState(): GameState {
    return { ...this.currentState };
  }

  /**
   * Update player progress
   */
  updatePlayer(updates: Partial<GameState["player"]>): void {
    this.currentState.player = { ...this.currentState.player, ...updates };
    log("GameStateManager", "Player updated:", updates);
  }

  /**
   * Update world progress
   */
  updateWorld(updates: Partial<GameState["world"]>): void {
    const oldState = { ...this.currentState.world };
    this.currentState.world = { ...this.currentState.world, ...updates };

    // Check for level completion
    if (updates.currentLevelIndex !== undefined && updates.currentLevelIndex > oldState.currentLevelIndex) {
      this.emit("level_completed", {
        worldIndex: this.currentState.world.currentWorldIndex,
        levelIndex: updates.currentLevelIndex,
      });
    }

    // Check for world completion
    if (updates.currentWorldIndex !== undefined && updates.currentWorldIndex > oldState.currentWorldIndex) {
      this.emit("world_completed", { worldIndex: oldState.currentWorldIndex });
    }

    log("GameStateManager", "World progress updated:", updates);
  }

  /**
   * Unlock a character
   */
  unlockCharacter(characterId: string): boolean {
    if (this.currentState.unlockedCharacters.includes(characterId)) {
      return false; // Already unlocked
    }

    this.currentState.unlockedCharacters.push(characterId);

    // Initialize relationship if not exists
    if (!this.currentState.relationships[characterId]) {
      this.currentState.relationships[characterId] = {
        characterId,
        relationLevel: 1,
        interactions: 0,
      };
    }

    this.emit("character_unlocked", { characterId });
    log("GameStateManager", "Character unlocked:", characterId);
    return true;
  }

  /**
   * Switch active character
   */
  switchCharacter(characterId: string): boolean {
    if (!this.currentState.unlockedCharacters.includes(characterId)) {
      return false; // Character not unlocked
    }

    this.currentState.activeCharacter = characterId;
    log("GameStateManager", "Active character changed to:", characterId);
    return true;
  }

  /**
   * Update character skill
   */
  updateCharacterSkill(characterId: string, skillId: string, level: number): void {
    if (!this.currentState.characterSkills[characterId]) {
      this.currentState.characterSkills[characterId] = {};
    }
    this.currentState.characterSkills[characterId][skillId] = level;
    log("GameStateManager", `Updated ${characterId} skill ${skillId} to level ${level}`);
  }

  /**
   * Update character relationship
   */
  updateRelationship(characterId: string, relationLevel: number, interactions?: number): void {
    const relationship = this.currentState.relationships[characterId];
    if (relationship) {
      relationship.relationLevel = relationLevel;
      if (interactions !== undefined) {
        relationship.interactions = interactions;
      }
      relationship.lastInteraction = Date.now();
    } else {
      this.currentState.relationships[characterId] = {
        characterId,
        relationLevel,
        interactions: interactions || 0,
        lastInteraction: Date.now(),
      };
    }
    log("GameStateManager", `Updated relationship with ${characterId}: level ${relationLevel}`);
  }

  /**
   * Add or update quest
   */
  updateQuest(quest: GameState["activeQuests"][0]): void {
    const existingIndex = this.currentState.activeQuests.findIndex((q) => q.id === quest.id);

    if (existingIndex >= 0) {
      this.currentState.activeQuests[existingIndex] = quest;
    } else {
      this.currentState.activeQuests.push(quest);
    }

    if (quest.completed) {
      this.completeQuest(quest.id);
    }

    log("GameStateManager", "Quest updated:", quest.id);
  }

  /**
   * Complete a quest
   */
  completeQuest(questId: string): boolean {
    const questIndex = this.currentState.activeQuests.findIndex((q) => q.id === questId);
    if (questIndex >= 0) {
      const quest = this.currentState.activeQuests[questIndex];
      if (!quest) return false; // Safety check

      quest.completed = true;
      quest.completedAt = Date.now();

      // Move to completed quests
      this.currentState.completedQuests.push(quest);
      this.currentState.activeQuests.splice(questIndex, 1);

      this.emit("quest_completed", { quest });
      log("GameStateManager", "Quest completed:", questId);
      return true;
    }
    return false;
  }

  /**
   * Add dialogue state
   */
  addDialogueState(characterId: string, dialogueId: string, choices?: Record<string, string>): void {
    const existing = this.currentState.dialogueHistory.find(
      (d) => d.characterId === characterId && d.dialogueId === dialogueId,
    );

    if (existing) {
      existing.choices = { ...existing.choices, ...choices };
    } else {
      this.currentState.dialogueHistory.push({
        characterId,
        dialogueId,
        seen: true,
        choices: choices || {},
        seenAt: Date.now(),
      });
    }
    log("GameStateManager", `Added dialogue state: ${characterId}/${dialogueId}`);
  }

  /**
   * Update game settings
   */
  updateSettings(settings: Partial<GameState["settings"]>): void {
    this.currentState.settings = { ...this.currentState.settings, ...settings };
    log("GameStateManager", "Settings updated:", settings);
  }

  /**
   * Save game state
   */
  save(slotId?: string): boolean {
    this.saveLoadSystem.updateSessionTime();
    const success = this.saveLoadSystem.save(this.currentState, slotId);
    if (success) {
      this.emit("state_saved", { slotId });
    }
    return success;
  }

  /**
   * Load game state
   */
  load(slotId?: string): boolean {
    const loadedState = this.saveLoadSystem.load(slotId);
    if (loadedState) {
      this.currentState = loadedState;
      this.emit("state_loaded", { slotId });
      log("GameStateManager", "Game state loaded successfully");
      return true;
    }
    return false;
  }

  /**
   * Check if save exists
   */
  hasSave(slotId?: string): boolean {
    if (slotId) {
      const slots = this.saveLoadSystem.getSaveSlots();
      return !!slots[slotId];
    }
    return this.saveLoadSystem.hasQuickSave();
  }

  /**
   * Get save slots info
   */
  getSaveSlots(): Record<string, SaveSlot> {
    return this.saveLoadSystem.getSaveSlots();
  }

  /**
   * Delete save slot
   */
  deleteSave(slotId?: string): boolean {
    if (slotId) {
      return this.saveLoadSystem.deleteSlot(slotId);
    }
    return this.saveLoadSystem.deleteQuickSave();
  }

  /**
   * Get formatted play time
   */
  getFormattedPlayTime(): string {
    this.saveLoadSystem.updateSessionTime();
    return this.saveLoadSystem.getFormattedPlayTime(this.currentState.playTime);
  }

  /**
   * Reset to new game
   */
  newGame(): void {
    this.currentState = this.saveLoadSystem.getDefaultGameState();
    log("GameStateManager", "Started new game");
  }

  /**
   * Event system for UI updates
   */
  on(event: GameStateEvent, handler: (data?: unknown) => void): void {
    this.eventHandlers[event].push(handler);
  }

  off(event: GameStateEvent, handler: (data?: unknown) => void): void {
    const handlers = this.eventHandlers[event];
    const index = handlers.indexOf(handler);
    if (index >= 0) {
      handlers.splice(index, 1);
    }
  }

  private emit(event: GameStateEvent, data?: unknown): void {
    for (const handler of this.eventHandlers[event]) {
      handler(data);
    }
  }

  /**
   * Export current state for debugging
   */
  export(): string {
    return this.saveLoadSystem.exportSave(this.currentState);
  }

  /**
   * Import state for debugging
   */
  import(jsonString: string): boolean {
    const imported = this.saveLoadSystem.importSave(jsonString);
    if (imported) {
      this.currentState = imported;
      return true;
    }
    return false;
  }
}
