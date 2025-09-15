/// <reference types="@elumixor/frontils" />

// Global types for the HYPO game
declare global {
  // Ensure array extensions from @elumixor/frontils are available
  interface Array<T> {
    readonly isEmpty: boolean;
    readonly nonEmpty: boolean;
    readonly first: T | undefined;
    readonly second: T | undefined;
    readonly last: T | undefined;
    readonly sum: T extends number ? number : never;
    readonly prod: T extends number ? number : never;
    readonly cumsum: T extends number ? number[] : never;
    readonly min: T extends number ? number : never;
    readonly max: T extends number ? number : never;
    readonly argmin: T extends number ? number : never;
    readonly argmax: T extends number ? number : never;
    readonly unique: () => T[];
    readonly shuffled: T[];
    readonly transposed: T extends readonly (infer U)[] ? U[][] : never;

    take(n: number): T[];
    skip(n: number): T[];
    takeLast(n: number): T[];
    count(item: T): number;
    toggle(item: T): T[];
    pick(): T | undefined;
    pick(n: number, options?: { repeat?: boolean }): T[];
    remove(item: T): T[];
    insertAt(item: T, index: number): T[];
    removeAt(index: number): T[];
    clear(): T[];
  }

  // Log function available globally (already declared in utils/globals/log.ts)
  // function log(tag: string, ...args: unknown[]): void;
}

export {};
