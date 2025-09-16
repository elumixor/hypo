import { Service } from "@engine";

export class InputService extends Service {
  private readonly pressedKeys = new Set<string>();
  private readonly keyStates = new Map<string, boolean>();

  constructor() {
    super();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  private onKeyDown(event: KeyboardEvent): void {
    this.pressedKeys.add(event.code);
    this.keyStates.set(event.code, true);
  }

  private onKeyUp(event: KeyboardEvent): void {
    this.pressedKeys.delete(event.code);
    this.keyStates.set(event.code, false);
  }

  isPressed(key: string): boolean {
    return this.pressedKeys.has(key);
  }

  wasJustPressed(key: string): boolean {
    const currentState = this.pressedKeys.has(key);
    const previousState = this.keyStates.get(key) ?? false;
    return currentState && !previousState;
  }

  // Convenience getters for common game inputs
  get moveForward(): boolean {
    return this.isPressed("KeyW");
  }
  get moveBackward(): boolean {
    return this.isPressed("KeyS");
  }
  get moveLeft(): boolean {
    return this.isPressed("KeyA");
  }
  get moveRight(): boolean {
    return this.isPressed("KeyD");
  }
  get dash(): boolean {
    return this.isPressed("ShiftLeft");
  }
  get block(): boolean {
    return this.isPressed("Space");
  }
  get attack(): boolean {
    return this.isPressed("KeyE");
  }
  get altAttack(): boolean {
    return this.isPressed("KeyQ");
  }

  override destroy(): void {
    super.destroy();
    window.removeEventListener("keydown", this.onKeyDown.bind(this));
    window.removeEventListener("keyup", this.onKeyUp.bind(this));
  }
}
