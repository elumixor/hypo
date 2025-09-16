export {};

declare global {
  function log(tag: string, ...args: unknown[]): void;
  function logWarning(tag: string, ...args: unknown[]): void;
  function logError(tag: string, ...args: unknown[]): void;
}

function logFn(tag: string, ...args: unknown[]) {
  console.log(`%c${tag}`, "color:#6cf;font-weight:bold", ...args);
}

function logWarningFn(tag: string, ...args: unknown[]) {
  console.warn(`%c${tag}`, "color:#f90;font-weight:bold", ...args);
}

function logErrorFn(tag: string, ...args: unknown[]) {
  console.error(`%c${tag}`, "color:#f44;font-weight:bold", ...args);
}

if (!Reflect.has(window, "log"))
  Reflect.defineProperty(window, "log", { value: logFn, writable: false, configurable: false });

if (!Reflect.has(window, "logWarning"))
  Reflect.defineProperty(window, "logWarning", { value: logWarningFn, writable: false, configurable: false });

if (!Reflect.has(window, "logError"))
  Reflect.defineProperty(window, "logError", { value: logErrorFn, writable: false, configurable: false });
