import { Service } from "@engine/core/service";
import type { InputMappingContext } from "./input-mapping-context";

export class InputService extends Service {
  private currentContext?: InputMappingContext;
  private readonly pressedKeys = new Set<string>();
  private isWindowFocused = true;

  get context(): InputMappingContext | undefined {
    return this.currentContext;
  }
  set context(context: InputMappingContext) {
    this.currentContext = context;
    this.currentContext.updateKeys(this.pressedKeys);
  }

  override async init() {
    await super.init();

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("focus", this.onWindowFocus);
    window.addEventListener("blur", this.onWindowBlur);
  }

  override destroy() {
    super.destroy();

    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    window.removeEventListener("focus", this.onWindowFocus);
    window.removeEventListener("blur", this.onWindowBlur);
  }
  private readonly onKeyDown = (event: KeyboardEvent) => {
    if (!this.isWindowFocused) return;
    this.pressedKeys.add(event.code);
    this.currentContext?.updateKeys(this.pressedKeys);
  };

  private readonly onKeyUp = (event: KeyboardEvent) => {
    if (!this.isWindowFocused) return;
    this.pressedKeys.delete(event.code);
    this.currentContext?.updateKeys(this.pressedKeys);
  };

  private readonly onWindowFocus = () => {
    this.isWindowFocused = true;
    // Clear any stale key states when focus is regained
    this.pressedKeys.clear();
    this.currentContext?.updateKeys(this.pressedKeys);
  };

  private readonly onWindowBlur = () => {
    this.isWindowFocused = false;
    // Clear all pressed keys when window loses focus
    this.pressedKeys.clear();
    this.currentContext?.updateKeys(this.pressedKeys);
  };
}
