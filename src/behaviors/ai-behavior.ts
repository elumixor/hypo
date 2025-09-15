import "../../utils/globals";
import { Behavior } from "../../engine/entity";
import { CombatService } from "../services/combat-service";

export interface AIConfig {
  aggroRange: number;
  attackRange: number;
  attackCooldown: number;
  movementSpeed: number;
}

export class AIBehavior extends Behavior {
  private readonly config: AIConfig;
  private attackCooldownTime = 0;
  private currentTarget?: string; // Entity ID of target

  constructor(config: AIConfig) {
    super();
    this.config = config;
  }

  protected override onInit(): void {
    super.onInit();
    console.log(`[AIBehavior] AI initialized for ${this.entity.id}`);
  }

  protected override onUpdate(dt: number): void {
    super.onUpdate(dt);

    // Update attack cooldown
    if (this.attackCooldownTime > 0) {
      this.attackCooldownTime -= dt;
    }

    // Simple AI logic
    this.updateAI(dt);
  }

  private updateAI(dt: number): void {
    // Find target (in a real implementation, this would query the scene for player/enemies)
    if (!this.currentTarget) {
      this.findTarget();
    }

    if (this.currentTarget) {
      this.moveTowardsTarget(dt);
      this.attemptAttack();
    }
  }

  private findTarget(): void {
    // In a real implementation, this would search for enemies within aggro range
    // For now, just target "player" if it exists
    this.currentTarget = "player";
    console.log(`[AIBehavior] ${this.entity.id} acquired target: ${this.currentTarget}`);
  }

  private moveTowardsTarget(dt: number): void {
    if (!this.currentTarget) return;

    // In a real implementation, this would get actual positions and move towards target
    console.log(`[AIBehavior] ${this.entity.id} moving towards ${this.currentTarget}`);
  }

  private attemptAttack(): void {
    if (!this.currentTarget || this.attackCooldownTime > 0) return;

    // Check if target is in attack range (simplified)
    const inRange = this.isTargetInRange();
    if (inRange) {
      this.attack();
    }
  }

  private isTargetInRange(): boolean {
    // In a real implementation, this would calculate actual distance
    return Math.random() > 0.7; // Simplified: 30% chance to be in range
  }

  private attack(): void {
    if (!this.currentTarget) return;

    const combat = this.getService(CombatService);
    
    // In a real implementation, this would get the actual target entity
    // For now, just simulate an attack
    console.log(`[AIBehavior] ${this.entity.id} attacks ${this.currentTarget}`);
    
    this.attackCooldownTime = this.config.attackCooldown;
  }

  setTarget(targetId: string): void {
    this.currentTarget = targetId;
  }

  clearTarget(): void {
    this.currentTarget = undefined;
  }
}