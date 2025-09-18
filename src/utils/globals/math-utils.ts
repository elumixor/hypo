export {};

declare global {
  function clamp(value: number, min: number, max: number): number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

if (!Reflect.has(window, "clamp"))
  Reflect.defineProperty(window, "clamp", { value: clamp, writable: false, configurable: false });
