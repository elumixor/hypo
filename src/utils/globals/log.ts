export {};

declare global {
  function log(tag: string, ...args: unknown[]): void;
}

function logFn(tag: string, ...args: unknown[]) {
  const time = new Date().toISOString().slice(11, 23);
  console.log(`%c[${time}] %c${tag}`, "color:#999", "color:#6cf;font-weight:bold", ...args);
}

if (!Reflect.has(window, "log"))
  Reflect.defineProperty(window, "log", { value: logFn, writable: false, configurable: false });
