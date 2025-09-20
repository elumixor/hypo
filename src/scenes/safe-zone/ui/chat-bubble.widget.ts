import { Widget } from "@engine";
import { Container, Graphics, Text } from "pixi.js";
import type { Vector3 } from "three";
import { textStyle } from "ui/fonts";

export class ChatBubbleWidget extends Widget {
  private readonly bubbleContainer = new Container();
  private readonly bubble = new Graphics();
  private readonly eKeyText = new Text({ text: "E", style: { ...textStyle.basic, fontSize: 16, fill: "#ffffff" } });
  private isVisible = false;

  constructor() {
    super();
    this.setupBubble();
  }

  private setupBubble() {
    // Create circular chat bubble
    this.bubble.circle(0, 0, 25).fill({ color: 0x333333 }).stroke({ color: 0xffffff, width: 2 });

    // Add "E" text in center
    this.eKeyText.anchor.set(0.5);

    this.bubbleContainer.addChild(this.bubble, this.eKeyText);
    this.addChild(this.bubbleContainer);

    // Make bubble interactive
    this.bubbleContainer.interactive = true;
    this.bubbleContainer.cursor = "pointer";

    // Hide initially
    this.bubbleContainer.visible = false;
  }

  showBubble(worldPosition: Vector3) {
    if (this.isVisible) return;

    this.isVisible = true;
    this.bubbleContainer.visible = true;

    // Convert 3D world position to 2D screen position
    const screenPosition = this.worldToScreen(worldPosition);
    this.bubbleContainer.position.set(screenPosition.x, screenPosition.y - 60); // Offset above the character
  }

  hideBubble() {
    if (!this.isVisible) return;

    this.isVisible = false;
    this.bubbleContainer.visible = false;
  }

  private worldToScreen(worldPos: Vector3) {
    const camera = this.scene.camera;
    const vector = worldPos.clone();

    // Project to screen coordinates
    vector.project(camera);

    // Convert normalized device coordinates to pixel coordinates
    const { width, height } = this.game.pixiApp.screen;
    const x = (vector.x * 0.5 + 0.5) * width;
    const y = (vector.y * -0.5 + 0.5) * height;

    return { x: x - width / 2, y: y - height / 2 }; // Convert to PIXI coordinate system
  }

  get clicked() {
    return this.bubbleContainer;
  }
}
