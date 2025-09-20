import { type ResizeData, Widget } from "@engine";
import { Container, Graphics } from "pixi.js";
import { CharacterProgressionService } from "services/character-progression.service";

export class XPBarWidget extends Widget {
  private readonly progression = this.require(CharacterProgressionService);
  private readonly xpBarContainer = new Container();
  private readonly xpBarBg = new Graphics();
  private readonly xpBarFill = new Graphics();
  private barWidth = 0;
  private readonly barHeight = 6;

  override async init() {
    await super.init();

    // Create XP bar background
    this.xpBarBg
      .rect(0, 0, this.barWidth, this.barHeight)
      .fill({ color: 0x333333 })
      .stroke({ color: 0x666666, width: 1 });

    // Create XP bar fill
    this.xpBarFill.rect(0, 0, 0, this.barHeight).fill({ color: 0x4a90e2 });

    this.xpBarContainer.addChild(this.xpBarBg, this.xpBarFill);
    this.addChild(this.xpBarContainer);

    // Subscribe to XP changes AFTER graphics are initialized
    this.progression.xpGained.subscribe(this.updateXPBar);
    this.progression.levelUp.subscribe(this.updateXPBar);

    // Initial update
    this.updateXPBar();

    // Listen to resize events
    this.game.resized.subscribeImmediate(this.resize.bind(this));
  }

  private readonly updateXPBar = () => {
    // Guard against calls before initialization or after destruction
    if (!this.progression || !this.xpBarFill || !this.xpBarBg) return;

    const currentXP = this.progression.currentXP;
    const currentLevel = this.progression.currentLevel;

    // Calculate XP for current level and next level
    const xpForCurrentLevel = this.progression.xpForLevel(currentLevel);
    const xpForNextLevel = this.progression.xpForLevel(currentLevel + 1);
    const xpInCurrentLevel = currentXP - xpForCurrentLevel;
    const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel;

    // Calculate fill percentage
    const fillPercentage = Math.min(xpInCurrentLevel / xpNeededForLevel, 1);
    const fillWidth = this.barWidth * fillPercentage;

    // Update fill graphics
    this.xpBarFill.clear();
    this.xpBarFill.rect(0, 0, fillWidth, this.barHeight).fill({ color: 0x4a90e2 });
  };

  private resize({ width, height }: ResizeData) {
    // Guard against calls before initialization
    if (!this.xpBarBg || !this.xpBarFill) return;

    // XP bar spans full width at bottom with small margins
    const margin = 10;
    this.barWidth = width - margin * 2;

    // Update bar background width
    this.xpBarBg.clear();
    this.xpBarBg
      .rect(0, 0, this.barWidth, this.barHeight)
      .fill({ color: 0x333333 })
      .stroke({ color: 0x666666, width: 1 });

    // Position at bottom center of screen
    this.xpBarContainer.position.set(-width / 2 + margin, height / 2 - margin - this.barHeight);

    // Update XP bar fill
    this.updateXPBar();
  }

  override destroy() {
    // Unsubscribe from progression events
    if (this.progression) {
      this.progression.xpGained.unsubscribe(this.updateXPBar);
      this.progression.levelUp.unsubscribe(this.updateXPBar);
    }

    // Unsubscribe from resize events
    this.game.resized.unsubscribe(this.resize);

    // Clean up graphics objects
    if (this.xpBarFill) {
      this.xpBarFill.destroy();
    }
    if (this.xpBarBg) {
      this.xpBarBg.destroy();
    }

    super.destroy();
  }
}
