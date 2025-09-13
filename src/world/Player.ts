import { Helio } from "../characters/Helio";
import type { Keyboard } from "../input/Keyboard";

/**
 * Player wrapper class for backwards compatibility
 * Delegates to the current active character (initially Helio)
 */
export class Player {
  private currentCharacter: Helio;

  constructor(keyboard: Keyboard, yaw: number) {
    this.currentCharacter = new Helio(keyboard, yaw);
  }

  get mesh() {
    return this.currentCharacter.mesh;
  }

  get speed() {
    return this.currentCharacter.stats.speed;
  }

  get yaw() {
    return this.currentCharacter.currentYaw;
  }

  get shieldActive() {
    return this.currentCharacter.shieldActive;
  }

  update(dt: number) {
    this.currentCharacter.update(dt);
  }

  startDash(): boolean {
    return this.currentCharacter.startDash();
  }

  setShield(active: boolean) {
    this.currentCharacter.setShield(active);
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

    // Dispose of old character resources if needed
    // this.currentCharacter.dispose();

    // Switch to new character
    this.currentCharacter = newCharacter;
    this.currentCharacter.mesh.position.copy(position);
  }
}
