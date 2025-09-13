import { type Application, Graphics, Text } from "pixi.js";
import { GameConfig } from "../../config/GameConfig";
import { UIComponent } from "./UIComponent";

/**
 * Health bar UI component
 */
export class HealthBar extends UIComponent {
  private background!: Graphics;
  private foreground!: Graphics;
  private text!: Text;
  private currentHp = 10;
  private maxHp = 10;

  constructor(app: Application) {
    super(app);
  }

  protected init(): void {
    // Background bar
    this.background = new Graphics();
    this.background.rect(0, 0, GameConfig.UI.HEALTH_BAR_WIDTH, GameConfig.UI.HEALTH_BAR_HEIGHT);
    this.background.fill(0x222222);
    this.container.addChild(this.background);

    // Foreground bar (health)
    this.foreground = new Graphics();
    this.container.addChild(this.foreground);

    // Health text
    this.text = new Text({
      text: `${this.currentHp}/${this.maxHp}`,
      style: {
        fill: GameConfig.COLORS.UI_TEXT,
        fontSize: 12,
        fontFamily: "system-ui, sans-serif",
      },
    });
    this.text.anchor.set(0.5, 0.5);
    this.text.position.set(GameConfig.UI.HEALTH_BAR_WIDTH / 2, GameConfig.UI.HEALTH_BAR_HEIGHT / 2);
    this.container.addChild(this.text);

    this.updateDisplay();
  }

  /**
   * Set health values
   */
  setHealth(current: number, max: number): void {
    this.currentHp = Math.max(0, current);
    this.maxHp = Math.max(1, max);
    this.updateDisplay();
  }

  /**
   * Update the visual display
   */
  private updateDisplay(): void {
    const healthPercent = this.currentHp / this.maxHp;
    const barWidth = GameConfig.UI.HEALTH_BAR_WIDTH * healthPercent;

    // Update foreground bar
    this.foreground.clear();
    this.foreground.rect(0, 0, barWidth, GameConfig.UI.HEALTH_BAR_HEIGHT);
    this.foreground.fill(0xff4444);

    // Update text
    this.text.text = `${this.currentHp}/${this.maxHp}`;
  }
}

/**
 * Experience bar UI component
 */
export class ExperienceBar extends UIComponent {
  private background!: Graphics;
  private foreground!: Graphics;
  private levelText!: Text;
  private xpText!: Text;
  private level = 1;
  private currentXp = 0;
  private xpToNext = 5;

  constructor(app: Application) {
    super(app);
  }

  protected init(): void {
    // Background bar
    this.background = new Graphics();
    this.background.rect(0, 0, GameConfig.UI.HEALTH_BAR_WIDTH, 8);
    this.background.fill(0x333333);
    this.container.addChild(this.background);

    // Foreground bar (XP)
    this.foreground = new Graphics();
    this.container.addChild(this.foreground);

    // Level text
    this.levelText = new Text({
      text: `Lv:${this.level}`,
      style: {
        fill: GameConfig.COLORS.UI_TEXT,
        fontSize: 13,
        fontFamily: "system-ui, sans-serif",
      },
    });
    this.levelText.position.set(0, 12);
    this.container.addChild(this.levelText);

    // XP text
    this.xpText = new Text({
      text: `XP:${this.currentXp}/${this.xpToNext}`,
      style: {
        fill: GameConfig.COLORS.UI_TEXT,
        fontSize: 13,
        fontFamily: "system-ui, sans-serif",
      },
    });
    this.xpText.position.set(68, 12);
    this.container.addChild(this.xpText);

    this.updateDisplay();
  }

  /**
   * Set XP values
   */
  setXP(level: number, xp: number, xpToNext: number): void {
    this.level = level;
    this.currentXp = xp;
    this.xpToNext = Math.max(1, xpToNext);
    this.updateDisplay();
  }

  /**
   * Update the visual display
   */
  private updateDisplay(): void {
    const xpPercent = this.currentXp / this.xpToNext;
    const barWidth = GameConfig.UI.HEALTH_BAR_WIDTH * xpPercent;

    // Update foreground bar
    this.foreground.clear();
    this.foreground.rect(0, 0, barWidth, 8);
    this.foreground.fill(0x4488ff);

    // Update texts
    this.levelText.text = `Lv:${this.level}`;
    this.xpText.text = `XP:${this.currentXp}/${this.xpToNext}`;
  }
}

/**
 * Status text component
 */
export class StatusText extends UIComponent {
  private text!: Text;

  constructor(app: Application) {
    super(app);
  }

  protected init(): void {
    this.text = new Text({
      text: "Game Started",
      style: {
        fill: GameConfig.COLORS.UI_TEXT,
        fontSize: 14,
        letterSpacing: 1,
        fontFamily: "system-ui, sans-serif",
      },
    });
    this.container.addChild(this.text);
  }

  /**
   * Set status text
   */
  setText(message: string): void {
    this.text.text = message;
  }

  /**
   * Get current text
   */
  getText(): string {
    return this.text.text;
  }
}
