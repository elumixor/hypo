import { EventEmitter } from "@elumixor/event-emitter";
import { Container, Graphics, Text } from "pixi.js";
import { textStyle } from "./fonts";

export class Button extends Container {
  readonly clicked = new EventEmitter();

  constructor(text: string) {
    super();

    const button = new Graphics();
    const width = 400;
    const height = 70;

    const sizeParams = [-width / 2, -height / 2, width, height, 8] as const;

    // Button background
    button
      .roundRect(...sizeParams)
      .fill({ color: 0x1a1a1a })
      .stroke({ color: 0x666666, width: 1 });

    // Slot content (placeholder - would be populated with save data)
    const slotText = new Text({ text, style: textStyle.basic });
    slotText.anchor.set(0.5);

    this.addChild(button, slotText);

    button.interactive = true;
    button.cursor = "pointer";
    button.eventMode = "static";

    button.on("pointerenter", () =>
      button
        .clear()
        .roundRect(...sizeParams)
        .fill({ color: 0x2a2a2a })
        .stroke({ color: 0x888888, width: 1 }),
    );

    button.on("pointerleave", () =>
      button
        .clear()
        .roundRect(...sizeParams)
        .fill({ color: 0x1a1a1a })
        .stroke({ color: 0x666666, width: 1 }),
    );

    button.on("pointerdown", () => this.clicked.emit());
  }
}
