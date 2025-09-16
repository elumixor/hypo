import "../utils/globals";
import { Behavior } from "@engine";
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
    log(`[HealthBehavior] Entity took ${amount} damage, health: ${this.health}`);
  }

  override async init(): Promise<void> {
    await super.init();
    const combat = this.getService(CombatService);
    if (!combat) throw new Error("CombatService not found");
    
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
