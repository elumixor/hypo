import { Service } from "../service";
import type { InputMappingContext } from "./input-mapping-context";

export class InputService extends Service {
  private currentContext?: InputMappingContext;
  private readonly pressedKeys = new Set<string>();

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
  }

  override destroy() {
    super.destroy();

    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }
  private readonly onKeyDown = (event: KeyboardEvent) => {
    this.pressedKeys.add(event.code);
    this.currentContext?.updateKeys(this.pressedKeys);
  };

  private readonly onKeyUp = (event: KeyboardEvent) => {
    this.pressedKeys.delete(event.code);
    this.currentContext?.updateKeys(this.pressedKeys);
  };
}
