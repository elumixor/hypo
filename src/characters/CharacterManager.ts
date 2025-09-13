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
  private currentActiveCharacter: CharacterType = "helios";
  private readonly partyMembers: CharacterType[] = ["helios"];

  // Interaction state
  private inSafeZone = false;
  private availableForInteraction: CharacterType[] = [];

  constructor() {
    this.initializeCharacters();
    log("CharacterManager", "Character system initialized");
  }

  private initializeCharacters(): void {
    // Initialize Helios (main character - always unlocked)
    const helios = new Character(
      "helios",
      "Helios",
      "The main protagonist seeking revenge against the Empire of Pride",
      { attack: 10, defense: 8, speed: 6, health: 100 },
      true, // unlocked by default
    );

    // Add skills for Helios
    helios.addSkill(new LightAttackSkill());
    helios.addSkill(new HeavyAttackSkill());
    helios.addSkill(new SpecialSkill("solar_burst", "Solar Burst", "Unleash a burst of solar energy", "special1", []));

    // Add base traits for Helios
    helios.addPassiveTrait(new StrengthBoostTrait());

    this.characters.set("helios", helios);

    // Initialize Companion 1 - Kai
    const kai = new Character("kai", "Kai", "A skilled archer from the world of Envy", {
      attack: 12,
      defense: 6,
      speed: 10,
      health: 80,
    });

    // Kai skills - require bond with Helios
    kai.addSkill(new LightAttackSkill([{ character: "helios", minimumBond: 20 }]));
    kai.addSkill(
      new SpecialSkill("piercing_shot", "Piercing Shot", "A shot that pierces through enemies", "special1", [
        { character: "helios", minimumBond: 40 },
      ]),
    );

    kai.addPassiveTrait(new SwiftnessTrait([{ character: "helios", minimumBond: 30 }]));

    this.characters.set("kai", kai);

    // Initialize Companion 2 - Iris
    const iris = new Character("iris", "Iris", "A defensive warrior from the world of Attachment", {
      attack: 8,
      defense: 14,
      speed: 4,
      health: 120,
    });

    iris.addSkill(new HeavyAttackSkill([{ character: "helios", minimumBond: 25 }]));
    iris.addSkill(
      new SpecialSkill("shield_bash", "Shield Bash", "A powerful defensive counter-attack", "special1", [
        { character: "helios", minimumBond: 50 },
      ]),
    );

    iris.addPassiveTrait(new FortitudeTrait([{ character: "helios", minimumBond: 35 }]));
    iris.addPassiveTrait(new VitalityTrait([{ character: "helios", minimumBond: 60 }]));

    this.characters.set("iris", iris);

    // Initialize Companion 3 - Lucy
    const lucy = new Character("lucy", "Lucy", "A mysterious mage from the world of Greed", {
      attack: 14,
      defense: 5,
      speed: 8,
      health: 70,
    });

    lucy.addSkill(
      new SpecialSkill("arcane_blast", "Arcane Blast", "Powerful magical attack", "special1", [
        { character: "helios", minimumBond: 45 },
      ]),
    );

    lucy.addSkill(
      new SpecialSkill("meteor", "Meteor", "Devastating area attack", "special2", [
        { character: "helios", minimumBond: 70 },
        { character: "kai", minimumBond: 30 },
      ]),
    );

    lucy.addPassiveTrait(
      new CombatMasteryTrait([
        { character: "helios", minimumBond: 60 },
        { character: "iris", minimumBond: 40 },
      ]),
    );

    this.characters.set("lucy", lucy);
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
    if (index === -1 || character === "helios") {
      // Helios always stays in party
      return false;
    }

    this.partyMembers.splice(index, 1);
    const char = this.characters.get(character);
    if (char) {
      char.leaveParty();
    }

    // Switch to Helios if we were controlling the removed character
    if (this.currentActiveCharacter === character) {
      this.currentActiveCharacter = "helios";
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
