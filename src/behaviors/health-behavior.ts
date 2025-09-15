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

  protected override onInit(): void {
    super.onInit();
    const combat = this.getService(CombatService);
    combat.entityDamaged.subscribe(({ entity, amount }) => {
      if (entity === this.entity) {
        this.health -= amount;
        log(`[HealthBehavior] ${entity.id} took ${amount}, remaining ${this.health}`);
        if (this.health <= 0) {
          this.entity.destroy();
        }
      }
    });
  }
}