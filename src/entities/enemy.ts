import { Entity } from "../../engine/entity";
import { HealthBehavior } from "../behaviors/health-behavior";

export class Enemy extends Entity {
  constructor() {
    super();
    this.addBehavior(new HealthBehavior(100));
  }

  protected override onInit(): void {
    super.onInit();
    // enemy specific initialization logic
  }

  protected override onEnterScene(): void {
    super.onEnterScene();
    // enemy specific logic for entering the scene
  }
}