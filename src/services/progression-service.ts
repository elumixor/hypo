import { EventEmitter } from "@elumixor/frontils";
import { Service } from "../../engine/service";

export interface LevelUpData {
  newLevel: number;
  xp: number;
  xpToNext: number;
}

export class ProgressionService extends Service {
  readonly onLevelUp = new EventEmitter<LevelUpData>();
  readonly onXpGained = new EventEmitter<{ amount: number; totalXp: number }>();

  private level = 1;
  private xp = 0;
  private xpToNext = 5;

  get currentLevel(): number {
    return this.level;
  }

  get currentXp(): number {
    return this.xp;
  }

  get xpToNextLevel(): number {
    return this.xpToNext;
  }

  addExperience(amount: number): void {
    this.xp += amount;
    this.onXpGained.emit({ amount, totalXp: this.xp });

    if (this.xp >= this.xpToNext) {
      this.levelUp();
    }
  }

  private levelUp(): void {
    this.level++;
    this.xp -= this.xpToNext;
    this.xpToNext = Math.floor(this.xpToNext * 1.5); // Exponential scaling

    const levelData: LevelUpData = {
      newLevel: this.level,
      xp: this.xp,
      xpToNext: this.xpToNext,
    };

    this.onLevelUp.emit(levelData);
  }

  // For save/load functionality
  getState() {
    return {
      level: this.level,
      xp: this.xp,
      xpToNext: this.xpToNext,
    };
  }

  setState(state: { level: number; xp: number; xpToNext: number }): void {
    this.level = state.level;
    this.xp = state.xp;
    this.xpToNext = state.xpToNext;
  }
}
