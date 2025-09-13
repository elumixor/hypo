export class Keyboard {
  keys = new Set<string>();
  constructor() {
    addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.repeat) return; // ignore auto-repeats
      const k = (e.key || "").toLowerCase();
      // normalize Space to ' '
      const key = k === " " || k === "spacebar" || k === "space" ? " " : k;
      this.keys.add(key);
      log("Keyboard", "keydown", key);
    });
    addEventListener("keyup", (e: KeyboardEvent) => {
      const k = (e.key || "").toLowerCase();
      const key = k === " " || k === "spacebar" || k === "space" ? " " : k;
      this.keys.delete(key);
      log("Keyboard", "keyup", key);
    });
  }
  has(k: string) {
    return this.keys.has(k);
  }
  get dash() {
    return this.has(" ");
  }
  get block() {
    return this.has("q");
  }
}
