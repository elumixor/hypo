import "../../utils/globals";
import { Widget } from "../../../engine/widget";
import { CombatService } from "../../services/combat-service";

export class HUD extends Widget {
  protected override onInit(): void {
    super.onInit();
    const combat = this.getService(CombatService);
    combat.entityDamaged.subscribe(({ entity, amount }: { entity: any; amount: number }) => {
      if (entity.id === "player") {
        console.log(`[HUD] Player took ${amount} damage`);
      }
    });
  }

  protected override onEnterScene(): void {
    super.onEnterScene();
    console.log("[HUD] Active in scene");
  }
}