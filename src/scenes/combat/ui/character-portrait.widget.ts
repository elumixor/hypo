import { type ResizeData, Widget } from "@engine";
import { Graphics, Sprite, Text } from "pixi.js";
import { resources } from "resources";
import { CharacterProgressionService } from "services/character-progression.service";
import { textStyle } from "ui/fonts";

export class CharacterPortraitWidget extends Widget {
  private readonly progression = this.require(CharacterProgressionService);

  private portraitSprite!: Sprite;
  private readonly levelText = new Text({ text: "1", ...textStyle.basic });

  override async init() {
    await super.init();

    // Create the circular background
    const portraitBg = new Graphics().circle(0, 0, 40).fill({ color: 0x333333 }).stroke({ color: 0x666666, width: 2 });

    // Load and setup Helios portrait (todo: changed based on the currently selected character)
    const heliosTexture = resources.get("sprites/characters/helios");
    this.portraitSprite = new Sprite(heliosTexture);

    // Make the sprite circular by clipping with cover behavior (preserve aspect ratio)
    this.portraitSprite.anchor.set(0.5);

    // Calculate scale to cover the circular area while preserving aspect ratio
    const portraitDiameter = 80; // Based on radius of 40
    const scale = Math.max(portraitDiameter / this.portraitSprite.width, portraitDiameter / this.portraitSprite.height);
    this.portraitSprite.scale.set(scale);

    // Offset the portrait image down slightly for better framing
    this.portraitSprite.position.y = 15;

    // Create a circular mask for the portrait
    const portraitMask = new Graphics().circle(0, 0, 38).fill({ color: 0xffffff });
    this.addChild(portraitMask);
    this.portraitSprite.mask = portraitMask;

    this.addChild(this.portraitSprite);

    // Create level badge (small circle at bottom of portrait)
    const levelBg = new Graphics().circle(0, 0, 12).fill({ color: 0x4a90e2 }).stroke({ color: 0x2c5aa0, width: 2 });

    // Setup level text
    this.levelText.anchor.set(0.5);
    this.levelText.style.fontSize = 14;
    this.levelText.style.fill = "#ffffff";
    this.levelText.style.fontWeight = "bold";

    // Position level badge at bottom of portrait
    levelBg.position.set(0, 35);
    this.levelText.position.set(0, 35);

    this.addChild(portraitBg, portraitMask, this.portraitSprite, levelBg, this.levelText);

    // Subscribe to level changes
    this.onImmediate(this.progression.levelUp, () => (this.levelText.text = this.progression.currentLevel));
    this.on(this.progression.xpGained, () => (this.levelText.text = this.progression.currentLevel));

    // Listen to resize events
    this.onImmediate(this.game.resized, this.resize.bind(this));
  }

  private resize({ width, height }: ResizeData) {
    // Position above the XP bar with margin
    const margin = 20;
    const portraitRadius = 40;
    const xpBarHeight = 6;
    const xpBarMargin = 10;
    const spacingAboveXPBar = 10;

    // Position above XP bar: account for XP bar height, its margin, and additional spacing
    const yOffset = xpBarHeight + xpBarMargin + spacingAboveXPBar + portraitRadius;

    this.position.set(-width / 2 + margin + portraitRadius, height / 2 - yOffset);
  }
}
