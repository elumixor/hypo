import { EventEmitter } from "@elumixor/event-emitter";
import { Vector2 } from "three";
import { InputComputed, InputFlag, type InputVariable, InputVector2, type UnwrapInputVariables } from "./variables";

export abstract class InputMappingContext {
  private readonly eventMappings = new Map<string, EventEmitter<void>>();
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

  protected map2DManual() {
    const result = {
      value: new Vector2(),
      update: (v: Vector2) => {
        result.value.copy(v);
        this.updateManual();
      },
    };

    return result;
  }

  protected combine2D(...variables: { value: Vector2 }[]): InputVariable<Vector2> {
    return this.computed(variables, (...values) => {
      let x = 0;
      let y = 0;
      for (const vec of values) {
        x += vec.x;
        y += vec.y;
      }
      const result = new Vector2(x, y);
      const length = result.length();
      if (length > 1) result.divideScalar(length);
      return result;
    });
  }

  protected computed<TInputs extends { value: unknown }[], TOutput>(
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
    for (const mapping of this.variableMappings) mapping.update(this.pressedKeys);
  }

  updateManual() {
    // Update all variables
    for (const mapping of this.variableMappings) mapping.update(this.pressedKeys);
  }
}
