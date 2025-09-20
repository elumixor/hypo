import { EventEmitter } from "@elumixor/event-emitter";
import { Service } from "@engine";
import {
  type CharacterDefinition,
  getAbilityNames,
  getCharacterDefinition,
  getCharacterIds,
} from "data/character-definitions";
import { GameStateService } from "systems/game-state";

/**
 * Represents the current status of a character
 */
export type CharacterStatus = "not_met" | "met" | "in_party";

/**
 * Character progression state for a specific character
 */
export interface CharacterProgressionState {
  /** Current status of this character */
  status: CharacterStatus;
  /** Which skills (1-4) are unlocked for this character */
  unlockedSkills: Set<string>; // skill1, skill2, skill3, skill4
  /** Which upgrades have been unlocked for each ability */
  unlockedUpgrades: Record<string, Set<string>>; // abilityName -> Set<upgradeId>
}

/**
 * Events emitted by CharacterStatusService
 */
export interface CharacterMetEvent {
  characterId: string;
  character: CharacterDefinition;
}

export interface CharacterPartyChangedEvent {
  characterId: string;
  inParty: boolean;
}

export interface SkillUnlockedEvent {
  characterId: string;
  skillName: string;
}

export interface UpgradeUnlockedEvent {
  characterId: string;
  abilityName: string;
  upgradeId: string;
}

/**
 * Service that tracks the status of characters, skills, and upgrades
 * Manages which characters are met/in party, which skills are unlocked, upgrade status
 */
export class CharacterStatusService extends Service {
  // Events
  readonly characterMet = new EventEmitter<CharacterMetEvent>();
  readonly characterPartyChanged = new EventEmitter<CharacterPartyChangedEvent>();
  readonly skillUnlocked = new EventEmitter<SkillUnlockedEvent>();
  readonly upgradeUnlocked = new EventEmitter<UpgradeUnlockedEvent>();

  private readonly gameStateService = this.require(GameStateService);
  private readonly characterProgression = new Map<string, CharacterProgressionState>();
  private readonly partyMembers = new Set<string>();

  override async init() {
    await super.init();
    this.initializeFromSave();
  }

  /**
   * Initialize character progression from saved data or create default state
   */
  private initializeFromSave() {
    const savedData = this.gameStateService.state?.characterStatus;

    // Initialize all characters with default progression state
    for (const characterId of getCharacterIds()) {
      const savedCharacter = savedData?.characters?.[characterId];

      this.characterProgression.set(characterId, {
        status: savedCharacter?.status ?? (characterId === "helios" ? "in_party" : "not_met"),
        unlockedSkills: new Set(savedCharacter?.unlockedSkills ?? []),
        unlockedUpgrades: this.initializeUpgrades(characterId, savedCharacter?.unlockedUpgrades),
      });
    }

    // Initialize party members
    if (savedData?.partyMembers) {
      for (const characterId of savedData.partyMembers) {
        this.partyMembers.add(characterId);
      }
    } else {
      // Default: Helios starts in party
      this.partyMembers.add("helios");
    }
  }

  private initializeUpgrades(
    _characterId: string,
    savedUpgrades?: Record<string, string[]>,
  ): Record<string, Set<string>> {
    const result: Record<string, Set<string>> = {};
    const abilityNames = getAbilityNames();

    for (const abilityName of abilityNames) {
      result[abilityName] = new Set(savedUpgrades?.[abilityName] ?? []);
    }

    return result;
  }

  /**
   * Get the current status of a character
   */
  getCharacterStatus(characterId: string): CharacterStatus {
    return this.characterProgression.get(characterId)?.status ?? "not_met";
  }

  /**
   * Get all characters by their status
   */
  getCharactersByStatus(status: CharacterStatus): string[] {
    return Array.from(this.characterProgression.entries())
      .filter(([_, progression]) => progression.status === status)
      .map(([characterId]) => characterId);
  }

  /**
   * Get current party members
   */
  getPartyMembers(): string[] {
    return Array.from(this.partyMembers);
  }

  /**
   * Check if a character is in the party
   */
  isInParty(characterId: string): boolean {
    return this.partyMembers.has(characterId);
  }

  /**
   * Get characters that are met but not in party
   */
  getAvailableCharacters(): string[] {
    return this.getCharactersByStatus("met").filter((id) => !this.isInParty(id));
  }

  /**
   * Check if a skill is unlocked for a character
   */
  isSkillUnlocked(characterId: string, skillName: string): boolean {
    const progression = this.characterProgression.get(characterId);
    return progression?.unlockedSkills.has(skillName) ?? false;
  }

  /**
   * Get all unlocked skills for a character
   */
  getUnlockedSkills(characterId: string): string[] {
    const progression = this.characterProgression.get(characterId);
    return progression ? Array.from(progression.unlockedSkills) : [];
  }

  /**
   * Check if an upgrade is unlocked for a character's ability
   */
  isUpgradeUnlocked(characterId: string, abilityName: string, upgradeId: string): boolean {
    const progression = this.characterProgression.get(characterId);
    return progression?.unlockedUpgrades[abilityName]?.has(upgradeId) ?? false;
  }

  /**
   * Get all unlocked upgrades for a character's ability
   */
  getUnlockedUpgrades(characterId: string, abilityName: string): string[] {
    const progression = this.characterProgression.get(characterId);
    const upgrades = progression?.unlockedUpgrades[abilityName];
    return upgrades ? Array.from(upgrades) : [];
  }

  /**
   * Mark a character as met
   */
  markCharacterMet(characterId: string) {
    const progression = this.characterProgression.get(characterId);
    if (!progression) return;

    if (progression.status === "not_met") {
      progression.status = "met";
      this.saveProgression();

      const character = getCharacterDefinition(characterId);
      if (character) {
        this.characterMet.emit({ characterId, character });
      }
    }
  }

  /**
   * Add a character to the party
   */
  addToParty(characterId: string) {
    const progression = this.characterProgression.get(characterId);
    if (!progression || progression.status === "not_met") return;

    if (!this.partyMembers.has(characterId)) {
      this.partyMembers.add(characterId);
      progression.status = "in_party";
      this.saveProgression();

      this.characterPartyChanged.emit({ characterId, inParty: true });
    }
  }

  /**
   * Remove a character from the party (but keep them as met)
   */
  removeFromParty(characterId: string) {
    if (characterId === "helios") return; // Helios cannot be removed from party

    const progression = this.characterProgression.get(characterId);
    if (!progression || !this.partyMembers.has(characterId)) return;

    this.partyMembers.delete(characterId);
    progression.status = "met";
    this.saveProgression();

    this.characterPartyChanged.emit({ characterId, inParty: false });
  }

  /**
   * Unlock a skill for a character
   */
  unlockSkill(characterId: string, skillName: string) {
    const progression = this.characterProgression.get(characterId);
    if (!progression || progression.status === "not_met") return;

    if (!progression.unlockedSkills.has(skillName)) {
      progression.unlockedSkills.add(skillName);
      this.saveProgression();

      this.skillUnlocked.emit({ characterId, skillName });
    }
  }

  /**
   * Unlock an upgrade for a character's ability
   * Also validates prerequisites before unlocking
   */
  unlockUpgrade(characterId: string, abilityName: string, upgradeId: string): boolean {
    const progression = this.characterProgression.get(characterId);
    if (!progression || progression.status === "not_met") return false;

    const character = getCharacterDefinition(characterId);
    if (!character) return false;

    const ability = character.abilities[abilityName as keyof typeof character.abilities];
    if (!ability) return false;

    const upgrade = ability.upgrades.find((u) => u.id === upgradeId);
    if (!upgrade) return false;

    // Check if already unlocked
    if (progression.unlockedUpgrades[abilityName]?.has(upgradeId)) {
      return false;
    }

    // Check prerequisites
    for (const prerequisiteId of upgrade.prerequisites) {
      if (!progression.unlockedUpgrades[abilityName]?.has(prerequisiteId)) {
        return false; // Prerequisite not met
      }
    }

    // Unlock the upgrade
    if (!progression.unlockedUpgrades[abilityName]) {
      progression.unlockedUpgrades[abilityName] = new Set();
    }
    progression.unlockedUpgrades[abilityName].add(upgradeId);

    this.saveProgression();
    this.upgradeUnlocked.emit({ characterId, abilityName, upgradeId });

    return true;
  }

  /**
   * Handle blueprint found - unlocks specific upgrade
   */
  blueprintFound(characterId: string, abilityName: string, upgradeId: string) {
    this.unlockUpgrade(characterId, abilityName, upgradeId);
  }

  /**
   * Reset all character progression (for new game)
   */
  resetProgression() {
    this.characterProgression.clear();
    this.partyMembers.clear();

    // Initialize with defaults
    for (const characterId of getCharacterIds()) {
      this.characterProgression.set(characterId, {
        status: characterId === "helios" ? "in_party" : "not_met",
        unlockedSkills: new Set(),
        unlockedUpgrades: this.initializeUpgrades(characterId),
      });
    }

    this.partyMembers.add("helios");
    this.saveProgression();
  }

  /**
   * Save current progression state
   */
  private saveProgression() {
    if (!this.gameStateService) return;

    const charactersData: Record<
      string,
      {
        status: CharacterStatus;
        unlockedSkills: string[];
        unlockedUpgrades: Record<string, string[]>;
      }
    > = {};

    for (const [characterId, progression] of this.characterProgression) {
      const unlockedUpgrades: Record<string, string[]> = {};
      for (const [abilityName, upgrades] of Object.entries(progression.unlockedUpgrades)) {
        unlockedUpgrades[abilityName] = Array.from(upgrades);
      }

      charactersData[characterId] = {
        status: progression.status,
        unlockedSkills: Array.from(progression.unlockedSkills),
        unlockedUpgrades,
      };
    }

    this.gameStateService.saveCharacterStatus({
      characters: charactersData,
      partyMembers: Array.from(this.partyMembers),
    });
  }
}
