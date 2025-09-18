// Base interface for input variables
export interface InputVariable<T> {
  value: T;
  update(pressedKeys: Set<string>): void;
}
