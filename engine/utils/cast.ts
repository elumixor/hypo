import type { Constructor } from "@elumixor/frontils";

export function cast<T extends object>(ctor: Constructor<T>, obj: unknown): T {
  if (obj instanceof ctor) return obj;
  throw new Error(`Object is not of type ${ctor.name}`);
}
