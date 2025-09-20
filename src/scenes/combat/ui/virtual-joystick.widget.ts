import { InputService, type ResizeData, Widget } from "@engine";
import { Graphics, Point } from "pixi.js";
import { Vector2 } from "three";
import type { CombatInputMappingContext } from "../combat-input-mapping.context";

export class VirtualJoystickWidget extends Widget {
  private readonly background = new Graphics();
  private readonly knob = new Graphics();

  private readonly inputService = this.require(InputService);
  private readonly currentDirection = new Vector2();
  private readonly maxDistance = 60;
  private readonly knobRadius = 20;
  private readonly backgroundRadius = 60;

  override async init() {
    await super.init();

    this.background
      .circle(0, 0, this.backgroundRadius)
      .fill({ color: 0x333333, alpha: 0.5 })
      .stroke({ color: 0x666666, width: 2, alpha: 0.7 });

    this.knob.circle(0, 0, this.knobRadius).fill({ color: 0x666666, alpha: 0.8 }).stroke({ color: 0x999999, width: 2 });

    this.addChild(this.background, this.knob);

    // Setup interaction for joystick
    this.background.eventMode = "static";

    // Listen to resize events
    this.onImmediate(this.game.resized, this.resize.bind(this));

    // Start hidden
    this.visible = false;

    // Listen to window pointerdown to show joystick
    window.addEventListener("pointerdown", this.onWindowPointerDown);
  }

  private get inputContext() {
    return this.inputService.context as CombatInputMappingContext;
  }

  private readonly onWindowPointerDown = (event: PointerEvent) => {
    // Position joystick at touch point
    const x = event.clientX - window.innerWidth / 2;
    const y = event.clientY - window.innerHeight / 2;
    this.container.position.set(x, y);
    this.container.visible = true;

    // Make background interactive
    this.background.interactive = true;
    this.background.on("pointerup", this.onJoystickEnd);
    this.background.on("pointerupoutside", this.onJoystickEnd);

    // Reset joystick state
    this.knob.position.set(0, 0);
    this.currentDirection.set(0, 0);

    // Listen to move and end events
    window.addEventListener("pointermove", this.onJoystickMove);
    window.addEventListener("pointerup", this.onJoystickEnd);
    window.addEventListener("pointercancel", this.onJoystickEnd);
  };

  private readonly onJoystickMove = (event: PointerEvent) => {
    const position = new Point(event.clientX, event.clientY);
    const local = this.background.toLocal(position);
    this.updateJoystickPosition(local.x, local.y);
  };

  private readonly onJoystickEnd = () => {
    this.container.visible = false;
    this.background.interactive = false;
    this.background.off("pointerup", this.onJoystickEnd);
    this.background.off("pointerupoutside", this.onJoystickEnd);
    this.knob.position.set(0, 0);
    this.currentDirection.set(0, 0);
    window.removeEventListener("pointermove", this.onJoystickMove);
    window.removeEventListener("pointerup", this.onJoystickEnd);
    window.removeEventListener("pointercancel", this.onJoystickEnd);
    this.inputContext.moveJoystick.update(new Vector2(0, 0));
  };

  private updateJoystickPosition(x: number, y: number) {
    const distance = Math.sqrt(x * x + y * y);
    const maxDist = this.maxDistance;

    if (distance <= maxDist) {
      this.knob.position.set(x, y);
      this.currentDirection.set(x / maxDist, -y / maxDist);
    } else {
      const angle = Math.atan2(y, x);
      const clampedX = Math.cos(angle) * maxDist;
      const clampedY = Math.sin(angle) * maxDist;

      this.knob.position.set(clampedX, clampedY);
      this.currentDirection.set(Math.cos(angle), -Math.sin(angle));
    }

    this.inputContext.moveJoystick.update(this.currentDirection);
  }

  private resize({ width, height }: ResizeData) {
    // Calculate scale based on screen size
    const minDimension = Math.min(width, height);
    this.scale.set(Math.max(0.8, Math.min(1.2, minDimension / 600)));

    // Update graphics scale
    this.background.clear();
    this.background
      .circle(0, 0, this.backgroundRadius)
      .fill({ color: 0x333333, alpha: 0.5 })
      .stroke({ color: 0x666666, width: 2, alpha: 0.7 });

    this.knob.clear();
    this.knob.circle(0, 0, this.knobRadius).fill({ color: 0x666666, alpha: 0.8 }).stroke({ color: 0x999999, width: 2 });
  }

  override destroy() {
    window.removeEventListener("pointerdown", this.onWindowPointerDown);
    window.removeEventListener("pointermove", this.onJoystickMove);
    window.removeEventListener("pointerup", this.onJoystickEnd);
    window.removeEventListener("pointercancel", this.onJoystickEnd);

    this.background.off("pointerup", this.onJoystickEnd);
    this.background.off("pointerupoutside", this.onJoystickEnd);

    super.destroy();
  }
}
