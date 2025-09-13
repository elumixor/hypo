import * as THREE from "three";
import { GameConfig } from "../config/GameConfig";
import type { Keyboard } from "../input/Keyboard";

/**
 * Base skill tree structure for characters
 */
export interface SkillNode {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  prerequisites?: string[];
}

export interface SkillTree {
  lightAttack: SkillNode[];
  heavyAttack: SkillNode[];
  block: SkillNode[];
  dodge: SkillNode[];
  unique1: SkillNode[];
  unique2: SkillNode[];
  unique3: SkillNode[];
  unique4: SkillNode[];
}

/**
 * Character stats that can be modified by skills
 */
export interface CharacterStats {
  // Base stats
  maxHp: number;
  speed: number;
  damage: number;
  
  // Combat stats
  attackSpeed: number;
  criticalChance: number;
  criticalDamage: number;
  
  // Defense stats
  armor: number;
  dodgeChance: number;
  blockEfficiency: number;
  
  // Special stats
  dashSpeed: number;
  dashCooldown: number;
  manaRegen: number;
}

/**
 * Base character class that all playable characters extend
 */
export abstract class BaseCharacter {
  readonly id: string;
  readonly name: string;
  readonly mesh: THREE.Mesh;
  protected shieldMesh?: THREE.Mesh;
  protected yaw: number;
  
  // Character state
  hp: number;
  mana: number;
  level: number = 1;
  experience: number = 0;
  
  // Combat state
  shieldActive = false;
  private dashTime = 0;
  private dashCooldownTimer = 0;
  
  // Character progression
  readonly skillTrees: SkillTree;
  readonly baseStats: CharacterStats;
  private modifiedStats: CharacterStats;

  constructor(
    id: string,
    name: string, 
    protected keyboard: Keyboard,
    yaw: number,
  ) {
    this.id = id;
    this.name = name;
    this.yaw = yaw;
    this.mesh = this.createMesh();
    this.shieldMesh = this.createShieldMesh();
    this.skillTrees = this.createSkillTrees();
    this.baseStats = this.getBaseStats();
    this.modifiedStats = { ...this.baseStats };
    this.hp = this.baseStats.maxHp;
    this.mana = 100; // Default mana
  }

  /**
   * Create the 3D mesh for this character (to be implemented by subclasses)
   */
  protected abstract createMesh(): THREE.Mesh;

  /**
   * Get base stats for this character type
   */
  protected abstract getBaseStats(): CharacterStats;

  /**
   * Create skill trees specific to this character
   */
  protected abstract createSkillTrees(): SkillTree;

  /**
   * Create shield mesh for blocking
   */
  protected createShieldMesh(): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(1.1, 16, 12);
    const material = new THREE.MeshStandardMaterial({ 
      color: GameConfig.COLORS.PLAYER_SHIELD, 
      transparent: true, 
      opacity: 0.25, 
      depthWrite: false 
    });
    const shield = new THREE.Mesh(geometry, material);
    shield.visible = false;
    this.mesh.add(shield);
    return shield;
  }

  /**
   * Get current stats (base stats modified by skills and equipment)
   */
  get stats(): Readonly<CharacterStats> {
    return { ...this.modifiedStats };
  }

  /**
   * Get current yaw rotation
   */
  get currentYaw(): number {
    return this.yaw;
  }

  /**
   * Update character logic
   */
  update(dt: number): void {
    this.updateMovement(dt);
    this.updateCombat(dt);
    this.updateSkillEffects();
  }

  /**
   * Handle character movement
   */
  protected updateMovement(dt: number): void {
    const forward = new THREE.Vector3(-Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    const right = new THREE.Vector3(-forward.z, 0, forward.x);
    const move = new THREE.Vector3();
    
    const k = this.keyboard;
    if (k.has("w") || k.has("arrowup")) move.add(forward);
    if (k.has("s") || k.has("arrowdown")) move.sub(forward);
    if (k.has("a") || k.has("arrowleft")) move.sub(right);
    if (k.has("d") || k.has("arrowright")) move.add(right);

    // Update dash timers
    if (this.dashTime > 0) this.dashTime -= dt;
    if (this.dashCooldownTimer > 0) this.dashCooldownTimer -= dt;

    const currentSpeed = this.dashTime > 0 ? this.modifiedStats.dashSpeed : this.modifiedStats.speed;
    if (move.lengthSq() > 0) {
      this.mesh.position.add(move.normalize().multiplyScalar(currentSpeed * dt));
    }
  }

  /**
   * Update combat-related systems
   */
  protected updateCombat(dt: number): void {
    // Mana regeneration
    this.mana = Math.min(100, this.mana + this.modifiedStats.manaRegen * dt);
  }

  /**
   * Update stats based on active skill effects
   */
  protected updateSkillEffects(): void {
    // Reset to base stats
    this.modifiedStats = { ...this.baseStats };
    
    // Apply skill modifiers
    // This would iterate through active skills and apply their effects
    // Implementation depends on specific skill system design
  }

  /**
   * Attempt to dash
   */
  startDash(): boolean {
    if (this.dashCooldownTimer > 0) return false;
    
    this.dashTime = GameConfig.PLAYER.DASH_DURATION;
    this.dashCooldownTimer = this.modifiedStats.dashCooldown;
    return true;
  }

  /**
   * Set shield state
   */
  setShield(active: boolean): void {
    this.shieldActive = active;
    if (this.shieldMesh) {
      this.shieldMesh.visible = active;
    }
  }

  /**
   * Take damage
   */
  takeDamage(amount: number): number {
    // Apply armor reduction
    const actualDamage = Math.max(1, amount - this.modifiedStats.armor);
    this.hp = Math.max(0, this.hp - actualDamage);
    return actualDamage;
  }

  /**
   * Heal the character
   */
  heal(amount: number): number {
    const oldHp = this.hp;
    this.hp = Math.min(this.modifiedStats.maxHp, this.hp + amount);
    return this.hp - oldHp;
  }

  /**
   * Use mana
   */
  useMana(amount: number): boolean {
    if (this.mana >= amount) {
      this.mana -= amount;
      return true;
    }
    return false;
  }

  /**
   * Level up a skill
   */
  levelUpSkill(treeType: keyof SkillTree, skillId: string): boolean {
    const tree = this.skillTrees[treeType];
    const skill = tree.find(s => s.id === skillId);
    
    if (!skill || !skill.unlocked || skill.level >= skill.maxLevel) {
      return false;
    }

    skill.level += 1;
    this.updateSkillEffects(); // Recalculate stats
    return true;
  }

  /**
   * Unlock a skill if prerequisites are met
   */
  unlockSkill(treeType: keyof SkillTree, skillId: string): boolean {
    const tree = this.skillTrees[treeType];
    const skill = tree.find(s => s.id === skillId);
    
    if (!skill || skill.unlocked) return false;

    // Check prerequisites
    if (skill.prerequisites) {
      const allPrereqsMet = skill.prerequisites.every(prereqId => {
        const prereq = tree.find(s => s.id === prereqId);
        return prereq && prereq.unlocked && prereq.level > 0;
      });
      
      if (!allPrereqsMet) return false;
    }

    skill.unlocked = true;
    return true;
  }

  /**
   * Get all unlocked skills from a specific tree
   */
  getUnlockedSkills(treeType: keyof SkillTree): SkillNode[] {
    return this.skillTrees[treeType].filter(skill => skill.unlocked);
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    if (this.mesh.geometry) this.mesh.geometry.dispose();
    if (this.mesh.material) {
      if (Array.isArray(this.mesh.material)) {
        this.mesh.material.forEach(mat => mat.dispose());
      } else {
        this.mesh.material.dispose();
      }
    }
    
    if (this.shieldMesh) {
      if (this.shieldMesh.geometry) this.shieldMesh.geometry.dispose();
      if (this.shieldMesh.material) {
        (this.shieldMesh.material as THREE.Material).dispose();
      }
    }
  }
}