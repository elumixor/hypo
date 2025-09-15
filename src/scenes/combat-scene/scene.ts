import { Scene } from "../../../engine/scene";
import { HUD } from "../../ui/global/hud";
import { CombatService } from "../../services/combat-service";
import { ProgressionService } from "../../services/progression-service";
import { HealthService } from "../../services/health-service";
import { TimeService } from "../../services/time-service";
import { Enemy } from "../../entities/enemy";
import { Player } from "../../entities/player";

export class CombatScene extends Scene {
  constructor() {
    super("combat");
  }

  protected override onInit(): void {
    super.onInit();
    
    // Add services
    this.addService(new CombatService());
    this.addService(new ProgressionService());
    this.addService(new HealthService(100)); // Player max health
    this.addService(new TimeService());
    
    // Add UI
    this.addWidget(new HUD());
    
    // Add entities
    this.addEntity(new Player({
      health: 100,
      movementSpeed: 4,
      dashSpeed: 8,
    }));
    
    this.addEntity(new Enemy({
      health: 50,
      movementSpeed: 2,
      aggroRange: 8,
    }));
    
    this.addEntity(new Enemy({
      health: 75,
      movementSpeed: 1.5,
      attackCooldown: 2.0,
    }));
  }
}