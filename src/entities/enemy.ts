import "../../utils/globals";
import { Entity } from "../../engine/entity";
import { HealthBehavior } from "../behaviors/health-behavior";
import { AIBehavior } from "../behaviors/ai-behavior";
import { MovementBehavior } from "../behaviors/movement-behavior";

export interface EnemyConfig {
  health?: number;
  movementSpeed?: number;
  aggroRange?: number;
  attackRange?: number;
  attackCooldown?: number;
}

export class Enemy extends Entity {
  constructor(config: EnemyConfig = {}) {
    super();
    
    // Add behaviors with default configs
    this.addBehavior(new HealthBehavior(config.health ?? 100));
    this.addBehavior(new MovementBehavior({
      speed: config.movementSpeed ?? 2,
    }));
    this.addBehavior(new AIBehavior({
      aggroRange: config.aggroRange ?? 10,
      attackRange: config.attackRange ?? 2,
      attackCooldown: config.attackCooldown ?? 1.5,
      movementSpeed: config.movementSpeed ?? 2,
    }));
  }

  protected override onInit(): void {
    super.onInit();
    console.log(`[Enemy] Enemy ${this.id} initialized`);
  }

  protected override onEnterScene(): void {
    super.onEnterScene();
    console.log(`[Enemy] Enemy ${this.id} entered scene`);
  }
}