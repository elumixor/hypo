import type { PassiveTrait } from "./PassiveTrait";
import type { Skill } from "./Skill";

export type CharacterType = "helios" | "kai" | "iris" | "lucy";

export interface CharacterStats {
  attack: number;
  defense: number;
  speed: number;
  health: number;
}

export class Character {
  readonly type: CharacterType;
  readonly name: string;
  readonly description: string;
  readonly baseStats: CharacterStats;
  readonly skills: Skill[] = [];
  readonly passiveTraits: PassiveTrait[] = [];

  // Relationship bonds with other characters
  private readonly relationshipBonds = new Map<CharacterType, number>();

  // Status
  isUnlocked = false;
  isInParty = false;
  currentHealth: number;

  constructor(type: CharacterType, name: string, description: string, baseStats: CharacterStats, isUnlocked = false) {
    this.type = type;
    this.name = name;
    this.description = description;
    this.baseStats = baseStats;
    this.currentHealth = baseStats.health;
    this.isUnlocked = isUnlocked;
  }

  /**
   * Get relationship bond level with another character (0-100)
   */
  getRelationshipBond(character: CharacterType): number {
    return this.relationshipBonds.get(character) ?? 0;
  }

  /**
   * Set relationship bond level with another character
   */
  setRelationshipBond(character: CharacterType, level: number): void {
    const clampedLevel = Math.max(0, Math.min(100, level));
    this.relationshipBonds.set(character, clampedLevel);
    log("Character", `${this.name} bond with ${character}:`, clampedLevel);
  }

  /**
   * Increase relationship bond with another character
   */
  increaseBond(character: CharacterType, amount: number): void {
    const currentBond = this.getRelationshipBond(character);
    this.setRelationshipBond(character, currentBond + amount);
  }

  /**
   * Get all relationship bonds
   */
  getAllBonds(): Map<CharacterType, number> {
    return new Map(this.relationshipBonds);
  }

  /**
   * Get available skills based on relationship levels
   */
  getAvailableSkills(): Skill[] {
    return this.skills.filter((skill) => skill.isUnlocked(this.relationshipBonds));
  }

  /**
   * Get available passive traits based on relationship levels
   */
  getAvailablePassiveTraits(): PassiveTrait[] {
    return this.passiveTraits.filter((trait) => trait.isUnlocked(this.relationshipBonds));
  }

  /**
   * Add a skill to this character
   */
  addSkill(skill: Skill): void {
    this.skills.push(skill);
  }

  /**
   * Add a passive trait to this character
   */
  addPassiveTrait(trait: PassiveTrait): void {
    this.passiveTraits.push(trait);
  }

  /**
   * Unlock this character for use
   */
  unlock(): void {
    this.isUnlocked = true;
    log("Character", `${this.name} unlocked!`);
  }

  /**
   * Add character to party
   */
  joinParty(): void {
    if (!this.isUnlocked) {
      log("Character", `Cannot add ${this.name} to party - not unlocked`);
      return;
    }
    this.isInParty = true;
    log("Character", `${this.name} joined the party!`);
  }

  /**
   * Remove character from party
   */
  leaveParty(): void {
    this.isInParty = false;
    log("Character", `${this.name} left the party`);
  }

  /**
   * Get current effective stats (base stats + passive trait modifiers)
   */
  getEffectiveStats(): CharacterStats {
    const availableTraits = this.getAvailablePassiveTraits();
    let stats = { ...this.baseStats };

    for (const trait of availableTraits) {
      stats = trait.applyToStats(stats);
    }

    return stats;
  }
}
