import { type ResizeData, Widget } from "@engine";
import { EnergyBehavior } from "scenes/combat/behaviors/energy.behavior";
import { HealthBehavior } from "scenes/combat/behaviors/health.behavior";
import { StatusBar } from "ui/status-bar";
import { Player } from "../entities/player";

export class PlayerStatsWidget extends Widget {
  private healthBar!: StatusBar;
  private energyBar!: StatusBar;
  private playerHealthComponent!: HealthBehavior;
  private playerEnergyComponent!: EnergyBehavior;

  override async init() {
    await super.init();

    // Find player and get health and energy components
    const player = this.scene.getEntity(Player);
    this.playerHealthComponent = player.getBehavior(HealthBehavior);
    this.playerEnergyComponent = player.getBehavior(EnergyBehavior);

    // Create status bars
    this.healthBar = new StatusBar();
    this.healthBar.barWidth = 290;
    this.healthBar.barHeight = 30;
    this.healthBar.position.set(0, -30);
    this.healthBar.color = 0x00ff00; // Green
    this.healthBar.maxValue = this.playerHealthComponent.maxHealth;
    this.healthBar.value = this.playerHealthComponent.health;

    this.energyBar = new StatusBar();
    this.energyBar.barWidth = 290;
    this.energyBar.barHeight = 15;
    this.energyBar.position.set(0, -55);
    this.energyBar.color = 0x0080ff; // Blue
    this.energyBar.maxValue = this.playerEnergyComponent.maxEnergy;
    this.energyBar.value = this.playerEnergyComponent.energy;

    // Add status bars to container
    this.addChild(this.healthBar, this.energyBar);

    // Listen to health and energy changes
    this.playerHealthComponent.healthChanged.subscribeImmediate(this.updateHealthDisplay);
    this.playerEnergyComponent.energyChanged.subscribeImmediate(this.updateEnergyDisplay);

    // Listen to resize events
    this.game.resized.subscribeImmediate(this.resize.bind(this));
  }

  private readonly updateHealthDisplay = () => {
    this.healthBar.value = this.playerHealthComponent.health;
    this.updateHealthColor();
  };

  private readonly updateEnergyDisplay = () => {
    this.energyBar.value = this.playerEnergyComponent.energy;
  };

  private updateHealthColor() {
    const healthPercent = this.playerHealthComponent.health / this.playerHealthComponent.maxHealth;
    let color = 0x00ff00; // Green
    if (healthPercent < 0.3)
      color = 0xff0000; // Red
    else if (healthPercent < 0.6) color = 0xffff00; // Yellow
    this.healthBar.color = color;
  }

  private resize({ width, height }: ResizeData) {
    // Calculate scale based on screen size (responsive scaling)
    // Base scale on smaller dimension to ensure it fits on mobile
    const minDimension = Math.min(width, height);
    const scale = Math.max(0.5, Math.min(1, minDimension / 800)); // Scale between 0.5 and 1.0

    // Update status bars
    this.container.scale.set(scale);

    // Position at bottom-left with 15px margin
    this.container.position.set(-width / 2 + 15, height / 2 - 15);
  }

  override destroy() {
    // Clean up resize subscription
    this.game.resized.unsubscribe(this.resize);
    this.playerHealthComponent.healthChanged.unsubscribe(this.updateHealthDisplay);
    this.playerEnergyComponent.energyChanged.unsubscribe(this.updateEnergyDisplay);

    super.destroy();
  }
}
