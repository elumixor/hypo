import "../utils/globals";
import { Behavior } from "../../engine/entity";
import { CombatService } from "../services/combat-service";

export class HealthBehavior extends Behavior {
  private health: number;

  constructor(readonly initialHealth: number) {
    super();
    this.health = initialHealth;
  }

  get currentHealth(): number {
    return this.health;
  }

  takeDamage(amount: number): void {
    this.health -= amount;
    console.log(`[HealthBehavior] ${this.entity.id} took ${amount} damage, health: ${this.health}`);
  }

  protected override onInit(): void {
    super.onInit();
    const combat = this.getService(CombatService);
    combat.entityDamaged.subscribe(({ entity, amount }: { entity: any; amount: number }) => {
      if (entity === this.entity) {
        this.takeDamage(amount);
        if (this.health <= 0) {
          this.entity.destroy();
        }
      }
    });
  }
}