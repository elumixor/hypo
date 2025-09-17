import { type ResizeData, Widget } from "@engine";
import { HealthBehavior } from "behaviors/health.behavior";
import { Graphics, Text } from "pixi.js";
import { textStyle } from "ui/fonts";
import { Player } from "../entities/player";

export class PlayerStatsWidget extends Widget {
  private healthBar!: Graphics;
  private healthText!: Text;
  private background!: Graphics;
  private playerHealthComponent!: HealthBehavior;
  private readonly baseWidth = 300;
  private readonly baseHeight = 40;
  private scale = 1;

  override async init() {
    await super.init();

    // Find player and get health component
    const player = this.scene.getEntity(Player);
    this.playerHealthComponent = player.getBehavior(HealthBehavior);

    // Listen to health changes
    this.playerHealthComponent.healthChanged.subscribeImmediate(this.updateHealthDisplay);

    // Create health bar background
    this.background = new Graphics();
    this.updateBackground();

    // Create health bar foreground
    this.healthBar = new Graphics();
    this.updateHealthBar();

    // Create health text
    this.healthText = new Text({
      text: "100/100",
      style: textStyle.basic,
    });
    this.healthText.anchor.set(0.5);
    this.updateTextPosition();

    // Add to container
    this.addChild(this.background, this.healthBar, this.healthText);

    // Listen to resize events
    this.game.resized.subscribeImmediate(this.resize.bind(this));
  }

  private readonly updateHealthDisplay = () => {
    this.updateHealthBar();
    this.updateHealthText();
  };

  private updateBackground() {
    this.background.clear();
    const scaledWidth = this.baseWidth * this.scale;
    const scaledHeight = this.baseHeight * this.scale;

    this.background
      .roundRect(0, 0, scaledWidth, scaledHeight, 5 * this.scale)
      .fill({ color: 0x333333 })
      .stroke({ color: 0x666666, width: 2 * this.scale });
  }

  private updateHealthBar() {
    if (!this.playerHealthComponent) return;

    const healthPercent = this.playerHealthComponent.health / this.playerHealthComponent.maxHealth;
    const barWidth = (this.baseWidth - 10) * this.scale * healthPercent; // 290 scaled minus padding

    this.healthBar.clear();

    // Choose color based on health percentage
    let color = 0x00ff00; // Green
    if (healthPercent < 0.3)
      color = 0xff0000; // Red
    else if (healthPercent < 0.6) color = 0xffff00; // Yellow

    this.healthBar
      .roundRect(5 * this.scale, 5 * this.scale, barWidth, (this.baseHeight - 10) * this.scale, 3 * this.scale)
      .fill({ color });
  }

  private updateHealthText() {
    if (!this.playerHealthComponent) return;

    this.healthText.text = `${this.playerHealthComponent.health}/${this.playerHealthComponent.maxHealth}`;
    this.updateTextPosition();
  }

  private updateTextPosition() {
    this.healthText.position.set((this.baseWidth * this.scale) / 2, (this.baseHeight * this.scale) / 2);
    this.healthText.scale.set(this.scale);
  }

  private resize({ width, height }: ResizeData) {
    // Guard against resize events after widget destruction
    if (!this.container || this.container.destroyed) return;

    // Calculate scale based on screen size (responsive scaling)
    // Base scale on smaller dimension to ensure it fits on mobile
    const minDimension = Math.min(width, height);
    this.scale = Math.max(0.5, Math.min(1, minDimension / 800)); // Scale between 0.5 and 1.0

    // Update all visual elements
    this.updateBackground();
    this.updateHealthBar();
    this.updateTextPosition();

    // Position at bottom-left with 15px margin
    this.container.position.set(-width / 2 + 15, height / 2 - this.baseHeight * this.scale - 15);
  }

  override destroy() {
    // Clean up resize subscription
    this.game.resized.unsubscribe(this.resize);
    this.playerHealthComponent.healthChanged.unsubscribe(this.updateHealthDisplay);

    super.destroy();
  }
}
