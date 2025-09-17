import { EventEmitter } from "@elumixor/event-emitter";
import type { Vector2 } from "three";
import { InputComputed, InputFlag, type InputVariable, InputVector2, type UnwrapInputVariables } from "./variables";
import type { TouchInput } from "./input.service";

export abstract class InputMappingContext {
  private readonly eventMappings = new Map<string, EventEmitter<void>>();
  private readonly variableMappings: InputVariable<unknown>[] = [];
  private readonly previousPressedKeys = new Set<string>();
  protected readonly pressedKeys = new Set<string>();
  protected touchInput: TouchInput = { joystick: null, dashTapped: false, blockPressed: false };

  protected map2D(positiveX: string, negativeX: string, positiveY: string, negativeY: string): InputVariable<Vector2> {
    const input = new InputVector2(positiveX, negativeX, positiveY, negativeY);
    this.variableMappings.push(input);
    return input;
  }

  protected mapFlag(key: string): InputVariable<boolean> {
    const input = new InputFlag(key);
    this.variableMappings.push(input);
    return input;
  }

  protected combine2D(first: InputVariable<Vector2>, second: InputVariable<Vector2>): InputVariable<Vector2> {
    return this.computed([first, second], (a, b) => {
      const result = a.clone().add(b);
      if (result.length() > 0) result.normalize();
      return result;
    });
  }

  protected computed<TInputs extends InputVariable<unknown>[], TOutput>(
    dependencies: TInputs,
    mapper: (...values: UnwrapInputVariables<TInputs>) => TOutput,
  ): InputVariable<TOutput> {
    const computed = new InputComputed(dependencies, mapper);
    this.variableMappings.push(computed);
    return computed;
  }

  protected mapEvent(key: string): EventEmitter<void> {
    const emitter = new EventEmitter<void>();
    this.eventMappings.set(key, emitter);
    return emitter;
  }

  // Called by service to update key states
  updateKeys(pressedKeys: Set<string>) {
    this.previousPressedKeys.clear();
    for (const key of this.pressedKeys) this.previousPressedKeys.add(key);

    this.pressedKeys.clear();
    for (const key of pressedKeys) this.pressedKeys.add(key);

    // Emit events for newly pressed keys
    for (const key of this.pressedKeys) {
      if (!this.previousPressedKeys.has(key)) {
        this.eventMappings.get(key)?.emit();
      }
    }

    // Update all variables
    for (const mapping of this.variableMappings) {
      mapping.update(this.pressedKeys, this.touchInput);
    }
  }

  // Called by service to update touch input
  updateTouch(touchInput: TouchInput) {
    this.touchInput = touchInput;
    
    // Emit dash event if tapped
    if (touchInput.dashTapped) {
      this.eventMappings.get("TouchDash")?.emit();
    }
    
    // Update all variables with new touch input
    for (const mapping of this.variableMappings) {
      mapping.update(this.pressedKeys, this.touchInput);
    }
  }

  update() {
    // Additional update logic if needed
  }
}
