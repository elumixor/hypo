import * as THREE from "three";
import { Helio } from "../characters/Helio";
import { GameConfig } from "../config/GameConfig";
import type { Keyboard } from "../input/Keyboard";

/**
 * Player wrapper class for backwards compatibility
 * Delegates to the current active character (initially Helio)
 * but also includes direct energy and movement systems from main branch
 */
export class Player {
  private currentCharacter: Helio;
  readonly mesh: THREE.Mesh;
  speed = GameConfig.PLAYER.MOVEMENT_SPEED;

  // dash state
  private dashTime = 0;
  private readonly dashDuration = GameConfig.PLAYER.DASH_DURATION;
  private readonly dashCooldown = GameConfig.PLAYER.DASH_COOLDOWN;
  private dashCooldownTimer = 0;

  // shield
  private readonly shieldMesh?: THREE.Mesh;
  shieldActive = false;

  // energy system
  energy: number = GameConfig.PLAYER.MAX_ENERGY;
  readonly maxEnergy: number = GameConfig.PLAYER.MAX_ENERGY;
  private readonly energyRegenRate = GameConfig.PLAYER.ENERGY_REGEN_RATE;
  private readonly shieldEnergyCost = GameConfig.PLAYER.SHIELD_ENERGY_COST;

  constructor(keyboard: Keyboard, yaw: number) {
    // Create character for advanced features
    this.currentCharacter = new Helio(keyboard, yaw);

    // Create direct mesh for immediate compatibility
    const geo = new THREE.BoxGeometry(GameConfig.PLAYER.SIZE, GameConfig.PLAYER.SIZE, GameConfig.PLAYER.SIZE);
    const mat = new THREE.MeshStandardMaterial({
      color: GameConfig.COLORS.PLAYER,
      roughness: 0.4,
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.set(0, GameConfig.PLAYER.HEIGHT_OFFSET, 0);

    // create shield but keep hidden
    const shieldRadius = GameConfig.PLAYER.SHIELD_RADIUS;
    const sgeo = new THREE.SphereGeometry(shieldRadius, 16, 12);
    const smat = new THREE.MeshStandardMaterial({
      color: GameConfig.COLORS.SHIELD,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });
    this.shieldMesh = new THREE.Mesh(sgeo, smat);
    this.shieldMesh.visible = false;
    this.mesh.add(this.shieldMesh);
  }

  get yaw() {
    return this.currentCharacter.currentYaw;
  }

  update(dt: number) {
    // Update character system
    this.currentCharacter.update(dt);

    // Sync mesh position with character (for backwards compatibility)
    this.mesh.position.copy(this.currentCharacter.mesh.position);

    // Update dash timers
    if (this.dashTime > 0) {
      this.dashTime -= dt;
    }
    if (this.dashCooldownTimer > 0) {
      this.dashCooldownTimer -= dt;
    }

    // Update energy system
    this.updateEnergy(dt);
  }

  startDash(): boolean {
    if (this.dashCooldownTimer > 0) return false;
    const dashEnergyCost = GameConfig.PLAYER.DASH_ENERGY_COST;
    if (this.energy < dashEnergyCost) return false; // not enough energy

    this.dashTime = this.dashDuration;
    this.dashCooldownTimer = this.dashCooldown;
    this.energy -= dashEnergyCost;

    // Also trigger character dash
    this.currentCharacter.startDash();

    return true;
  }

  setShield(active: boolean) {
    // Only allow shield activation if we have energy
    if (active && this.energy <= 0) {
      active = false;
    }

    this.shieldActive = active;
    if (this.shieldMesh) this.shieldMesh.visible = active;

    // Also update character shield
    this.currentCharacter.setShield(active);
  }

  private updateEnergy(dt: number) {
    // Energy regeneration (constant rate)
    if (this.energy < this.maxEnergy) {
      this.energy = Math.min(this.maxEnergy, this.energy + this.energyRegenRate * dt);
    }

    // Shield energy consumption
    if (this.shieldActive) {
      this.energy -= this.shieldEnergyCost * dt;
      if (this.energy <= 0) {
        this.energy = 0;
        this.setShield(false); // disable shield when out of energy
      }
    }
  }

  // Method to check if player has enough energy for actions
  hasEnergy(cost: number): boolean {
    return this.energy >= cost;
  }

  // Method to consume energy for skills
  consumeEnergy(cost: number): boolean {
    if (this.energy >= cost) {
      this.energy -= cost;
      return true;
    }
    return false;
  }

  takeDamage(amount: number): number {
    return this.currentCharacter.takeDamage(amount);
  }

  /**
   * Get the current active character
   */
  getCurrentCharacter(): Helio {
    return this.currentCharacter;
  }

  /**
   * Switch to a different character (for future multi-character support)
   */
  switchCharacter(newCharacter: Helio) {
    // Store position and state from current character
    const position = this.currentCharacter.mesh.position.clone();

    // Switch to new character
    this.currentCharacter = newCharacter;
    this.currentCharacter.mesh.position.copy(position);
    this.mesh.position.copy(position);
  }
}
