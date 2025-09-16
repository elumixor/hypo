import { Vector2 } from "three";
import type { InputVariable } from "./input-variable";

// Primitive input variable for 2D vector (e.g., movement)
export class InputVector2 implements InputVariable<Vector2> {
  value = new Vector2();

  constructor(
    private readonly positiveX: string,
    private readonly negativeX: string,
    private readonly positiveY: string,
    private readonly negativeY: string,
  ) {}

  update(pressedKeys: Set<string>): void {
    this.value.set(0, 0);
    if (pressedKeys.has(this.positiveX)) this.value.x += 1;
    if (pressedKeys.has(this.negativeX)) this.value.x -= 1;
    if (pressedKeys.has(this.positiveY)) this.value.y += 1;
    if (pressedKeys.has(this.negativeY)) this.value.y -= 1;
    if (this.value.length() > 0) this.value.normalize();
  }
}
