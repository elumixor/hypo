import { Character, type CharacterType } from "./Character";
import { CHARACTERS } from "./CharacterData";

export class SkillSystem {
  private characters: Record<CharacterType, Character> = {} as any;
  private currentCharacter: CharacterType = "helio";
  private skillPoints = 0;
  private unspentLevels = 0; // Track levels that haven't been converted to skill points yet
  
  // Events for UI updates
  public onSkillPointsChange?: (skillPoints: number) => void;
  public onCharacterChange?: (characterId: CharacterType) => void;
  public onSkillUpgrade?: (characterId: CharacterType, skillId: string, newLevel: number) => void;
  public onCharacterUnlock?: (characterId: CharacterType) => void;

  constructor() {
    this.initializeCharacters();
  }

  private initializeCharacters(): void {
    for (const [id, data] of Object.entries(CHARACTERS)) {
      this.characters[id as CharacterType] = new Character(data);
    }
  }

  // Called when player levels up in the main game
  onLevelUp(_newLevel: number): void {
    this.unspentLevels++;
    this.convertLevelsToSkillPoints();
  }

  private convertLevelsToSkillPoints(): void {
    // Convert each level to skill points (maybe 2-3 points per level)
    const pointsPerLevel = 2;
    const newSkillPoints = this.unspentLevels * pointsPerLevel;
    
    if (newSkillPoints > 0) {
      this.skillPoints += newSkillPoints;
      this.unspentLevels = 0;
      this.onSkillPointsChange?.(this.skillPoints);
      log("SkillSystem", "gained skill points", newSkillPoints, "total:", this.skillPoints);
    }
  }

  getCurrentCharacter(): Character {
    return this.characters[this.currentCharacter];
  }

  getCurrentCharacterType(): CharacterType {
    return this.currentCharacter;
  }

  getCharacter(id: CharacterType): Character {
    return this.characters[id];
  }

  getAllCharacters(): Character[] {
    return Object.values(this.characters);
  }

  getUnlockedCharacters(): Character[] {
    return Object.values(this.characters).filter(char => char.skillState.isUnlocked);
  }

  getSkillPoints(): number {
    return this.skillPoints;
  }

  canSwitchCharacter(characterId: CharacterType): boolean {
    return this.characters[characterId].skillState.isUnlocked;
  }

  switchCharacter(characterId: CharacterType): boolean {
    if (!this.canSwitchCharacter(characterId)) {
      log("SkillSystem", "cannot switch to locked character", characterId);
      return false;
    }
    
    this.currentCharacter = characterId;
    this.onCharacterChange?.(characterId);
    log("SkillSystem", "switched to character", characterId);
    return true;
  }

  canUpgradeSkill(characterId: CharacterType, skillId: string): boolean {
    const character = this.characters[characterId];
    if (!character.canUpgradeSkill(skillId)) return false;
    
    const cost = character.getSkillCost(skillId);
    return this.skillPoints >= cost;
  }

  upgradeSkill(characterId: CharacterType, skillId: string): boolean {
    const character = this.characters[characterId];
    
    if (!this.canUpgradeSkill(characterId, skillId)) {
      log("SkillSystem", "cannot upgrade skill", characterId, skillId);
      return false;
    }
    
    const cost = character.getSkillCost(skillId);
    
    if (character.upgradeSkill(skillId)) {
      this.skillPoints -= cost;
      const newLevel = character.getSkillLevel(skillId);
      
      this.onSkillPointsChange?.(this.skillPoints);
      this.onSkillUpgrade?.(characterId, skillId, newLevel);
      
      log("SkillSystem", "upgraded skill", characterId, skillId, "to level", newLevel, "cost:", cost);
      return true;
    }
    
    return false;
  }

  // Called when finding a new character during gameplay
  unlockCharacter(characterId: CharacterType): boolean {
    const character = this.characters[characterId];
    
    if (character.skillState.isUnlocked) {
      log("SkillSystem", "character already unlocked", characterId);
      return false;
    }
    
    // Unlock by setting relation level to 1
    character.increaseRelation();
    
    if (character.skillState.isUnlocked) {
      this.onCharacterUnlock?.(characterId);
      log("SkillSystem", "unlocked character", characterId);
      return true;
    }
    
    return false;
  }

  // Increase relationship with a character (unlocks more unique skills)
  increaseRelation(characterId: CharacterType): void {
    this.characters[characterId].increaseRelation();
    log("SkillSystem", "increased relation with", characterId, "new level:", this.characters[characterId].skillState.relationLevel);
  }

  // Reset entire skill system (called on game restart/death)
  reset(): void {
    log("SkillSystem", "resetting skill system");
    
    // Reset all characters
    for (const character of Object.values(this.characters)) {
      character.reset();
    }
    
    // Reset system state
    this.currentCharacter = "helio";
    this.skillPoints = 0;
    this.unspentLevels = 0;
    
    // Notify UI
    this.onSkillPointsChange?.(this.skillPoints);
    this.onCharacterChange?.(this.currentCharacter);
  }

  // Get all skills for a character with their current state
  getCharacterSkillsWithState(characterId: CharacterType) {
    const character = this.characters[characterId];
    const data = character.data;
    
    const skillsWithState = {
      lightAttack: data.skillTrees.lightAttack.map(skill => ({
        ...skill,
        currentLevel: character.getSkillLevel(skill.id),
        canUpgrade: this.canUpgradeSkill(characterId, skill.id),
        upgradeCost: character.getSkillCost(skill.id),
      })),
      heavyAttack: data.skillTrees.heavyAttack.map(skill => ({
        ...skill,
        currentLevel: character.getSkillLevel(skill.id),
        canUpgrade: this.canUpgradeSkill(characterId, skill.id),
        upgradeCost: character.getSkillCost(skill.id),
      })),
      block: data.skillTrees.block.map(skill => ({
        ...skill,
        currentLevel: character.getSkillLevel(skill.id),
        canUpgrade: this.canUpgradeSkill(characterId, skill.id),
        upgradeCost: character.getSkillCost(skill.id),
      })),
      dodge: data.skillTrees.dodge.map(skill => ({
        ...skill,
        currentLevel: character.getSkillLevel(skill.id),
        canUpgrade: this.canUpgradeSkill(characterId, skill.id),
        upgradeCost: character.getSkillCost(skill.id),
      })),
      unique: data.skillTrees.unique.map(skill => ({
        ...skill,
        currentLevel: character.getSkillLevel(skill.id),
        canUpgrade: this.canUpgradeSkill(characterId, skill.id),
        upgradeCost: character.getSkillCost(skill.id),
      })),
    };
    
    return skillsWithState;
  }
}