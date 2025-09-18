import { InputMappingContext } from "@engine";
import { Vector2 } from "three";

export class CombatInputMappingContext extends InputMappingContext {
  private readonly move1 = this.map2D("KeyD", "KeyA", "KeyW", "KeyS"); // WASD
  private readonly move2 = this.map2D("ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"); // Arrows
  private readonly moveCombined = this.combine2D(this.move1, this.move2);

  readonly playerMovement = this.computed([this.moveCombined], (combined) =>
    // Rotate by 45 degrees counterclockwise
    combined.rotateAround(new Vector2(0, 0), Math.PI / 4),
  );

  readonly dashActivated = this.mapEvent("Space").on;
  readonly shield = this.mapEvent("KeyQ");
}
