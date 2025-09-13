export type CharacterType = "helio" | "aria" | "zara" | "kai";

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly maxLevel: number;
  readonly baseCost: number; // skill points needed for level 1
  readonly costMultiplier: number; // cost increases by this factor per level
  readonly type: "combat" | "passive" | "utility";
}

export interface SkillTree {
  readonly lightAttack: Skill[];
  readonly heavyAttack: Skill[];
  readonly block: Skill[];
  readonly dodge: Skill[];
  readonly unique: Skill[]; // 4 unique skills per character
}

export interface CharacterData {
  readonly id: CharacterType;
  readonly name: string;
  readonly description: string;
  readonly color: string; // hex color for UI
  readonly skillTrees: SkillTree;
}

// Character skill state (current levels, unlocks, etc)
export interface CharacterSkillState {
  readonly characterId: CharacterType;
  skillLevels: Record<string, number>; // skill id -> current level (make mutable)
  relationLevel: number; // affects skill unlocks (make mutable)
  isUnlocked: boolean; // whether character is available (make mutable)
}

export class Character {
  private _skillState: CharacterSkillState;

  constructor(
    public readonly data: CharacterData,
    initialState?: Partial<CharacterSkillState>
  ) {
    this._skillState = {
      characterId: data.id,
      skillLevels: {},
      relationLevel: data.id === "helio" ? 1 : 0, // Helio starts available
      isUnlocked: data.id === "helio",
      ...initialState,
    };
  }

  get skillState(): CharacterSkillState {
    return { ...this._skillState };
  }

  getSkillLevel(skillId: string): number {
    return this._skillState.skillLevels[skillId] || 0;
  }

  canUpgradeSkill(skillId: string): boolean {
    const skill = this.findSkill(skillId);
    if (!skill) return false;
    
    const currentLevel = this.getSkillLevel(skillId);
    if (currentLevel >= skill.maxLevel) return false;
    
    // Check if character relation level is sufficient
    // For unique skills, need higher relation levels
    const skillTree = this.data.skillTrees;
    const isUniqueSkill = skillTree.unique.some(s => s.id === skillId);
    
    if (isUniqueSkill) {
      const uniqueIndex = skillTree.unique.findIndex(s => s.id === skillId);
      const requiredRelationLevel = uniqueIndex + 1; // Skills unlock at relation 1, 2, 3, 4
      return this._skillState.relationLevel >= requiredRelationLevel;
    }
    
    return this._skillState.isUnlocked;
  }

  getSkillCost(skillId: string): number {
    const skill = this.findSkill(skillId);
    if (!skill) return 0;
    
    const currentLevel = this.getSkillLevel(skillId);
    return Math.floor(skill.baseCost * Math.pow(skill.costMultiplier, currentLevel));
  }

  upgradeSkill(skillId: string): boolean {
    if (!this.canUpgradeSkill(skillId)) return false;
    
    const currentLevel = this.getSkillLevel(skillId);
    this._skillState.skillLevels[skillId] = currentLevel + 1;
    return true;
  }

  increaseRelation(): void {
    this._skillState.relationLevel = Math.min(4, this._skillState.relationLevel + 1);
    if (this._skillState.relationLevel >= 1 && !this._skillState.isUnlocked) {
      this._skillState.isUnlocked = true;
    }
  }

  reset(): void {
    const wasHelio = this.data.id === "helio";
    this._skillState = {
      characterId: this.data.id,
      skillLevels: {},
      relationLevel: wasHelio ? 1 : 0,
      isUnlocked: wasHelio,
    };
  }

  private findSkill(skillId: string): Skill | undefined {
    const trees = this.data.skillTrees;
    const allSkills = [
      ...trees.lightAttack,
      ...trees.heavyAttack,
      ...trees.block,
      ...trees.dodge,
      ...trees.unique,
    ];
    return allSkills.find(skill => skill.id === skillId);
  }
}