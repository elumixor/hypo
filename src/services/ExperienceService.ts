import { EventEmitter } from "@elumixor/frontils";
import { BaseService } from "./BaseService";

export interface ExperienceData {
  level: number;
  currentXp: number;
  xpToNext: number;
  totalXp: number;
  percentage: number;
}

export interface LevelUpData {
  newLevel: number;
  skillPoints: number;
  bonusStats?: Record<string, number>;
}

/**
 * Manages player experience, leveling, and progression
 */
export class ExperienceService extends BaseService {
  private _level = 1;
  private _currentXp = 0;
  private _xpToNext = 5;
  private _totalXp = 0;

  // Events
  readonly onXpGained = new EventEmitter<{ amount: number; newXp: number }>();
  readonly onLevelUp = new EventEmitter<LevelUpData>();
  readonly onExperienceChanged = new EventEmitter<ExperienceData>();

  constructor() {
    super();
    this.reset();
  }

  /**
   * Get current level
   */
  get level(): number {
    return this._level;
  }

  /**
   * Get current XP in this level
   */
  get currentXp(): number {
    return this._currentXp;
  }

  /**
   * Get XP needed for next level
   */
  get xpToNext(): number {
    return this._xpToNext;
  }

  /**
   * Get total XP gained across all levels
   */
  get totalXp(): number {
    return this._totalXp;
  }

  /**
   * Get XP progress as percentage (0-1)
   */
  get percentage(): number {
    return this._xpToNext > 0 ? this._currentXp / this._xpToNext : 1;
  }

  /**
   * Add experience points
   */
  addXp(amount: number): boolean {
    if (amount <= 0) return false;

    this._currentXp += amount;
    this._totalXp += amount;

    this.onXpGained.emit({ amount, newXp: this._currentXp });

    // Check for level ups
    let leveledUp = false;
    while (this._currentXp >= this._xpToNext) {
      this.levelUp();
      leveledUp = true;
    }

    this.emitExperienceChanged();
    return leveledUp;
  }

  /**
   * Set XP directly (mainly for testing/debugging)
   */
  setXp(xp: number) {
    if (xp < 0) return;

    const difference = xp - this._currentXp;
    if (difference > 0) {
      this.addXp(difference);
    } else if (difference < 0) {
      // Losing XP is rare, handle carefully
      this._currentXp = Math.max(0, xp);
      this._totalXp = Math.max(0, this._totalXp + difference);
      this.emitExperienceChanged();
    }
  }

  /**
   * Calculate XP required for a specific level
   */
  getXpRequiredForLevel(level: number): number {
    if (level <= 1) return 0;

    // Progressive XP formula: base * (multiplier ^ (level - 1))
    // This matches the original game's formula: xpToNext * 1.4 + 2
    let totalRequired = 0;
    let currentRequirement = 5; // Starting requirement

    for (let i = 1; i < level; i++) {
      totalRequired += currentRequirement;
      currentRequirement = Math.floor(currentRequirement * 1.4) + 2;
    }

    return totalRequired;
  }

  /**
   * Get data for a specific level
   */
  getLevelData(level: number): { xpRequired: number; xpToNext: number } {
    const xpRequired = this.getXpRequiredForLevel(level);
    const xpToNext = this.getXpRequiredForLevel(level + 1) - xpRequired;

    return { xpRequired, xpToNext };
  }

  /**
   * Reset experience to starting values (for death/restart)
   */
  reset() {
    this._level = 1;
    this._currentXp = 0;
    this._xpToNext = 5;
    this._totalXp = 0;
    this.emitExperienceChanged();
  }

  /**
   * Get current experience data
   */
  getExperienceData(): ExperienceData {
    return {
      level: this._level,
      currentXp: this._currentXp,
      xpToNext: this._xpToNext,
      totalXp: this._totalXp,
      percentage: this.percentage,
    };
  }

  private levelUp() {
    this._currentXp -= this._xpToNext;
    this._level += 1;

    // Calculate new XP requirement using the same formula as the original game
    this._xpToNext = Math.floor(this._xpToNext * 1.4) + 2;

    const levelUpData: LevelUpData = {
      newLevel: this._level,
      skillPoints: 1, // Could be made configurable
      bonusStats: this.calculateLevelBonuses(this._level),
    };

    this.onLevelUp.emit(levelUpData);
    log("Experience", `Leveled up to ${this._level}!`);
  }

  private calculateLevelBonuses(level: number): Record<string, number> {
    // Example bonus stats per level - can be customized
    return {
      maxHealth: level <= 5 ? 2 : 1, // More health early on
      damage: Math.floor(level / 3), // Damage every 3 levels
      speed: level % 10 === 0 ? 0.1 : 0, // Speed every 10 levels
    };
  }

  private emitExperienceChanged() {
    this.onExperienceChanged.emit(this.getExperienceData());
  }
}
