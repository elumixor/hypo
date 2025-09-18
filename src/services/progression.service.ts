import { EventEmitter } from "@elumixor/event-emitter";
import { Service } from "@engine";

export interface LevelUpEvent {
  newLevel: number;
  previousLevel: number;
  xpToNextLevel: number;
}

export interface XPGainEvent {
  amount: number;
  totalXP: number;
  currentLevel: number;
}

export class ProgressionService extends Service {
  readonly levelUp = new EventEmitter<LevelUpEvent>();
  readonly xpGained = new EventEmitter<XPGainEvent>();

  private _currentXP = 0;
  private _currentLevel = 1;

  get currentXP() {
    return this._currentXP;
  }

  get currentLevel() {
    return this._currentLevel;
  }

  get xpToNextLevel() {
    return this.calculateXPForLevel(this._currentLevel + 1) - this._currentXP;
  }

  addXP(amount: number) {
    this._currentXP += amount;
    
    const previousLevel = this._currentLevel;
    const newLevel = this.calculateLevelFromXP(this._currentXP);
    
    if (newLevel > previousLevel) {
      this._currentLevel = newLevel;
      this.levelUp.emit({
        newLevel,
        previousLevel,
        xpToNextLevel: this.xpToNextLevel,
      });
    }

    this.xpGained.emit({
      amount,
      totalXP: this._currentXP,
      currentLevel: this._currentLevel,
    });

    this.log(`XP gained: ${amount}, Total XP: ${this._currentXP}, Level: ${this._currentLevel}`);
  }

  private calculateXPForLevel(level: number): number {
    // Simple XP formula: level^2 * 100
    // Level 1: 100 XP, Level 2: 400 XP, Level 3: 900 XP, etc.
    return level * level * 100;
  }

  private calculateLevelFromXP(xp: number): number {
    let level = 1;
    while (this.calculateXPForLevel(level + 1) <= xp) {
      level++;
    }
    return level;
  }
}