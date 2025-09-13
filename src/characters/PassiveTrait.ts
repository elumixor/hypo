import type { CharacterStats, CharacterType } from "./Character";

export interface TraitRequirement {
  character: CharacterType;
  minimumBond: number;
}

export type StatModifierType = "additive" | "multiplicative";

export interface StatModifier {
  stat: keyof CharacterStats;
  value: number;
  type: StatModifierType;
}

export class PassiveTrait {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly requirements: TraitRequirement[];
  readonly statModifiers: StatModifier[];

  constructor(
    id: string,
    name: string,
    description: string,
    statModifiers: StatModifier[],
    requirements: TraitRequirement[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.statModifiers = statModifiers;
    this.requirements = requirements;
  }

  /**
   * Check if trait is unlocked based on relationship bonds
   */
  isUnlocked(relationshipBonds: Map<CharacterType, number>): boolean {
    return this.requirements.every((req) => {
      const bondLevel = relationshipBonds.get(req.character) ?? 0;
      return bondLevel >= req.minimumBond;
    });
  }

  /**
   * Apply this trait's modifications to character stats
   */
  applyToStats(baseStats: CharacterStats): CharacterStats {
    const modifiedStats = { ...baseStats };

    for (const modifier of this.statModifiers) {
      const currentValue = modifiedStats[modifier.stat];

      if (modifier.type === "additive") {
        modifiedStats[modifier.stat] = currentValue + modifier.value;
      } else if (modifier.type === "multiplicative") {
        modifiedStats[modifier.stat] = currentValue * modifier.value;
      }
    }

    return modifiedStats;
  }
}

// Example passive traits
export class StrengthBoostTrait extends PassiveTrait {
  constructor(requirements: TraitRequirement[] = []) {
    super(
      "strength_boost",
      "Strength Boost",
      "Increases attack power by 20%",
      [{ stat: "attack", value: 1.2, type: "multiplicative" }],
      requirements,
    );
  }
}

export class VitalityTrait extends PassiveTrait {
  constructor(requirements: TraitRequirement[] = []) {
    super(
      "vitality",
      "Vitality",
      "Increases maximum health by 25%",
      [{ stat: "health", value: 1.25, type: "multiplicative" }],
      requirements,
    );
  }
}

export class SwiftnessTrait extends PassiveTrait {
  constructor(requirements: TraitRequirement[] = []) {
    super(
      "swiftness",
      "Swiftness",
      "Increases movement speed by 30%",
      [{ stat: "speed", value: 1.3, type: "multiplicative" }],
      requirements,
    );
  }
}

export class FortitudeTrait extends PassiveTrait {
  constructor(requirements: TraitRequirement[] = []) {
    super(
      "fortitude",
      "Fortitude",
      "Increases defense by 15%",
      [{ stat: "defense", value: 1.15, type: "multiplicative" }],
      requirements,
    );
  }
}

export class CombatMasteryTrait extends PassiveTrait {
  constructor(requirements: TraitRequirement[] = []) {
    super(
      "combat_mastery",
      "Combat Mastery",
      "Increases all combat stats by 10%",
      [
        { stat: "attack", value: 1.1, type: "multiplicative" },
        { stat: "defense", value: 1.1, type: "multiplicative" },
        { stat: "speed", value: 1.1, type: "multiplicative" },
      ],
      requirements,
    );
  }
}
