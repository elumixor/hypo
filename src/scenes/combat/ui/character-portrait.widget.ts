import { type ResizeData, Widget } from "@engine";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { resources } from "resources";
import { CharacterProgressionService } from "services/character-progression.service";
import { textStyle } from "ui/fonts";

export class CharacterPortraitWidget extends Widget {
  private readonly portraitContainer = new Container();
  private readonly portraitBg = new Graphics();
  private portraitSprite!: Sprite;
  private readonly levelBadge = new Container();
  private readonly levelBg = new Graphics();
  private readonly levelText = new Text({ text: "1", ...textStyle.basic });

  override async init() {
    await super.init();

    // Create the circular background
    this.portraitBg.circle(0, 0, 40).fill({ color: 0x333333 }).stroke({ color: 0x666666, width: 2 });

    this.portraitContainer.addChild(this.portraitBg);

    // Load and setup Helios portrait
    const heliosTexture = resources.get("sprites/characters/helios");
    this.portraitSprite = new Sprite(heliosTexture);

    // Make the sprite circular by clipping with cover behavior (preserve aspect ratio)
    this.portraitSprite.anchor.set(0.5);

    // Calculate scale to cover the circular area while preserving aspect ratio
    const portraitDiameter = 80; // Based on radius of 40
    const textureAspectRatio = heliosTexture.width / heliosTexture.height;

    if (textureAspectRatio > 1) {
      // Texture is wider than tall - scale by height
      this.portraitSprite.height = portraitDiameter;
      this.portraitSprite.width = portraitDiameter * textureAspectRatio;
    } else {
      // Texture is taller than wide - scale by width
      this.portraitSprite.width = portraitDiameter;
      this.portraitSprite.height = portraitDiameter / textureAspectRatio;
    }

    // Offset the portrait image down slightly for better framing
    this.portraitSprite.position.y = 15;

    // Create a circular mask for the portrait
    const portraitMask = new Graphics();
    portraitMask.circle(0, 0, 38).fill({ color: 0xffffff });
    this.portraitContainer.addChild(portraitMask);
    this.portraitSprite.mask = portraitMask;

    this.portraitContainer.addChild(this.portraitSprite);

    // Create level badge (small circle at bottom of portrait)
    this.levelBg.circle(0, 0, 12).fill({ color: 0x4a90e2 }).stroke({ color: 0x2c5aa0, width: 2 });

    this.levelBadge.addChild(this.levelBg);

    // Setup level text
    this.levelText.anchor.set(0.5);
    this.levelText.style.fontSize = 14;
    this.levelText.style.fill = "#ffffff";
    this.levelText.style.fontWeight = "bold";
    this.levelBadge.addChild(this.levelText);

    // Position level badge at bottom of portrait
    this.levelBadge.position.set(0, 35);
    this.portraitContainer.addChild(this.levelBadge);

    // Add portrait container to widget
    this.addChild(this.portraitContainer);

    // Subscribe to level changes
    const progression = this.getService(CharacterProgressionService);
    progression.levelUp.subscribe(this.updateLevel);
    progression.xpGained.subscribe(this.updateLevel);

    // Set initial level
    this.levelText.text = progression.currentLevel.toString();

    // Listen to resize events
    this.game.resized.subscribeImmediate(this.resize.bind(this));
  }

  private readonly updateLevel = () => {
    const progression = this.getService(CharacterProgressionService);
    this.levelText.text = progression.currentLevel.toString();
  };

  private resize({ width, height }: ResizeData) {
    // Position above the XP bar with margin
    const margin = 20;
    const portraitRadius = 40;
    const xpBarHeight = 6;
    const xpBarMargin = 10;
    const spacingAboveXPBar = 10;

    // Position above XP bar: account for XP bar height, its margin, and additional spacing
    const yOffset = xpBarHeight + xpBarMargin + spacingAboveXPBar + portraitRadius;

    this.portraitContainer.position.set(-width / 2 + margin + portraitRadius, height / 2 - yOffset);
  }

  override destroy() {
    // Unsubscribe from progression events
    const progression = this.getService(CharacterProgressionService);
    progression.levelUp.unsubscribe(this.updateLevel);
    progression.xpGained.unsubscribe(this.updateLevel);

    // Unsubscribe from resize events
    this.game.resized.unsubscribe(this.resize);

    // Clean up graphics objects
    if (this.portraitBg) {
      this.portraitBg.destroy();
    }
    if (this.levelBg) {
      this.levelBg.destroy();
    }

    super.destroy();
  }
}
