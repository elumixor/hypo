import { Character, type CharacterType } from "./Character";
import { CombatMasteryTrait, FortitudeTrait, StrengthBoostTrait, SwiftnessTrait, VitalityTrait } from "./PassiveTrait";
import { HeavyAttackSkill, LightAttackSkill, SpecialSkill } from "./Skill";

export interface InteractionOption {
  id: string;
  text: string;
  bondIncrease: number;
  requirements?: { character: CharacterType; minimumBond: number }[];
}

export interface InteractionResult {
  success: boolean;
  message: string;
  bondChanges: { character: CharacterType; increase: number }[];
  skillsUnlocked?: string[];
  traitsUnlocked?: string[];
}

export class CharacterManager {
  private readonly characters = new Map<CharacterType, Character>();
  private currentActiveCharacter: CharacterType = "helio";
  private readonly partyMembers: CharacterType[] = ["helio"];

  // Interaction state
  private inSafeZone = false;
  private availableForInteraction: CharacterType[] = [];

  constructor() {
    this.initializeCharacters();
    log("CharacterManager", "Character system initialized");
  }

  private initializeCharacters(): void {
    // Initialize Helio (main character - always unlocked)
    const helio = new Character(
      "helio",
      "Helio",
      "The main protagonist seeking revenge against the Empire of Pride",
      { attack: 10, defense: 8, speed: 6, health: 100 },
      true, // unlocked by default
    );

    // Add skills for Helio
    helio.addSkill(new LightAttackSkill());
    helio.addSkill(new HeavyAttackSkill());
    helio.addSkill(new SpecialSkill("solar_burst", "Solar Burst", "Unleash a burst of solar energy", "special1", []));

    // Add base traits for Helio
    helio.addPassiveTrait(new StrengthBoostTrait());

    this.characters.set("helio", helio);

    // Initialize Companion 1
    const companion1 = new Character("companion1", "Zara", "A skilled archer from the world of Envy", {
      attack: 12,
      defense: 6,
      speed: 10,
      health: 80,
    });

    // Companion 1 skills - require bond with Helio
    companion1.addSkill(new LightAttackSkill([{ character: "helio", minimumBond: 20 }]));
    companion1.addSkill(
      new SpecialSkill("piercing_shot", "Piercing Shot", "A shot that pierces through enemies", "special1", [
        { character: "helio", minimumBond: 40 },
      ]),
    );

    companion1.addPassiveTrait(new SwiftnessTrait([{ character: "helio", minimumBond: 30 }]));

    this.characters.set("companion1", companion1);

    // Initialize Companion 2
    const companion2 = new Character("companion2", "Kai", "A defensive warrior from the world of Attachment", {
      attack: 8,
      defense: 14,
      speed: 4,
      health: 120,
    });

    companion2.addSkill(new HeavyAttackSkill([{ character: "helio", minimumBond: 25 }]));
    companion2.addSkill(
      new SpecialSkill("shield_bash", "Shield Bash", "A powerful defensive counter-attack", "special1", [
        { character: "helio", minimumBond: 50 },
      ]),
    );

    companion2.addPassiveTrait(new FortitudeTrait([{ character: "helio", minimumBond: 35 }]));
    companion2.addPassiveTrait(new VitalityTrait([{ character: "helio", minimumBond: 60 }]));

    this.characters.set("companion2", companion2);

    // Initialize Companion 3
    const companion3 = new Character("companion3", "Nova", "A mysterious mage from the world of Greed", {
      attack: 14,
      defense: 5,
      speed: 8,
      health: 70,
    });

    companion3.addSkill(
      new SpecialSkill("arcane_blast", "Arcane Blast", "Powerful magical attack", "special1", [
        { character: "helio", minimumBond: 45 },
      ]),
    );

    companion3.addSkill(
      new SpecialSkill("meteor", "Meteor", "Devastating area attack", "special2", [
        { character: "helio", minimumBond: 70 },
        { character: "companion1", minimumBond: 30 },
      ]),
    );

    companion3.addPassiveTrait(
      new CombatMasteryTrait([
        { character: "helio", minimumBond: 60 },
        { character: "companion2", minimumBond: 40 },
      ]),
    );

    this.characters.set("companion3", companion3);
  }

  /**
   * Get a character by type
   */
  getCharacter(type: CharacterType): Character | undefined {
    return this.characters.get(type);
  }

  /**
   * Get all characters
   */
  getAllCharacters(): Character[] {
    return Array.from(this.characters.values());
  }

  /**
   * Get current active character
   */
  getActiveCharacter(): Character | undefined {
    return this.characters.get(this.currentActiveCharacter);
  }

  /**
   * Get party members
   */
  getPartyMembers(): Character[] {
    return this.partyMembers
      .map((type) => this.characters.get(type))
      .filter((char): char is Character => char !== undefined);
  }

  /**
   * Switch to different character
   */
  switchCharacter(newCharacter: CharacterType): boolean {
    const character = this.characters.get(newCharacter);
    if (!character || !character.isInParty) {
      log("CharacterManager", `Cannot switch to ${newCharacter} - not in party`);
      return false;
    }

    this.currentActiveCharacter = newCharacter;
    log("CharacterManager", `Switched to ${character.name}`);
    return true;
  }

  /**
   * Enter safe zone - enables character interactions
   */
  enterSafeZone(): void {
    this.inSafeZone = true;
    this.availableForInteraction = this.getAllCharacters()
      .filter((char) => char.isUnlocked)
      .map((char) => char.type);

    log("CharacterManager", "Entered safe zone - character interactions available");
  }

  /**
   * Exit safe zone - disables character interactions
   */
  exitSafeZone(): void {
    this.inSafeZone = false;
    this.availableForInteraction = [];
    log("CharacterManager", "Exited safe zone");
  }

  /**
   * Get available characters for interaction in safe zone
   */
  getAvailableForInteraction(): CharacterType[] {
    return [...this.availableForInteraction];
  }
  getInteractionOptions(character: CharacterType): InteractionOption[] {
    if (!this.inSafeZone) {
      return [];
    }

    const targetCharacter = this.characters.get(character);
    if (!targetCharacter || !targetCharacter.isUnlocked) {
      return [];
    }

    const currentChar = this.getActiveCharacter();
    if (!currentChar || currentChar.type === character) {
      return [];
    }

    const currentBond = currentChar.getRelationshipBond(character);
    const options: InteractionOption[] = [];

    // Basic interaction options based on relationship level
    if (currentBond < 20) {
      options.push({
        id: "greet",
        text: `Greet ${targetCharacter.name}`,
        bondIncrease: 5,
      });
    }

    if (currentBond >= 10) {
      options.push({
        id: "chat",
        text: `Have a friendly chat with ${targetCharacter.name}`,
        bondIncrease: 8,
      });
    }

    if (currentBond >= 30) {
      options.push({
        id: "deep_talk",
        text: `Have a deep conversation with ${targetCharacter.name}`,
        bondIncrease: 12,
      });
    }

    if (currentBond >= 50) {
      options.push({
        id: "training",
        text: `Train together with ${targetCharacter.name}`,
        bondIncrease: 15,
      });
    }

    return options;
  }

  /**
   * Interact with another character
   */
  interact(character: CharacterType, optionId: string): InteractionResult {
    if (!this.inSafeZone) {
      return {
        success: false,
        message: "Cannot interact outside of safe zones",
        bondChanges: [],
      };
    }

    const currentChar = this.getActiveCharacter();
    const targetChar = this.characters.get(character);

    if (!currentChar || !targetChar) {
      return {
        success: false,
        message: "Invalid characters for interaction",
        bondChanges: [],
      };
    }

    const options = this.getInteractionOptions(character);
    const selectedOption = options.find((opt) => opt.id === optionId);

    if (!selectedOption) {
      return {
        success: false,
        message: "Invalid interaction option",
        bondChanges: [],
      };
    }

    // Increase bond
    currentChar.increaseBond(character, selectedOption.bondIncrease);

    // Check for newly unlocked skills and traits
    const skillsUnlocked: string[] = [];
    const traitsUnlocked: string[] = [];

    // Check all characters for newly unlocked abilities
    for (const char of this.getAllCharacters()) {
      const availableSkills = char.getAvailableSkills();
      const availableTraits = char.getAvailablePassiveTraits();

      skillsUnlocked.push(...availableSkills.map((skill) => `${char.name}: ${skill.name}`));
      traitsUnlocked.push(...availableTraits.map((trait) => `${char.name}: ${trait.name}`));
    }

    return {
      success: true,
      message: `${selectedOption.text} completed. Bond increased by ${selectedOption.bondIncrease}!`,
      bondChanges: [{ character, increase: selectedOption.bondIncrease }],
      skillsUnlocked: skillsUnlocked.length > 0 ? skillsUnlocked : undefined,
      traitsUnlocked: traitsUnlocked.length > 0 ? traitsUnlocked : undefined,
    };
  }

  /**
   * Unlock a character (when found during gameplay)
   */
  unlockCharacter(character: CharacterType): boolean {
    const char = this.characters.get(character);
    if (!char) {
      return false;
    }

    char.unlock();
    return true;
  }

  /**
   * Add character to party
   */
  addToParty(character: CharacterType): boolean {
    const char = this.characters.get(character);
    if (!char || !char.isUnlocked) {
      return false;
    }

    if (!this.partyMembers.includes(character)) {
      this.partyMembers.push(character);
      char.joinParty();
    }

    return true;
  }

  /**
   * Remove character from party (happens on death)
   */
  removeFromParty(character: CharacterType): boolean {
    const index = this.partyMembers.indexOf(character);
    if (index === -1 || character === "helio") {
      // Helio always stays in party
      return false;
    }

    this.partyMembers.splice(index, 1);
    const char = this.characters.get(character);
    if (char) {
      char.leaveParty();
    }

    // Switch to Helio if we were controlling the removed character
    if (this.currentActiveCharacter === character) {
      this.currentActiveCharacter = "helio";
    }

    return true;
  }

  /**
   * Get character relationship summary
   */
  getRelationshipSummary(character: CharacterType): string {
    const char = this.characters.get(character);
    if (!char) {
      return "Unknown character";
    }

    const bonds = char.getAllBonds();
    const bondTexts: string[] = [];

    for (const [otherChar, level] of bonds) {
      const otherCharObj = this.characters.get(otherChar);
      if (otherCharObj) {
        bondTexts.push(`${otherCharObj.name}: ${level}/100`);
      }
    }

    return `${char.name} - ${bondTexts.join(", ")}`;
  }
}
