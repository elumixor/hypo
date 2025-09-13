import * as THREE from "three";
import { GameConfig } from "../config/GameConfig";
import type { Keyboard } from "../input/Keyboard";
import { BaseCharacter, type CharacterStats, type SkillTree } from "./BaseCharacter";

/**
 * Helios - The main character
 * A balanced fighter with solar-themed abilities
 */
export class Helios extends BaseCharacter {
  constructor(keyboard: Keyboard, yaw: number) {
    super("helio", "Helios", keyboard, yaw);
  }

  protected createMesh(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const material = new THREE.MeshStandardMaterial({
      color: GameConfig.COLORS.PLAYER,
      roughness: 0.4,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0.4, 0);
    return mesh;
  }

  protected getBaseStats(): CharacterStats {
    return {
      // Base stats
      maxHp: GameConfig.PLAYER.MAX_HP,
      speed: GameConfig.PLAYER.SPEED,
      damage: 2,

      // Combat stats
      attackSpeed: 1.0,
      criticalChance: 0.05, // 5%
      criticalDamage: 1.5,

      // Defense stats
      armor: 0,
      dodgeChance: 0.1, // 10%
      blockEfficiency: 0.5, // 50% damage reduction

      // Special stats
      dashSpeed: GameConfig.PLAYER.DASH_SPEED,
      dashCooldown: GameConfig.PLAYER.DASH_COOLDOWN,
      manaRegen: 10, // mana per second
    };
  }

  protected createSkillTrees(): SkillTree {
    return {
      // Light Attack Tree - Fast, combo-based attacks
      lightAttack: [
        {
          id: "light_combo",
          name: "Light Combo",
          description: "Increases light attack combo potential",
          level: 0,
          maxLevel: 5,
          unlocked: true, // Starting skill
        },
        {
          id: "light_speed",
          name: "Swift Strikes",
          description: "Increases light attack speed",
          level: 0,
          maxLevel: 3,
          unlocked: false,
          prerequisites: ["light_combo"],
        },
        {
          id: "light_crit",
          name: "Precise Strikes",
          description: "Increases critical chance for light attacks",
          level: 0,
          maxLevel: 4,
          unlocked: false,
          prerequisites: ["light_speed"],
        },
      ],

      // Heavy Attack Tree - Powerful, slower attacks
      heavyAttack: [
        {
          id: "heavy_damage",
          name: "Heavy Hitter",
          description: "Increases heavy attack damage",
          level: 0,
          maxLevel: 5,
          unlocked: true, // Starting skill
        },
        {
          id: "heavy_shockwave",
          name: "Shockwave",
          description: "Heavy attacks create area damage",
          level: 0,
          maxLevel: 3,
          unlocked: false,
          prerequisites: ["heavy_damage"],
        },
        {
          id: "heavy_stun",
          name: "Crushing Blow",
          description: "Heavy attacks have chance to stun enemies",
          level: 0,
          maxLevel: 2,
          unlocked: false,
          prerequisites: ["heavy_shockwave"],
        },
      ],

      // Block Tree - Defensive abilities
      block: [
        {
          id: "block_efficiency",
          name: "Shield Mastery",
          description: "Improves block damage reduction",
          level: 0,
          maxLevel: 4,
          unlocked: true, // Starting skill
        },
        {
          id: "block_reflect",
          name: "Reflection",
          description: "Chance to reflect projectiles when blocking",
          level: 0,
          maxLevel: 3,
          unlocked: false,
          prerequisites: ["block_efficiency"],
        },
        {
          id: "block_counter",
          name: "Counter Attack",
          description: "Blocking triggers automatic counter attack",
          level: 0,
          maxLevel: 3,
          unlocked: false,
          prerequisites: ["block_reflect"],
        },
      ],

      // Dodge Tree - Mobility and evasion
      dodge: [
        {
          id: "dodge_distance",
          name: "Extended Dash",
          description: "Increases dash distance",
          level: 0,
          maxLevel: 3,
          unlocked: true, // Starting skill
        },
        {
          id: "dodge_cooldown",
          name: "Quick Recovery",
          description: "Reduces dash cooldown",
          level: 0,
          maxLevel: 4,
          unlocked: false,
          prerequisites: ["dodge_distance"],
        },
        {
          id: "dodge_invuln",
          name: "Phase Dash",
          description: "Brief invulnerability during dash",
          level: 0,
          maxLevel: 1,
          unlocked: false,
          prerequisites: ["dodge_cooldown"],
        },
      ],

      // Unique Skill 1: Solar Flare - Area damage ability
      unique1: [
        {
          id: "solar_flare_base",
          name: "Solar Flare",
          description: "Unleash a burst of solar energy",
          level: 0,
          maxLevel: 1,
          unlocked: false, // Requires character progression
        },
        {
          id: "solar_flare_damage",
          name: "Intense Heat",
          description: "Increases Solar Flare damage",
          level: 0,
          maxLevel: 5,
          unlocked: false,
          prerequisites: ["solar_flare_base"],
        },
        {
          id: "solar_flare_range",
          name: "Expanding Light",
          description: "Increases Solar Flare range",
          level: 0,
          maxLevel: 3,
          unlocked: false,
          prerequisites: ["solar_flare_damage"],
        },
      ],

      // Unique Skill 2: Light Shield - Defensive ability
      unique2: [
        {
          id: "light_shield_base",
          name: "Light Shield",
          description: "Creates a protective barrier of light",
          level: 0,
          maxLevel: 1,
          unlocked: false,
        },
        {
          id: "light_shield_duration",
          name: "Sustained Light",
          description: "Increases Light Shield duration",
          level: 0,
          maxLevel: 4,
          unlocked: false,
          prerequisites: ["light_shield_base"],
        },
        {
          id: "light_shield_healing",
          name: "Healing Light",
          description: "Light Shield slowly heals the user",
          level: 0,
          maxLevel: 3,
          unlocked: false,
          prerequisites: ["light_shield_duration"],
        },
      ],

      // Unique Skill 3: Sunburst - Projectile ability
      unique3: [
        {
          id: "sunburst_base",
          name: "Sunburst",
          description: "Fire multiple projectiles in all directions",
          level: 0,
          maxLevel: 1,
          unlocked: false,
        },
        {
          id: "sunburst_projectiles",
          name: "More Rays",
          description: "Increases number of projectiles",
          level: 0,
          maxLevel: 4,
          unlocked: false,
          prerequisites: ["sunburst_base"],
        },
        {
          id: "sunburst_piercing",
          name: "Piercing Light",
          description: "Sunburst projectiles pierce through enemies",
          level: 0,
          maxLevel: 2,
          unlocked: false,
          prerequisites: ["sunburst_projectiles"],
        },
      ],

      // Unique Skill 4: Solar Wind - Movement/utility ability
      unique4: [
        {
          id: "solar_wind_base",
          name: "Solar Wind",
          description: "Push enemies away and increase movement speed",
          level: 0,
          maxLevel: 1,
          unlocked: false,
        },
        {
          id: "solar_wind_force",
          name: "Stronger Winds",
          description: "Increases push force and speed bonus",
          level: 0,
          maxLevel: 3,
          unlocked: false,
          prerequisites: ["solar_wind_base"],
        },
        {
          id: "solar_wind_damage",
          name: "Burning Winds",
          description: "Solar Wind deals damage to enemies",
          level: 0,
          maxLevel: 4,
          unlocked: false,
          prerequisites: ["solar_wind_force"],
        },
      ],
    };
  }
}
