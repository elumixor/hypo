import { Scene } from "@engine";
import { HUD } from "../../ui/global/hud";
import { CombatService } from "../../services/combat-service";
import { Enemy } from "../../entities/enemy";

export class CombatScene extends Scene {
  private hud!: HUD;

  constructor() {
    super("combat");
  }

  protected override onInit(): void {
    super.onInit();
    this.addService(new CombatService());
    this.hud = this.addWidget(new HUD());
    this.addEntity(new Enemy());
  }
}