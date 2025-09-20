import { type ResizeData, Widget } from "@engine";
import { StatusBar } from "ui/status-bar";
import { DashBehavior, type DashChargeEvent } from "../behaviors/dash.behavior";
import { EnergyBehavior } from "../behaviors/energy.behavior";
import { HealthBehavior } from "../behaviors/health.behavior";
import { Player } from "../entities/player";
import { DashChargeIndicator } from "./dash-charge-indicator";

export class PlayerStatsWidget extends Widget {
  private health!: HealthBehavior;
  private energy!: EnergyBehavior;
  private dash!: DashBehavior;

  private readonly healthBar = new StatusBar();
  private readonly energyBar = new StatusBar();
  private readonly dashChargeIndicator = new DashChargeIndicator();

  override async init() {
    await super.init();

    // Find player and get health and energy behaviors
    // fixme: But should be a service of player stats and service of player abilities (later will not be just dash)
    const player = this.scene.getEntity(Player);
    this.health = player.getBehavior(HealthBehavior);
    this.energy = player.getBehavior(EnergyBehavior);
    this.dash = player.getBehavior(DashBehavior);

    // Create status bars
    this.healthBar.barWidth = 290;
    this.healthBar.barHeight = 30;
    this.healthBar.position.set(0, -27);
    this.healthBar.color = 0x00ff00; // Green
    this.healthBar.maxValue = this.health.maxHealth;
    this.healthBar.value = this.health.health;

    this.energyBar.barWidth = 290;
    this.energyBar.barHeight = 15;
    this.energyBar.position.set(0, -55);
    this.energyBar.color = 0x0080ff; // Blue
    this.energyBar.maxValue = this.energy.maxEnergy;
    this.energyBar.value = this.energy.energy;

    // Create dash charge indicator
    this.dashChargeIndicator.position.set(0, -85);
    this.dashChargeIndicator.maxCharges = this.dash.maxCharges;
    this.dashChargeIndicator.chargeRegenTime = this.dash.chargeRegenTime;

    // Add status bars and dash indicator to container
    this.addChild(this.healthBar, this.energyBar, this.dashChargeIndicator);

    // Listen to health and energy changes
    this.onImmediate(this.health.healthChanged, this.updateHealthDisplay.bind(this));
    this.onImmediate(this.energy.energyChanged, this.updateEnergyDisplay.bind(this));
    this.onImmediate(this.dash.chargeChanged, this.updateDashDisplay.bind(this));

    // Listen to resize events
    this.onImmediate(this.game.resized, this.resize.bind(this));
  }

  private updateHealthDisplay() {
    this.healthBar.value = this.health.health;
    this.updateHealthColor();
  }

  private updateEnergyDisplay() {
    this.energyBar.value = this.energy.energy;
  }

  private updateDashDisplay(event: DashChargeEvent) {
    this.dashChargeIndicator.maxCharges = event.maxCharges;
    this.dashChargeIndicator.updateChargeTimers(event.chargeTimers);
  }

  private updateHealthColor() {
    const healthPercent = this.health.health / this.health.maxHealth;
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

    // Position next to the character portrait (portrait takes ~100px width)
    // Leave space for portrait (80px radius + margin) and position above XP bar
    const portraitSpace = 110; // Space for character portrait
    const xpBarSpace = 30; // Space for XP bar at bottom
    this.container.position.set(-width / 2 + portraitSpace, height / 2 - xpBarSpace);
  }
}
