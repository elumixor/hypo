import type { TouchInput } from "../input.service";
import type { InputVariable } from "./input-variable";

export class InputComputed<TInputs extends InputVariable<unknown>[], TOutput> implements InputVariable<TOutput> {
  value: TOutput;

  constructor(
    private readonly dependencies: TInputs,
    private readonly mapper: (...values: UnwrapInputVariables<TInputs>) => TOutput,
  ) {
    // Initialize value
    this.value = this.mapper(...(this.dependencies.map((d) => d.value) as UnwrapInputVariables<TInputs>));
  }

  update(_pressedKeys: Set<string>, _touchInput?: TouchInput) {
    // Dependencies are updated elsewhere, just compute the new value
    this.value = this.mapper(...(this.dependencies.map((d) => d.value) as UnwrapInputVariables<TInputs>));
  }
}

type InputVariableType<T> = T extends InputVariable<infer U> ? U : never;
export type UnwrapInputVariables<T extends InputVariable<unknown>[]> = {
  [K in keyof T]: InputVariableType<T[K]>;
};
