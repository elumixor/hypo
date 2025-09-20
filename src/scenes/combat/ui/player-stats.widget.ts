import { type ResizeData, Widget } from "@engine";
import {
  type DashChargesChangedEvent,
  type EnergyChangedEvent,
  type HealthChangedEvent,
  RuntimeCombatService,
} from "services/runtime-combat.service";
import { StatusBar } from "ui/status-bar";
import { DashChargeIndicator } from "./dash-charge-indicator";

export class PlayerStatsWidget extends Widget {
  private readonly combatService = this.require(RuntimeCombatService);

  private readonly healthBar = new StatusBar();
  private readonly energyBar = new StatusBar();
  private readonly dashChargeIndicator = new DashChargeIndicator();

  override async init() {
    await super.init();

    // Get the active character from combat service
    const activeCharacter = this.combatService.getActiveCharacter();
    if (!activeCharacter) return;

    // Create status bars
    this.healthBar.barWidth = 290;
    this.healthBar.barHeight = 30;
    this.healthBar.position.set(0, -27);
    this.healthBar.color = 0x00ff00; // Green
    this.healthBar.maxValue = activeCharacter.maxHealth;
    this.healthBar.value = activeCharacter.currentHealth;

    this.energyBar.barWidth = 290;
    this.energyBar.barHeight = 15;
    this.energyBar.position.set(0, -55);
    this.energyBar.color = 0x0080ff; // Blue
    this.energyBar.maxValue = activeCharacter.maxEnergy;
    this.energyBar.value = activeCharacter.currentEnergy;

    // Create dash charge indicator
    this.dashChargeIndicator.position.set(0, -85);
    this.dashChargeIndicator.maxCharges = activeCharacter.maxDashCharges;
    this.dashChargeIndicator.chargeRegenTime = activeCharacter.dashRegenTime;

    // Add status bars and dash indicator to container
    this.addChild(this.healthBar, this.energyBar, this.dashChargeIndicator);

    // Listen to combat service events
    this.onImmediate(this.combatService.healthChanged, this.updateHealthDisplay.bind(this));
    this.onImmediate(this.combatService.energyChanged, this.updateEnergyDisplay.bind(this));
    this.onImmediate(this.combatService.dashChargesChanged, this.updateDashDisplay.bind(this));
    this.onImmediate(this.combatService.activeCharacterChanged, this.updateActiveCharacter.bind(this));

    // Listen to resize events
    this.onImmediate(this.game.resized, this.resize.bind(this));
  }

  private updateHealthDisplay(event: HealthChangedEvent) {
    // Only update for the active character
    const activeCharacter = this.combatService.getActiveCharacter();
    if (!activeCharacter || event.characterId !== activeCharacter.characterId) return;

    this.healthBar.value = event.currentHealth;
    this.healthBar.maxValue = event.maxHealth;
    this.updateHealthColor(event.currentHealth, event.maxHealth);
  }

  private updateEnergyDisplay(event: EnergyChangedEvent) {
    // Only update for the active character
    const activeCharacter = this.combatService.getActiveCharacter();
    if (!activeCharacter || event.characterId !== activeCharacter.characterId) return;

    this.energyBar.value = event.currentEnergy;
    this.energyBar.maxValue = event.maxEnergy;
  }

  private updateDashDisplay(event: DashChargesChangedEvent) {
    // Only update for the active character
    const activeCharacter = this.combatService.getActiveCharacter();
    if (!activeCharacter || event.characterId !== activeCharacter.characterId) return;

    this.dashChargeIndicator.maxCharges = event.maxCharges;
    this.dashChargeIndicator.updateChargeTimers(event.chargeTimers);
  }

  private updateActiveCharacter() {
    // When active character changes, update all displays
    const activeCharacter = this.combatService.getActiveCharacter();
    if (!activeCharacter) return;

    // Update health bar
    this.healthBar.value = activeCharacter.currentHealth;
    this.healthBar.maxValue = activeCharacter.maxHealth;
    this.updateHealthColor(activeCharacter.currentHealth, activeCharacter.maxHealth);

    // Update energy bar
    this.energyBar.value = activeCharacter.currentEnergy;
    this.energyBar.maxValue = activeCharacter.maxEnergy;

    // Update dash indicator
    this.dashChargeIndicator.maxCharges = activeCharacter.maxDashCharges;
    this.dashChargeIndicator.chargeRegenTime = activeCharacter.dashRegenTime;
    this.dashChargeIndicator.updateChargeTimers(activeCharacter.dashChargeTimers);
  }

  private updateHealthColor(currentHealth: number, maxHealth: number) {
    const healthPercent = currentHealth / maxHealth;
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
