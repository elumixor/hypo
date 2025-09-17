import { InputService, type ResizeData, Widget } from "@engine";
import { Container, Graphics, FederatedPointerEvent } from "pixi.js";
import { Vector2 } from "three";

export class VirtualJoystickWidget extends Widget {
  private container2!: Container;
  private background!: Graphics;
  private knob!: Graphics;
  private dashButton!: Graphics;
  private blockButton!: Graphics;
  
  private inputService!: InputService;
  
  private isJoystickActive = false;
  private joystickCenter = new Vector2();
  private currentDirection = new Vector2();
  private readonly maxDistance = 60;
  private readonly knobRadius = 20;
  private readonly backgroundRadius = 60;
  
  private isDashPressed = false;
  private isBlockPressed = false;
  private scale = 1;

  override async init() {
    await super.init();
    
    this.inputService = this.getService(InputService);
    
    // Create main container for the joystick
    this.container2 = new Container();
    
    // Create joystick background
    this.background = new Graphics();
    this.updateJoystickBackground();
    
    // Create joystick knob
    this.knob = new Graphics();
    this.updateJoystickKnob();
    
    // Create dash button
    this.dashButton = new Graphics();
    this.updateDashButton();
    
    // Create block/shield button
    this.blockButton = new Graphics();
    this.updateBlockButton();
    
    // Add all elements
    this.container2.addChild(this.background, this.knob, this.dashButton, this.blockButton);
    this.addChild(this.container2);
    
    // Setup interaction for joystick
    this.background.interactive = true;
    this.background.eventMode = "static";
    this.background.on("pointerdown", this.onJoystickStart);
    this.background.on("pointermove", this.onJoystickMove);
    this.background.on("pointerup", this.onJoystickEnd);
    this.background.on("pointerupoutside", this.onJoystickEnd);
    
    // Setup interaction for dash button
    this.dashButton.interactive = true;
    this.dashButton.eventMode = "static";
    this.dashButton.on("pointerdown", this.onDashPress);
    this.dashButton.on("pointerup", this.onDashRelease);
    this.dashButton.on("pointerupoutside", this.onDashRelease);
    
    // Setup interaction for block button
    this.blockButton.interactive = true;
    this.blockButton.eventMode = "static";
    this.blockButton.on("pointerdown", this.onBlockPress);
    this.blockButton.on("pointerup", this.onBlockRelease);
    this.blockButton.on("pointerupoutside", this.onBlockRelease);
    
    // Listen to resize events
    this.game.resized.subscribeImmediate(this.resize.bind(this));
    
    // Hide on desktop devices initially
    if (!this.isTouchDevice()) {
      this.container2.visible = false;
    }
  }

  private updateJoystickBackground() {
    this.background.clear();
    const radius = this.backgroundRadius * this.scale;
    this.background
      .circle(0, 0, radius)
      .fill({ color: 0x333333, alpha: 0.5 })
      .stroke({ color: 0x666666, width: 2 * this.scale, alpha: 0.7 });
  }

  private updateJoystickKnob() {
    this.knob.clear();
    const radius = this.knobRadius * this.scale;
    this.knob
      .circle(0, 0, radius)
      .fill({ color: 0x666666, alpha: 0.8 })
      .stroke({ color: 0x999999, width: 2 * this.scale });
  }

  private updateDashButton() {
    this.dashButton.clear();
    const size = 50 * this.scale;
    const color = this.isDashPressed ? 0x4444aa : 0x333333;
    this.dashButton
      .roundRect(-size/2, -size/2, size, size, 8 * this.scale)
      .fill({ color, alpha: 0.6 })
      .stroke({ color: 0x666666, width: 2 * this.scale, alpha: 0.7 });
    
    // Add dash icon (lightning bolt-like shape)
    this.dashButton
      .moveTo(-10 * this.scale, -15 * this.scale)
      .lineTo(5 * this.scale, -15 * this.scale)
      .lineTo(-5 * this.scale, 0)
      .lineTo(10 * this.scale, 0)
      .lineTo(-5 * this.scale, 15 * this.scale)
      .lineTo(0, 5 * this.scale)
      .closePath()
      .fill({ color: 0xffffff, alpha: 0.8 });
  }

  private updateBlockButton() {
    this.blockButton.clear();
    const size = 50 * this.scale;
    const color = this.isBlockPressed ? 0x444444 : 0x333333;
    this.blockButton
      .roundRect(-size/2, -size/2, size, size, 8 * this.scale)
      .fill({ color, alpha: 0.6 })
      .stroke({ color: 0x666666, width: 2 * this.scale, alpha: 0.7 });
    
    // Add shield icon
    const shieldSize = 15 * this.scale;
    this.blockButton
      .roundRect(-shieldSize/2, -shieldSize/2, shieldSize, shieldSize * 1.2, 3 * this.scale)
      .fill({ color: 0xffffff, alpha: 0.8 });
  }

  private readonly onJoystickStart = (event: FederatedPointerEvent) => {
    this.isJoystickActive = true;
    const position = event.global;
    const local = this.background.toLocal(position);
    this.joystickCenter.set(0, 0);
    this.updateJoystickPosition(local.x, local.y);
  };

  private readonly onJoystickMove = (event: FederatedPointerEvent) => {
    if (!this.isJoystickActive) return;
    
    const position = event.global;
    const local = this.background.toLocal(position);
    this.updateJoystickPosition(local.x, local.y);
  };

  private readonly onJoystickEnd = () => {
    this.isJoystickActive = false;
    this.knob.position.set(0, 0);
    this.currentDirection.set(0, 0);
    this.inputService.updateTouchJoystick(null);
  };

  private updateJoystickPosition(x: number, y: number) {
    const distance = Math.sqrt(x * x + y * y);
    const maxDist = this.maxDistance * this.scale;
    
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
    
    if (this.currentDirection.length() > 0) {
      this.inputService.updateTouchJoystick(this.currentDirection.clone());
    } else {
      this.inputService.updateTouchJoystick(null);
    }
  }

  private readonly onDashPress = () => {
    this.isDashPressed = true;
    this.updateDashButton();
    this.inputService.updateTouchDash(true);
  };

  private readonly onDashRelease = () => {
    this.isDashPressed = false;
    this.updateDashButton();
    this.inputService.updateTouchDash(false);
  };

  private readonly onBlockPress = () => {
    this.isBlockPressed = true;
    this.updateBlockButton();
    this.inputService.updateTouchBlock(true);
  };

  private readonly onBlockRelease = () => {
    this.isBlockPressed = false;
    this.updateBlockButton();
    this.inputService.updateTouchBlock(false);
  };

  private isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  private resize({ width, height }: ResizeData) {
    // Guard against resize events after widget destruction
    if (!this.container2 || this.container2.destroyed) return;

    // Calculate scale based on screen size
    const minDimension = Math.min(width, height);
    this.scale = Math.max(0.8, Math.min(1.2, minDimension / 600));

    // Update all visual elements
    this.updateJoystickBackground();
    this.updateJoystickKnob();
    this.updateDashButton();
    this.updateBlockButton();

    // Position elements
    const margin = 30 * this.scale;
    const bottomY = height / 2 - this.backgroundRadius * this.scale - margin;
    const leftX = -width / 2 + this.backgroundRadius * this.scale + margin;
    const rightX = width / 2 - 35 * this.scale - margin;

    // Position joystick on the left
    this.background.position.set(leftX, bottomY);
    this.knob.position.set(leftX, bottomY);

    // Position dash button on the right (upper)
    this.dashButton.position.set(rightX, bottomY - 35 * this.scale);

    // Position block button on the right (lower)
    this.blockButton.position.set(rightX, bottomY + 35 * this.scale);
    
    // Show/hide based on device type and screen size
    const isMobile = this.isTouchDevice() || width < 768;
    const isDebugMode = __DEV__; // Show in dev mode for testing
    this.container2.visible = isMobile || isDebugMode;
  }

  override destroy() {
    // Clean up resize subscription
    this.game.resized.unsubscribe(this.resize);
    
    super.destroy();
  }
}