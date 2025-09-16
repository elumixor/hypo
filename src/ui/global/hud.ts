import "../../utils/globals";
import { Widget } from "@engine";
import { CombatService } from "../../services/combat-service";

export class HUD extends Widget {
  override async init(): Promise<void> {
    await super.init();
    const combat = this.getService(CombatService);
    if (!combat) throw new Error("CombatService not found");
    
    combat.entityDamaged.subscribe(({ amount }: { entity: any; amount: number }) => {
      console.log(`[HUD] Entity took ${amount} damage`);
    });
    
    console.log("[HUD] Active in scene");
  }
}
