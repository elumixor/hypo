import { InputMappingContext } from "@engine/input";

export class CombatInputMappingContext extends InputMappingContext {
  readonly playerMovement = this.map2D("KeyD", "KeyA", "KeyW", "KeyS");
  readonly dashActivated = this.mapEvent("Space");
  readonly shieldActive = this.mapFlag("KeyQ");
}
