import type { InputVariable } from "./input-variable";

export class InputComputed<TInputs extends { value: unknown }[], TOutput> implements InputVariable<TOutput> {
  value: TOutput;

  constructor(
    private readonly dependencies: TInputs,
    private readonly mapper: (...values: UnwrapInputVariables<TInputs>) => TOutput,
  ) {
    // Initialize value
    this.value = this.mapper(...(this.dependencies.map((d) => d.value) as UnwrapInputVariables<TInputs>));
  }

  update() {
    this.value = this.mapper(...(this.dependencies.map((d) => d.value) as UnwrapInputVariables<TInputs>));
  }
}

type InputVariableType<T> = T extends { value: infer U } ? U : never;
export type UnwrapInputVariables<T extends { value: unknown }[]> = {
  [K in keyof T]: InputVariableType<T[K]>;
};
