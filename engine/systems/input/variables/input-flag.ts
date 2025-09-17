import type { InputVariable } from "./input-variable";

export class InputFlag implements InputVariable<boolean> {
  value = false;

  constructor(private readonly key: string) {}

  update(pressedKeys: Set<string>): void {
    this.value = pressedKeys.has(this.key);
  }
}
