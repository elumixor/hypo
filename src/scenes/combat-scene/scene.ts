import { Scene } from "../../../engine/scene";
import { HUD } from "../../ui/global/hud";
import { CombatService } from "../../services/combat-service";
import { Enemy } from "../../entities/enemy";

export class CombatScene extends Scene {
  constructor() {
    super("combat");
  }

  protected override onInit(): void {
    super.onInit();
    this.addService(new CombatService());
    this.addWidget(new HUD());
    this.addEntity(new Enemy());
  }
}