import type { TouchInput } from "../input.service";
import type { InputVariable } from "./input-variable";

export class InputFlag implements InputVariable<boolean> {
  value = false;

  constructor(private readonly key: string) {}

  update(pressedKeys: Set<string>, touchInput?: TouchInput): void {
    // Check for touch input for shield
    if (this.key === "KeyQ" && touchInput?.blockPressed) {
      this.value = true;
      return;
    }
    
    // Default to keyboard input
    this.value = pressedKeys.has(this.key);
  }
}
