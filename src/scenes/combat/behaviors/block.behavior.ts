import { Behavior } from "@engine";
import type { CombatInputMappingContext } from "../combat-input-mapping.context";

export class BlockBehavior extends Behavior {
  private readonly maxShield = 100;
  private readonly maxEnergy = 50;
  private readonly energyDrainRate = 10; // Energy per second while blocking
  private readonly shieldRegenRate = 20; // Shield per second when not blocking
  
  private currentShield = this.maxShield;
  private currentEnergy = this.maxEnergy;
  private isBlocking = false;

  override get input() {
    return super.input as CombatInputMappingContext;
  }

  override update(dt: number) {
    super.update(dt);

    const blockInput = this.input.blockActive.value;
    
    // Check if we can block (need energy)
    const canBlock = this.currentEnergy > 0;
    this.isBlocking = blockInput && canBlock;

    if (this.isBlocking) {
      // Drain energy while blocking
      this.currentEnergy = Math.max(0, this.currentEnergy - this.energyDrainRate * dt);
      
      console.log(`Blocking! Shield: ${this.currentShield.toFixed(1)}, Energy: ${this.currentEnergy.toFixed(1)}`);
    } else {
      // Regenerate shield when not blocking
      this.currentShield = Math.min(this.maxShield, this.currentShield + this.shieldRegenRate * dt);
    }

    // Always regenerate energy when not blocking (or at a slower rate when blocking)
    if (!this.isBlocking) {
      this.currentEnergy = Math.min(this.maxEnergy, this.currentEnergy + this.energyDrainRate * dt * 0.5); // Regen at half the drain rate
    }
  }

  get blockingActive() {
    return this.isBlocking;
  }

  get shieldPercent() {
    return this.currentShield / this.maxShield;
  }

  get energyPercent() {
    return this.currentEnergy / this.maxEnergy;
  }

  // Method to reduce shield when taking damage while blocking
  absorbDamage(damage: number): number {
    if (!this.isBlocking) return damage; // No blocking, take full damage

    const shieldDamage = Math.min(damage, this.currentShield);
    this.currentShield -= shieldDamage;
    const remainingDamage = damage - shieldDamage;

    console.log(`Absorbed ${shieldDamage} damage with shield. Remaining damage: ${remainingDamage}`);
    
    return remainingDamage;
  }
}