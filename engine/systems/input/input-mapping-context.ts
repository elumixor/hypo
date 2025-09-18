import { EventEmitter } from "@elumixor/event-emitter";
import type { Vector2 } from "three";
import { InputComputed, InputFlag, type InputVariable, InputVector2, type UnwrapInputVariables } from "./variables";

export abstract class InputMappingContext {
  private readonly eventMappings = new Map<string, { on: EventEmitter; off: EventEmitter }>();
  private readonly variableMappings: InputVariable<unknown>[] = [];
  private readonly previousPressedKeys = new Set<string>();
  protected readonly pressedKeys = new Set<string>();

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

  protected mapEvent(key: string) {
    const events = { on: new EventEmitter(), off: new EventEmitter() };
    this.eventMappings.set(key, events);
    return events;
  }

  // Called by service to update key states
  updateKeys(pressedKeys: Set<string>) {
    this.previousPressedKeys.clear();
    for (const key of this.pressedKeys) this.previousPressedKeys.add(key);

    this.pressedKeys.clear();
    for (const key of pressedKeys) this.pressedKeys.add(key);

    // Emit events for newly pressed keys
    for (const key of this.pressedKeys) if (!this.previousPressedKeys.has(key)) this.eventMappings.get(key)?.on.emit();

    // Emit events for newly released keys
    for (const key of this.previousPressedKeys) if (!this.pressedKeys.has(key)) this.eventMappings.get(key)?.off.emit();

    // Update all variables
    for (const mapping of this.variableMappings) mapping.update(this.pressedKeys);
  }

  update() {
    // Additional update logic if needed
  }
}
