export class Keyboard {
  keys = new Set<string>();
  constructor() {
  addEventListener('keydown', (e: KeyboardEvent) => this.keys.add(e.key.toLowerCase()));
  addEventListener('keyup', (e: KeyboardEvent) => this.keys.delete(e.key.toLowerCase()));
  }
  has(k: string) { return this.keys.has(k); }
}
