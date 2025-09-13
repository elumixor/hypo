import type { CharacterType } from "./Character";

export type SkillType =
  | "light_attack"
  | "heavy_attack"
  | "block"
  | "dodge"
  | "special1"
  | "special2"
  | "special3"
  | "special4";

export interface SkillRequirement {
  character: CharacterType;
  minimumBond: number;
}

export abstract class Skill {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly type: SkillType;
  readonly requirements: SkillRequirement[];

  // Skill progression
  currentLevel = 1;
  maxLevel = 5;

  constructor(id: string, name: string, description: string, type: SkillType, requirements: SkillRequirement[] = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.requirements = requirements;
  }

  /**
   * Check if skill is unlocked based on relationship bonds
   */
  isUnlocked(relationshipBonds: Map<CharacterType, number>): boolean {
    return this.requirements.every((req) => {
      const bondLevel = relationshipBonds.get(req.character) ?? 0;
      return bondLevel >= req.minimumBond;
    });
  }

  /**
   * Check if skill can be leveled up
   */
  canLevelUp(): boolean {
    return this.currentLevel < this.maxLevel;
  }

  /**
   * Level up the skill
   */
  levelUp(): boolean {
    if (!this.canLevelUp()) {
      return false;
    }

    this.currentLevel++;
    log("Skill", `${this.name} leveled up to ${this.currentLevel}!`);
    return true;
  }

  /**
   * Get skill damage/effectiveness multiplier based on level
   */
  getPowerMultiplier(): number {
    return 1 + (this.currentLevel - 1) * 0.2; // 20% increase per level
  }

  /**
   * Execute the skill - to be implemented by subclasses
   */
  abstract execute(context: SkillContext): SkillResult;
}

export interface SkillContext {
  casterPosition: { x: number; y: number; z: number };
  targetPosition?: { x: number; y: number; z: number };
  casterStats: { attack: number; defense: number; speed: number; health: number };
  // Add more context as needed
}

export interface SkillResult {
  damage?: number;
  effects?: string[];
  cooldown?: number;
  success: boolean;
}

// Example skill implementations
export class LightAttackSkill extends Skill {
  constructor(requirements: SkillRequirement[] = []) {
    super("light_attack", "Light Attack", "Quick, basic attack with low damage", "light_attack", requirements);
  }

  execute(context: SkillContext): SkillResult {
    const baseDamage = context.casterStats.attack * 0.8;
    const damage = baseDamage * this.getPowerMultiplier();

    return {
      damage,
      effects: ["fast"],
      cooldown: 0.5,
      success: true,
    };
  }
}

export class HeavyAttackSkill extends Skill {
  constructor(requirements: SkillRequirement[] = []) {
    super(
      "heavy_attack",
      "Heavy Attack",
      "Powerful attack with high damage but slower speed",
      "heavy_attack",
      requirements,
    );
  }

  execute(context: SkillContext): SkillResult {
    const baseDamage = context.casterStats.attack * 1.5;
    const damage = baseDamage * this.getPowerMultiplier();

    return {
      damage,
      effects: ["heavy", "slow"],
      cooldown: 1.2,
      success: true,
    };
  }
}

export class SpecialSkill extends Skill {
  execute(context: SkillContext): SkillResult {
    // Base special skill implementation - can be overridden
    const baseDamage = context.casterStats.attack * 2.0;
    const damage = baseDamage * this.getPowerMultiplier();

    return {
      damage,
      effects: ["special", "area"],
      cooldown: 3.0,
      success: true,
    };
  }
}
