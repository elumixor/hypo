import { EventEmitter } from "@elumixor/frontils";
import { BaseService } from "./BaseService";

export type GameState = "loading" | "menu" | "playing" | "paused" | "dead" | "victory" | "game-over";

export interface GameStateData {
  state: GameState;
  previousState?: GameState;
  timestamp: number;
}

export interface GameSession {
  startTime: number;
  deaths: number;
  enemiesKilled: number;
  currentWorld: number;
  currentLevel: number;
}

/**
 * Manages the overall game state, respawning, world progression, and session tracking
 */
export class GameStateService extends BaseService {
  private _currentState: GameState = "loading";
  private _previousState?: GameState;
  private _session: GameSession = {
    startTime: Date.now(),
    deaths: 0,
    enemiesKilled: 0,
    currentWorld: 1, // Wrath = 1, up to Pride = 6
    currentLevel: 1,
  };

  // Events
  readonly onStateChanged = new EventEmitter<GameStateData>();
  readonly onGameStarted = new EventEmitter();
  readonly onGamePaused = new EventEmitter();
  readonly onGameResumed = new EventEmitter();
  readonly onPlayerDied = new EventEmitter<{ deathCount: number }>();
  readonly onPlayerRespawned = new EventEmitter();
  readonly onLevelCompleted = new EventEmitter<{ world: number; level: number }>();
  readonly onWorldCompleted = new EventEmitter<{ world: number }>();
  readonly onGameCompleted = new EventEmitter<GameSession>();

  constructor() {
    super();
    this.startNewSession();
  }

  /**
   * Get current game state
   */
  get currentState(): GameState {
    return this._currentState;
  }

  /**
   * Get previous game state
   */
  get previousState(): GameState | undefined {
    return this._previousState;
  }

  /**
   * Get current session data
   */
  get session(): Readonly<GameSession> {
    return { ...this._session };
  }

  /**
   * Check if game is in a playable state
   */
  get isPlayable(): boolean {
    return this._currentState === "playing";
  }

  /**
   * Check if game is paused
   */
  get isPaused(): boolean {
    return this._currentState === "paused";
  }

  /**
   * Check if player is dead
   */
  get isPlayerDead(): boolean {
    return this._currentState === "dead";
  }

  /**
   * Start a new game session
   */
  startNewSession() {
    this._session = {
      startTime: Date.now(),
      deaths: 0,
      enemiesKilled: 0,
      currentWorld: 1,
      currentLevel: 1,
    };

    this.setState("playing");
    this.onGameStarted.emit();
    log("GameState", "New session started");
  }

  /**
   * Start the game (from menu)
   */
  startGame() {
    if (this._currentState === "menu" || this._currentState === "loading") {
      this.setState("playing");
      this.onGameStarted.emit();
    }
  }

  /**
   * Pause the game
   */
  pauseGame() {
    if (this._currentState === "playing") {
      this.setState("paused");
      this.onGamePaused.emit();
    }
  }

  /**
   * Resume the game
   */
  resumeGame() {
    if (this._currentState === "paused") {
      this.setState("playing");
      this.onGameResumed.emit();
    }
  }

  /**
   * Handle player death
   */
  playerDied() {
    if (this._currentState === "playing") {
      this._session.deaths++;
      this.setState("dead");
      this.onPlayerDied.emit({ deathCount: this._session.deaths });
      log("GameState", `Player died (death #${this._session.deaths})`);
    }
  }

  /**
   * Respawn player (return to Wrath world)
   */
  respawnPlayer() {
    if (this._currentState === "dead") {
      // According to game design, death returns player to Wrath world
      this._session.currentWorld = 1;
      this._session.currentLevel = 1;

      this.setState("playing");
      this.onPlayerRespawned.emit();
      log("GameState", "Player respawned in Wrath world");
    }
  }

  /**
   * Complete current level
   */
  completeLevel() {
    if (this._currentState === "playing") {
      const currentWorld = this._session.currentWorld;
      const currentLevel = this._session.currentLevel;

      this.onLevelCompleted.emit({ world: currentWorld, level: currentLevel });

      // Check if this was the boss level (level 6 in each world)
      if (currentLevel === 6) {
        this.completeWorld();
      } else {
        this._session.currentLevel++;
        log("GameState", `Level completed: ${currentWorld}-${currentLevel}`);
      }
    }
  }

  /**
   * Complete current world
   */
  completeWorld() {
    const completedWorld = this._session.currentWorld;
    this.onWorldCompleted.emit({ world: completedWorld });

    // Check if this was the final world (Pride = 6)
    if (completedWorld >= 6) {
      this.completeGame();
    } else {
      this._session.currentWorld++;
      this._session.currentLevel = 1;
      log("GameState", `World ${completedWorld} completed, moving to world ${this._session.currentWorld}`);
    }
  }

  /**
   * Complete the entire game
   */
  completeGame() {
    this.setState("victory");
    this.onGameCompleted.emit({ ...this._session });
    log("GameState", "Game completed! The Empire of Pride has been overthrown!");
  }

  /**
   * Add to enemy kill count
   */
  addEnemyKill() {
    this._session.enemiesKilled++;
  }

  /**
   * Get current world name
   */
  getCurrentWorldName(): string {
    const worldNames = ["", "Wrath", "Desire", "Greed", "Attachment", "Envy", "Pride"];
    return worldNames[this._session.currentWorld] || "Unknown";
  }

  /**
   * Get session duration in milliseconds
   */
  getSessionDuration(): number {
    return Date.now() - this._session.startTime;
  }

  /**
   * Get session statistics
   */
  getSessionStats(): {
    duration: number;
    deaths: number;
    enemiesKilled: number;
    currentLocation: string;
  } {
    return {
      duration: this.getSessionDuration(),
      deaths: this._session.deaths,
      enemiesKilled: this._session.enemiesKilled,
      currentLocation: `${this.getCurrentWorldName()} ${this._session.currentLevel}`,
    };
  }

  /**
   * Force state change (mainly for debugging)
   */
  forceState(state: GameState) {
    this.setState(state);
  }

  private setState(newState: GameState) {
    if (newState === this._currentState) return;

    this._previousState = this._currentState;
    this._currentState = newState;

    const stateData: GameStateData = {
      state: newState,
      previousState: this._previousState,
      timestamp: Date.now(),
    };

    this.onStateChanged.emit(stateData);
    log("GameState", `State changed: ${this._previousState} -> ${newState}`);
  }
}
