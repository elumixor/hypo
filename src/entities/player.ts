import "../../utils/globals";
import { Entity } from "../../engine/entity";
import { HealthBehavior } from "../behaviors/health-behavior";
import { MovementBehavior } from "../behaviors/movement-behavior";

export interface PlayerConfig {
  health: number;
  movementSpeed: number;
  dashSpeed?: number;
}

export class Player extends Entity {
  private readonly healthBehavior: HealthBehavior;
  private readonly movementBehavior: MovementBehavior;

  constructor(config: PlayerConfig) {
    super("player"); // Fixed ID for player
    
    this.healthBehavior = new HealthBehavior(config.health);
    this.movementBehavior = new MovementBehavior({
      speed: config.movementSpeed,
      dashSpeed: config.dashSpeed,
    });

    this.addBehavior(this.healthBehavior);
    this.addBehavior(this.movementBehavior);
  }

  protected override onInit(): void {
    super.onInit();
    console.log("[Player] Player entity initialized");
  }

  protected override onEnterScene(): void {
    super.onEnterScene();
    console.log("[Player] Player entered scene");
  }

  // Convenience methods for accessing player-specific functionality
  get health(): number {
    return this.healthBehavior.currentHealth;
  }

  takeDamage(amount: number): void {
    // This will trigger the HealthBehavior's damage handling
    // In a more complex system, this might go through the CombatService
    console.log(`[Player] Taking ${amount} damage`);
  }

  dash(): boolean {
    return this.movementBehavior.dash();
  }

  move(direction: { x: number; y: number; z: number }, dt: number): void {
    this.movementBehavior.move(direction, dt);
  }

  get canDash(): boolean {
    return this.movementBehavior.canDash;
  }
}