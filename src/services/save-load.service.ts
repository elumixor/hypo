import { Service } from "@engine";
import type { GameState } from "systems/game-state";

export interface SavedGame {
  timestamp: number;
  state: GameState;
}

const savedGamesKey = "hypo:saved-games";

export class SaveLoadService extends Service {
  readonly savedGames: SavedGame[] = [];

  constructor() {
    super();

    const saved = localStorage.getItem(savedGamesKey);
    if (saved)
      try {
        this.savedGames = JSON.parse(saved);
      } catch (error) {
        this.logWarning("Failed to load save slots:", error);
      }

    // Sort the saved games by timestamp descending
    this.savedGames.sort((a, b) => b.timestamp - a.timestamp);

    // Current game state is loaded from whichever was the last
  }

  get currentSavedGame() {
    return this.savedGames.first as SavedGame | undefined;
  }

  startNewGame() {
    this.savedGames.unshift({ timestamp: Date.now(), state: { data: null } });
    this.saveSlotsToStorage();
  }

  saveGame() {
    const { currentSavedGame } = this;
    if (!currentSavedGame) throw new Error("No current game to save");

    currentSavedGame.timestamp = Date.now();
    this.saveSlotsToStorage();
  }

  loadGame(savedGame: SavedGame) {
    savedGame.timestamp = Date.now();
    this.savedGames.remove(savedGame);
    this.savedGames.unshift(savedGame);
    this.saveSlotsToStorage();
  }

  resumeLastGame() {
    const lastSave = this.currentSavedGame;
    if (!lastSave) throw new Error("No saved game to resume");
    this.loadGame(lastSave);
  }

  deleteGame(savedGame: SavedGame) {
    this.savedGames.remove(savedGame);
    this.saveSlotsToStorage();
  }

  private saveSlotsToStorage() {
    try {
      localStorage.setItem(savedGamesKey, JSON.stringify(this.savedGames));
    } catch (error) {
      this.logError("Failed to save game slots:", error);
    }
  }
}
