import { GameConfig } from "../config/GameConfig";
import { gameEvents } from "../events/GameEvents";

/**
 * Centralized game state management
 */
export interface PlayerState {
  level: number;
  xp: number;
  xpToNext: number;
  hp: number;
  maxHp: number;
  position: { x: number; y: number; z: number };
  yaw: number;
}

export interface CombatState {
  autoAttack: boolean;
  lastDashTime: number;
  dashCooldown: number;
  shieldActive: boolean;
}

export interface WorldState {
  currentWorld: number;
  currentLevel: number;
  enemyCount: number;
  projectileCount: number;
}

export interface GameStateData {
  player: PlayerState;
  combat: CombatState;
  world: WorldState;
  gameTime: number;
  isPaused: boolean;
  isGameOver: boolean;
}

export class GameState {
  private state: GameStateData;

  constructor() {
    this.state = this.createInitialState();
  }

  private createInitialState(): GameStateData {
    return {
      player: {
        level: GameConfig.PROGRESSION.INITIAL_LEVEL,
        xp: GameConfig.PROGRESSION.INITIAL_XP,
        xpToNext: GameConfig.PROGRESSION.INITIAL_XP_TO_NEXT,
        hp: GameConfig.PLAYER.MAX_HP,
        maxHp: GameConfig.PLAYER.MAX_HP,
        position: { x: 0, y: 0.4, z: 0 },
        yaw: GameConfig.PLAYER.INITIAL_YAW,
      },
      combat: {
        autoAttack: true,
        lastDashTime: 0,
        dashCooldown: 0,
        shieldActive: false,
      },
      world: {
        currentWorld: 1,
        currentLevel: 1,
        enemyCount: 0,
        projectileCount: 0,
      },
      gameTime: 0,
      isPaused: false,
      isGameOver: false,
    };
  }

  /**
   * Get a readonly copy of the current state
   */
  get current(): Readonly<GameStateData> {
    return structuredClone(this.state);
  }

  /**
   * Update player health and emit events
   */
  damagePlayer(damage: number): void {
    const oldHp = this.state.player.hp;
    this.state.player.hp = Math.max(0, oldHp - damage);

    gameEvents.emit("player:hit", { damage, currentHp: this.state.player.hp });
    gameEvents.emit("ui:healthUpdate", {
      current: this.state.player.hp,
      max: this.state.player.maxHp,
    });

    if (this.state.player.hp <= 0 && oldHp > 0) {
      this.handlePlayerDeath();
    }
  }

  /**
   * Add experience and handle level ups
   */
  addExperience(amount: number): void {
    this.state.player.xp += amount;

    if (this.state.player.xp >= this.state.player.xpToNext) {
      this.levelUp();
    }

    gameEvents.emit("xp:collected", {
      amount,
      totalXp: this.state.player.xp,
    });
    gameEvents.emit("ui:xpUpdate", {
      level: this.state.player.level,
      xp: this.state.player.xp,
      xpToNext: this.state.player.xpToNext,
    });
  }

  /**
   * Level up the player
   */
  private levelUp(): void {
    this.state.player.level += 1;
    this.state.player.xp = 0;
    this.state.player.xpToNext =
      Math.floor(this.state.player.xpToNext * GameConfig.PROGRESSION.XP_MULTIPLIER) +
      GameConfig.PROGRESSION.XP_BASE_INCREASE;

    gameEvents.emit("player:levelUp", {
      newLevel: this.state.player.level,
      xp: this.state.player.xp,
      xpToNext: this.state.player.xpToNext,
    });
  }

  /**
   * Handle player death
   */
  private handlePlayerDeath(): void {
    gameEvents.emit("player:death", {
      level: this.state.player.level,
      xp: this.state.player.xp,
    });

    // Reset progression on death
    this.state.player.level = GameConfig.PROGRESSION.INITIAL_LEVEL;
    this.state.player.xp = GameConfig.PROGRESSION.INITIAL_XP;
    this.state.player.xpToNext = GameConfig.PROGRESSION.INITIAL_XP_TO_NEXT;

    this.state.isGameOver = true;
  }

  /**
   * Respawn the player
   */
  respawn(): void {
    this.state.player.hp = this.state.player.maxHp;
    this.state.player.position = { x: 0, y: 0.4, z: 0 };
    this.state.isGameOver = false;

    gameEvents.emit("ui:healthUpdate", {
      current: this.state.player.hp,
      max: this.state.player.maxHp,
    });
    gameEvents.emit("ui:xpUpdate", {
      level: this.state.player.level,
      xp: this.state.player.xp,
      xpToNext: this.state.player.xpToNext,
    });
  }

  /**
   * Update player position
   */
  updatePlayerPosition(x: number, y: number, z: number): void {
    this.state.player.position = { x, y, z };
  }

  /**
   * Update player yaw
   */
  updatePlayerYaw(yaw: number): void {
    this.state.player.yaw = yaw;
  }

  /**
   * Set shield state
   */
  setShield(active: boolean): void {
    this.state.combat.shieldActive = active;
    gameEvents.emit("player:shield", { active });
  }

  /**
   * Set auto attack state
   */
  setAutoAttack(enabled: boolean): void {
    this.state.combat.autoAttack = enabled;
  }

  /**
   * Update game time
   */
  updateGameTime(deltaTime: number): void {
    if (!this.state.isPaused) {
      this.state.gameTime += deltaTime;
    }
  }

  /**
   * Update world statistics
   */
  updateWorldStats(enemyCount: number, projectileCount: number): void {
    this.state.world.enemyCount = enemyCount;
    this.state.world.projectileCount = projectileCount;
  }

  /**
   * Pause/unpause the game
   */
  setPaused(paused: boolean): void {
    if (this.state.isPaused === paused) return;

    this.state.isPaused = paused;
    gameEvents.emit(paused ? "game:paused" : "game:resumed", {});
  }

  /**
   * Reset the game state
   */
  reset(): void {
    this.state = this.createInitialState();
    gameEvents.emit("game:restart", {});
  }
}

// Global game state instance
export const gameState = new GameState();
