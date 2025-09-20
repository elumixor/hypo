/**
 * Character and skill definitions for the 4 playable characters in HYPO
 * Sci-fi/fantasy setting with technology and magic, consciousness merged with AI mecha
 */

export interface UpgradeNode {
  /** Unique identifier for this upgrade */
  id: string;
  /** Display name of the upgrade */
  name: string;
  /** Description of what this upgrade does */
  description: string;
  /** Image/icon identifier for this upgrade */
  image: string;
  /** Free-form data specific to this upgrade */
  data: Record<string, unknown>;
  /** Prerequisites - other upgrade IDs that must be unlocked first */
  prerequisites: string[];
  /** Cost to unlock this upgrade */
  cost: {
    /** Experience points required */
    xp?: number;
    /** Special currency or items required */
    currency?: Record<string, number>;
  };
}

export interface AbilityTree {
  /** Base ability configuration */
  base: {
    name: string;
    description: string;
    cooldown: number; // seconds
    energyCost: number;
    damage?: number;
    range?: number;
    /** Additional ability-specific data */
    data: Record<string, unknown>;
  };
  /** Upgrade nodes for this ability */
  upgrades: UpgradeNode[];
}

export interface CharacterDefinition {
  /** Unique character identifier */
  id: string;
  /** Display name */
  name: string;
  /** Character description and role */
  description: string;
  /** Character archetype/trope */
  archetype: "attacker" | "tank" | "glass_cannon" | "support";
  /** Character portrait/image identifier */
  portrait: string;
  /** Base stats */
  baseStats: {
    health: number;
    energy: number;
    energyRegen: number;
    moveSpeed: number;
    dashDistance: number;
    dashCharges: number;
    dashRegenTime: number;
  };
  /** Abilities */
  abilities: {
    /** Basic/light attack */
    basicAttack: AbilityTree;
    /** Heavy/alternative attack */
    altAttack: AbilityTree;
    /** Block/defensive ability */
    block: AbilityTree;
    /** Dash ability */
    dash: AbilityTree;
    /** Special skill 1 */
    skill1: AbilityTree;
    /** Special skill 2 */
    skill2: AbilityTree;
    /** Special skill 3 */
    skill3: AbilityTree;
    /** Special skill 4 */
    skill4: AbilityTree;
  };
}

/**
 * HELIOS - The Vengeful Guardian (Attacker)
 * A balanced fighter seeking revenge, merged with a versatile combat AI
 */
const helios: CharacterDefinition = {
  id: "helios",
  name: "Helios",
  description:
    "The protagonist seeking revenge against the Empire of Pride. A balanced warrior merged with an adaptive combat AI mecha.",
  archetype: "attacker",
  portrait: "sprites/characters/helios.jpg",
  baseStats: {
    health: 100,
    energy: 50,
    energyRegen: 5,
    moveSpeed: 8,
    dashDistance: 8,
    dashCharges: 2,
    dashRegenTime: 2,
  },
  abilities: {
    basicAttack: {
      base: {
        name: "Plasma Strike",
        description: "Quick plasma energy projectile with moderate damage",
        cooldown: 0.5,
        energyCost: 5,
        damage: 25,
        range: 15,
        data: { projectileSpeed: 20, piercing: false },
      },
      upgrades: [
        {
          id: "helios_basic_1",
          name: "Enhanced Targeting",
          description: "Plasma strikes have 20% increased accuracy and slight homing",
          image: "icons/targeting",
          data: { homingStrength: 0.2, accuracyBonus: 0.2 },
          prerequisites: [],
          cost: { xp: 100 },
        },
        {
          id: "helios_basic_2",
          name: "Plasma Overcharge",
          description: "Basic attacks deal 30% more damage but cost 2 more energy",
          image: "icons/overcharge",
          data: { damageMultiplier: 1.3, energyCostIncrease: 2 },
          prerequisites: ["helios_basic_1"],
          cost: { xp: 200 },
        },
      ],
    },
    altAttack: {
      base: {
        name: "Fusion Cannon",
        description: "Charged heavy shot that pierces through enemies",
        cooldown: 2,
        energyCost: 15,
        damage: 60,
        range: 20,
        data: { chargeTime: 1.2, piercing: true, maxPierceTargets: 3 },
      },
      upgrades: [
        {
          id: "helios_alt_1",
          name: "Rapid Charge",
          description: "Fusion Cannon charges 40% faster",
          image: "icons/rapid_charge",
          data: { chargeTimeMultiplier: 0.6 },
          prerequisites: [],
          cost: { xp: 150 },
        },
      ],
    },
    block: {
      base: {
        name: "Energy Shield",
        description: "Projects an energy barrier that absorbs damage",
        cooldown: 0.1,
        energyCost: 8, // per second while active
        data: { absorptionAmount: 50, duration: 5 },
      },
      upgrades: [
        {
          id: "helios_block_1",
          name: "Reflective Barrier",
          description: "Energy shield reflects 25% of absorbed damage back at attackers",
          image: "icons/reflect",
          data: { reflectPercentage: 0.25 },
          prerequisites: [],
          cost: { xp: 120 },
        },
      ],
    },
    dash: {
      base: {
        name: "Phase Dash",
        description: "Quick teleportation-like movement",
        cooldown: 0, // uses charges instead
        energyCost: 0,
        data: { invulnerabilityFrames: 0.2 },
      },
      upgrades: [
        {
          id: "helios_dash_1",
          name: "Phase Echo",
          description: "Dashing leaves behind a damaging energy trail",
          image: "icons/echo",
          data: { trailDamage: 15, trailDuration: 1 },
          prerequisites: [],
          cost: { xp: 180 },
        },
      ],
    },
    skill1: {
      base: {
        name: "Revenge Protocol",
        description: "Damage increases as health decreases, up to 50% bonus damage at low health",
        cooldown: 0, // passive
        energyCost: 0,
        data: { maxDamageBonus: 0.5, passive: true },
      },
      upgrades: [
        {
          id: "helios_skill1_1",
          name: "Undying Fury",
          description: "Also gain 25% damage reduction when Revenge Protocol is active",
          image: "icons/fury",
          data: { damageReduction: 0.25 },
          prerequisites: [],
          cost: { xp: 300 },
        },
      ],
    },
    skill2: {
      base: {
        name: "Solar Flare",
        description: "Area blast that damages and blinds all nearby enemies",
        cooldown: 8,
        energyCost: 25,
        damage: 45,
        data: { radius: 8, blindDuration: 2.5 },
      },
      upgrades: [
        {
          id: "helios_skill2_1",
          name: "Nuclear Fusion",
          description: "Solar Flare creates burning ground that deals damage over time",
          image: "icons/fusion",
          data: { burnDuration: 5, burnDamage: 10 },
          prerequisites: [],
          cost: { xp: 250 },
        },
      ],
    },
    skill3: {
      base: {
        name: "Adaptive AI",
        description: "AI analyzes enemy patterns, reducing damage from repeated attack types",
        cooldown: 0, // passive
        energyCost: 0,
        data: { maxReduction: 0.4, adaptationRate: 0.1, passive: true },
      },
      upgrades: [
        {
          id: "helios_skill3_1",
          name: "Predictive Matrix",
          description: "Adaptive AI also provides attack speed bonus based on adaptation level",
          image: "icons/matrix",
          data: { attackSpeedBonus: 0.3 },
          prerequisites: [],
          cost: { xp: 350 },
        },
      ],
    },
    skill4: {
      base: {
        name: "Quantum Burst",
        description: "Teleports to target location and unleashes devastating energy explosion",
        cooldown: 15,
        energyCost: 35,
        damage: 120,
        range: 12,
        data: { teleportRange: 15, explosionRadius: 6 },
      },
      upgrades: [
        {
          id: "helios_skill4_1",
          name: "Quantum Echoes",
          description: "Quantum Burst creates 3 smaller explosions around the main blast",
          image: "icons/echoes",
          data: { echoCount: 3, echoDamage: 40, echoRadius: 3 },
          prerequisites: [],
          cost: { xp: 400 },
        },
      ],
    },
  },
};

/**
 * KIRA - The Shadow Assassin (Glass Cannon)
 * High damage, low health, stealth and critical strike focused
 */
const kira: CharacterDefinition = {
  id: "kira",
  name: "Kira",
  description: "A deadly assassin merged with a stealth-specialized AI. High damage but fragile.",
  archetype: "glass_cannon",
  portrait: "sprites/characters/kira.png",
  baseStats: {
    health: 70,
    energy: 60,
    energyRegen: 6,
    moveSpeed: 10,
    dashDistance: 10,
    dashCharges: 3,
    dashRegenTime: 1.5,
  },
  abilities: {
    basicAttack: {
      base: {
        name: "Shadow Blade",
        description: "Fast melee strikes with chance for critical damage",
        cooldown: 0.3,
        energyCost: 3,
        damage: 30,
        range: 3,
        data: { critChance: 0.15, critMultiplier: 2.0 },
      },
      upgrades: [
        {
          id: "kira_basic_1",
          name: "Poison Edge",
          description: "Shadow Blade applies poison that deals damage over time",
          image: "icons/poison",
          data: { poisonDamage: 5, poisonDuration: 3 },
          prerequisites: [],
          cost: { xp: 100 },
        },
      ],
    },
    altAttack: {
      base: {
        name: "Void Strike",
        description: "Teleports behind target enemy for massive backstab damage",
        cooldown: 3,
        energyCost: 20,
        damage: 80,
        range: 8,
        data: { teleportBehind: true, backstabMultiplier: 1.5 },
      },
      upgrades: [
        {
          id: "kira_alt_1",
          name: "Chain Assassination",
          description: "Killing an enemy with Void Strike resets its cooldown",
          image: "icons/chain",
          data: { resetOnKill: true },
          prerequisites: [],
          cost: { xp: 200 },
        },
      ],
    },
    block: {
      base: {
        name: "Shadow Cloak",
        description: "Becomes temporarily invisible and gains damage resistance",
        cooldown: 6,
        energyCost: 15,
        data: { duration: 3, damageReduction: 0.5, invisibility: true },
      },
      upgrades: [
        {
          id: "kira_block_1",
          name: "Shadow Clone",
          description: "Creates a shadow clone that mimics your attacks while cloaked",
          image: "icons/clone",
          data: { cloneDamageMultiplier: 0.5 },
          prerequisites: [],
          cost: { xp: 250 },
        },
      ],
    },
    dash: {
      base: {
        name: "Shadow Step",
        description: "Short-range teleportation that leaves enemies confused",
        cooldown: 0,
        energyCost: 0,
        data: { confuseDuration: 1.5, invulnerabilityFrames: 0.3 },
      },
      upgrades: [
        {
          id: "kira_dash_1",
          name: "Shadow Trail",
          description: "Shadow Step through enemies damages them",
          image: "icons/trail",
          data: { passThroughDamage: 20 },
          prerequisites: [],
          cost: { xp: 150 },
        },
      ],
    },
    skill1: {
      base: {
        name: "Assassinate",
        description: "Next attack deals massive damage and cannot miss",
        cooldown: 10,
        energyCost: 20,
        data: { damageMultiplier: 3.0, guarantee: true },
      },
      upgrades: [
        {
          id: "kira_skill1_1",
          name: "Perfect Kill",
          description: "Assassinate instantly kills enemies below 30% health",
          image: "icons/execution",
          data: { executionThreshold: 0.3 },
          prerequisites: [],
          cost: { xp: 300 },
        },
      ],
    },
    skill2: {
      base: {
        name: "Shadow Clone Jutsu",
        description: "Creates shadow clones that attack nearby enemies",
        cooldown: 12,
        energyCost: 30,
        data: { cloneCount: 3, cloneDuration: 8, cloneDamageMultiplier: 0.4 },
      },
      upgrades: [
        {
          id: "kira_skill2_1",
          name: "Clone Mastery",
          description: "Shadow clones last 50% longer and deal more damage",
          image: "icons/mastery",
          data: { durationMultiplier: 1.5, damageMultiplier: 1.3 },
          prerequisites: [],
          cost: { xp: 280 },
        },
      ],
    },
    skill3: {
      base: {
        name: "Phantom Form",
        description: "Become incorporeal, immune to damage but can still attack",
        cooldown: 18,
        energyCost: 25,
        data: { duration: 4, immuneToPhysical: true },
      },
      upgrades: [
        {
          id: "kira_skill3_1",
          name: "Phantom Strike",
          description: "Attacks while in Phantom Form deal bonus void damage",
          image: "icons/phantom",
          data: { bonusDamage: 25, damageType: "void" },
          prerequisites: [],
          cost: { xp: 350 },
        },
      ],
    },
    skill4: {
      base: {
        name: "Shadow Storm",
        description: "Unleashes a whirlwind of shadow blades in large area",
        cooldown: 20,
        energyCost: 40,
        damage: 35,
        data: { radius: 10, bladCount: 12, duration: 4 },
      },
      upgrades: [
        {
          id: "kira_skill4_1",
          name: "Endless Night",
          description: "Shadow Storm follows you and enemies hit take increased damage from all sources",
          image: "icons/night",
          data: { followPlayer: true, vulnerabilityDebuff: 0.25, debuffDuration: 6 },
          prerequisites: [],
          cost: { xp: 450 },
        },
      ],
    },
  },
};

/**
 * LUCY - The Tech Mystic (Support)
 * Magic-technology hybrid with healing, buffs, and utility
 */
const lucy: CharacterDefinition = {
  id: "lucy",
  name: "Lucy",
  description:
    "A mystic who bridges magic and technology. Supports allies with healing and technological enchantments.",
  archetype: "support",
  portrait: "sprites/characters/lucy.jpg",
  baseStats: {
    health: 80,
    energy: 70,
    energyRegen: 7,
    moveSpeed: 7,
    dashDistance: 6,
    dashCharges: 2,
    dashRegenTime: 2.5,
  },
  abilities: {
    basicAttack: {
      base: {
        name: "Arcane Bolt",
        description: "Magical projectile that homes in on enemies",
        cooldown: 0.8,
        energyCost: 4,
        damage: 20,
        range: 18,
        data: { homing: true, homingStrength: 0.8 },
      },
      upgrades: [
        {
          id: "lucy_basic_1",
          name: "Chain Lightning",
          description: "Arcane Bolt jumps to nearby enemies",
          image: "icons/chain_lightning",
          data: { jumpCount: 2, jumpRange: 5, jumpDamageReduction: 0.7 },
          prerequisites: [],
          cost: { xp: 120 },
        },
      ],
    },
    altAttack: {
      base: {
        name: "Hex Beam",
        description: "Continuous beam that weakens enemy armor and deals sustained damage",
        cooldown: 0.1,
        energyCost: 8, // per second
        damage: 15, // per second
        range: 12,
        data: { armorReduction: 0.3, maxChannelTime: 5 },
      },
      upgrades: [
        {
          id: "lucy_alt_1",
          name: "Drain Life",
          description: "Hex Beam heals you for 50% of damage dealt",
          image: "icons/life_drain",
          data: { lifeStealPercentage: 0.5 },
          prerequisites: [],
          cost: { xp: 180 },
        },
      ],
    },
    block: {
      base: {
        name: "Mana Shield",
        description: "Absorbs damage using energy instead of health",
        cooldown: 0,
        energyCost: 0,
        data: { energyToHealthRatio: 2, maxAbsorption: 100 },
      },
      upgrades: [
        {
          id: "lucy_block_1",
          name: "Feedback Loop",
          description: "Mana Shield reflects damage as magical energy to nearby enemies",
          image: "icons/feedback",
          data: { reflectRadius: 6, reflectDamage: 10 },
          prerequisites: [],
          cost: { xp: 200 },
        },
      ],
    },
    dash: {
      base: {
        name: "Blink",
        description: "Magical teleportation with brief invulnerability",
        cooldown: 0,
        energyCost: 5,
        data: { invulnerabilityFrames: 0.4 },
      },
      upgrades: [
        {
          id: "lucy_dash_1",
          name: "Arcane Rift",
          description: "Blink creates portals that damage enemies passing through",
          image: "icons/rift",
          data: { portalDamage: 25, portalDuration: 3 },
          prerequisites: [],
          cost: { xp: 160 },
        },
      ],
    },
    skill1: {
      base: {
        name: "Heal",
        description: "Restores health to self or ally",
        cooldown: 6,
        energyCost: 20,
        data: { healAmount: 50, range: 8, canTargetAllies: true },
      },
      upgrades: [
        {
          id: "lucy_skill1_1",
          name: "Regeneration",
          description: "Heal also grants health regeneration over time",
          image: "icons/regen",
          data: { regenAmount: 5, regenDuration: 10 },
          prerequisites: [],
          cost: { xp: 250 },
        },
      ],
    },
    skill2: {
      base: {
        name: "Technomancy",
        description: "Buffs ally weapons with magical enhancements",
        cooldown: 15,
        energyCost: 25,
        data: { damageBonus: 0.4, duration: 12, range: 10 },
      },
      upgrades: [
        {
          id: "lucy_skill2_1",
          name: "System Override",
          description: "Technomancy also reduces ability cooldowns",
          image: "icons/override",
          data: { cooldownReduction: 0.3 },
          prerequisites: [],
          cost: { xp: 300 },
        },
      ],
    },
    skill3: {
      base: {
        name: "Sanctuary",
        description: "Creates a magical area that heals allies and damages enemies",
        cooldown: 20,
        energyCost: 35,
        data: { radius: 8, duration: 10, healPerSecond: 8, damagePerSecond: 15 },
      },
      upgrades: [
        {
          id: "lucy_skill3_1",
          name: "Sacred Ground",
          description: "Sanctuary also provides damage reduction to allies inside",
          image: "icons/sacred",
          data: { damageReduction: 0.3 },
          prerequisites: [],
          cost: { xp: 380 },
        },
      ],
    },
    skill4: {
      base: {
        name: "Temporal Rift",
        description: "Slows down time for enemies while speeding up allies",
        cooldown: 25,
        energyCost: 45,
        data: { radius: 12, duration: 8, enemySlowMultiplier: 0.3, allySpeedMultiplier: 1.5 },
      },
      upgrades: [
        {
          id: "lucy_skill4_1",
          name: "Chronos Lock",
          description: "Temporal Rift can completely freeze enemies for a short time",
          image: "icons/chronos",
          data: { freezeChance: 0.3, freezeDuration: 2 },
          prerequisites: [],
          cost: { xp: 500 },
        },
      ],
    },
  },
};

/**
 * DARIUS - The Iron Fortress (Tank)
 * High health, damage mitigation, crowd control focused
 */
const darius: CharacterDefinition = {
  id: "darius",
  name: "Darius",
  description: "A heavily armored defender merged with a fortress AI. Specializes in protection and crowd control.",
  archetype: "tank",
  portrait: "sprites/characters/darius.png",
  baseStats: {
    health: 150,
    energy: 40,
    energyRegen: 4,
    moveSpeed: 6,
    dashDistance: 5,
    dashCharges: 1,
    dashRegenTime: 3,
  },
  abilities: {
    basicAttack: {
      base: {
        name: "Hammer Strike",
        description: "Powerful melee attack that can knock back enemies",
        cooldown: 1.2,
        energyCost: 6,
        damage: 35,
        range: 4,
        data: { knockbackForce: 8, knockbackRadius: 2 },
      },
      upgrades: [
        {
          id: "darius_basic_1",
          name: "Seismic Impact",
          description: "Hammer Strike creates shockwaves that damage nearby enemies",
          image: "icons/seismic",
          data: { shockwaveRadius: 6, shockwaveDamage: 15 },
          prerequisites: [],
          cost: { xp: 110 },
        },
      ],
    },
    altAttack: {
      base: {
        name: "Shield Bash",
        description: "Charges forward with shield, stunning enemies",
        cooldown: 4,
        energyCost: 12,
        damage: 40,
        range: 6,
        data: { chargeDistance: 6, stunDuration: 2, chargeSpeed: 15 },
      },
      upgrades: [
        {
          id: "darius_alt_1",
          name: "Unstoppable Force",
          description: "Shield Bash passes through enemies and gains damage with each hit",
          image: "icons/unstoppable",
          data: { passThroughEnemies: true, damageStackMultiplier: 1.3 },
          prerequisites: [],
          cost: { xp: 190 },
        },
      ],
    },
    block: {
      base: {
        name: "Fortress Stance",
        description: "Reduces movement speed but significantly increases damage resistance",
        cooldown: 0.5,
        energyCost: 5, // per second while active
        data: { damageReduction: 0.6, moveSpeedMultiplier: 0.4 },
      },
      upgrades: [
        {
          id: "darius_block_1",
          name: "Retribution",
          description: "While in Fortress Stance, attackers take damage",
          image: "icons/retribution",
          data: { thornsDamage: 20 },
          prerequisites: [],
          cost: { xp: 170 },
        },
      ],
    },
    dash: {
      base: {
        name: "Ground Slam",
        description: "Jumps and slams down, creating area damage",
        cooldown: 0,
        energyCost: 8,
        damage: 45,
        data: { slamRadius: 5, airTime: 0.8 },
      },
      upgrades: [
        {
          id: "darius_dash_1",
          name: "Earthquake",
          description: "Ground Slam creates lingering damage zones",
          image: "icons/earthquake",
          data: { damageZoneCount: 3, zoneDamage: 10, zoneDuration: 5 },
          prerequisites: [],
          cost: { xp: 220 },
        },
      ],
    },
    skill1: {
      base: {
        name: "Taunt",
        description: "Forces all nearby enemies to attack only you",
        cooldown: 8,
        energyCost: 15,
        data: { radius: 10, duration: 4, damageReductionWhileTaunting: 0.2 },
      },
      upgrades: [
        {
          id: "darius_skill1_1",
          name: "Intimidating Presence",
          description: "Taunted enemies also deal reduced damage",
          image: "icons/intimidate",
          data: { enemyDamageReduction: 0.3 },
          prerequisites: [],
          cost: { xp: 260 },
        },
      ],
    },
    skill2: {
      base: {
        name: "Fortress Wall",
        description: "Creates a wall of energy that blocks enemy projectiles",
        cooldown: 12,
        energyCost: 20,
        data: { wallLength: 8, wallHeight: 4, duration: 8, health: 200 },
      },
      upgrades: [
        {
          id: "darius_skill2_1",
          name: "Reflecting Barrier",
          description: "Fortress Wall reflects projectiles back at enemies",
          image: "icons/reflect_wall",
          data: { reflectChance: 0.8 },
          prerequisites: [],
          cost: { xp: 280 },
        },
      ],
    },
    skill3: {
      base: {
        name: "Armor Plating",
        description: "Temporarily becomes immune to the next few attacks",
        cooldown: 15,
        energyCost: 25,
        data: { immuneAttacks: 5, duration: 10 },
      },
      upgrades: [
        {
          id: "darius_skill3_1",
          name: "Reactive Armor",
          description: "Each blocked attack charges up your next Hammer Strike",
          image: "icons/reactive",
          data: { damageStackPerBlock: 15, maxStacks: 5 },
          prerequisites: [],
          cost: { xp: 320 },
        },
      ],
    },
    skill4: {
      base: {
        name: "Guardian's Wrath",
        description: "Massive area attack that scales with missing health",
        cooldown: 22,
        energyCost: 40,
        damage: 80,
        data: { radius: 12, missingHealthScaling: 2.0 },
      },
      upgrades: [
        {
          id: "darius_skill4_1",
          name: "Phoenix Rising",
          description: "Guardian's Wrath heals you based on enemies hit",
          image: "icons/phoenix",
          data: { healPerEnemy: 25 },
          prerequisites: [],
          cost: { xp: 420 },
        },
      ],
    },
  },
};

/**
 * All character definitions
 */
export const characters: Record<string, CharacterDefinition> = {
  helios,
  kira,
  lucy,
  darius,
};

/**
 * Get character definition by ID
 */
export function getCharacterDefinition(id: string): CharacterDefinition | undefined {
  return characters[id];
}

/**
 * Get all character IDs
 */
export function getCharacterIds(): string[] {
  return Object.keys(characters);
}

/**
 * Get all ability names for a character
 */
export function getAbilityNames(): (keyof CharacterDefinition["abilities"])[] {
  return ["basicAttack", "altAttack", "block", "dash", "skill1", "skill2", "skill3", "skill4"];
}
