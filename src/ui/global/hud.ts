import { Widget } from "@engine";
import { CombatService } from "../services/combat-service";

export class HUD extends Widget {
  protected override onInit(): void {
    super.onInit();
    const combat = this.getService(CombatService);
    combat.entityDamaged.subscribe(({ entity, amount }) => {
      if (entity.id === "player") {
        log(`[HUD] Player took ${amount} damage`);
      }
    });
  }

  protected override onEnterScene(): void {
    super.onEnterScene();
    log("[HUD] Active in scene");
  }
}