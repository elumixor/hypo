import "../utils/globals";
import { Behavior } from "../../engine/behavior";

export interface AIConfig {
  aggroRange: number;
  attackRange: number;
  attackCooldown: number;
  movementSpeed: number;
}

export class AIBehavior extends Behavior {
  private readonly config: AIConfig;
  private attackCooldownTime = 0;
  private currentTarget?: string;

  constructor(config: AIConfig) {
    super();
    this.config = config;
  }

  override onInit(): void {
    log("[AIBehavior] AI initialized for entity");
  }

  override onUpdate(dt: number): void {
    if (this.attackCooldownTime > 0) {
      this.attackCooldownTime -= dt;
    }

    this.findTarget();
    this.updateBehavior(dt);
  }

  private findTarget(): void {
    if (!this.currentTarget) {
      const hasTarget = Math.random() < 0.1;
      if (hasTarget) {
        this.currentTarget = "player";
        log(`[AIBehavior] Entity acquired target: ${this.currentTarget}`);
      }
    }
  }

  private updateBehavior(dt: number): void {
    if (!this.currentTarget) return;

    const distanceToTarget = Math.random() * 10;
    if (distanceToTarget > this.config.attackRange) {
      this.moveTowardsTarget(dt);
    } else if (this.attackCooldownTime <= 0) {
      this.attackTarget();
      this.attackCooldownTime = this.config.attackCooldown;
    }
  }

  private moveTowardsTarget(_dt: number): void {
    log(`[AIBehavior] Entity moving towards ${this.currentTarget}`);
  }

  private attackTarget(): void {
    if (!this.currentTarget) return;
    log(`[AIBehavior] Entity attacks ${this.currentTarget}`);
  }
}
