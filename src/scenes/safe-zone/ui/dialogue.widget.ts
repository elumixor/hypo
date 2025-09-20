import { Widget } from "@engine";
import { Container, Graphics, Text } from "pixi.js";
import { Button, textStyle } from "ui";

interface DialogueOption {
  text: string;
  action: () => void;
}

interface DialogueData {
  text: string;
  options: DialogueOption[];
}

export class DialogueWidget extends Widget {
  private readonly dialogueContainer = new Container();
  private readonly background = new Graphics();
  private readonly dialogueText = new Text({
    text: "",
    style: { ...textStyle.basic, fontSize: 18, wordWrap: true, wordWrapWidth: 400 },
  });
  private readonly optionButtons: Button[] = [];
  private isVisible = false;

  constructor() {
    super();
    this.setupDialogue();
  }

  private setupDialogue() {
    // Create background
    this.background
      .roundRect(0, 0, 500, 200, 10)
      .fill({ color: 0x000000, alpha: 0.8 })
      .stroke({ color: 0xffffff, width: 2 });

    // Setup text
    this.dialogueText.position.set(20, 20);

    this.dialogueContainer.addChild(this.background, this.dialogueText);
    this.addChild(this.dialogueContainer);

    // Hide initially
    this.dialogueContainer.visible = false;
  }

  showDialogue(dialogue: DialogueData) {
    if (this.isVisible) return;

    this.isVisible = true;
    this.dialogueContainer.visible = true;

    // Set dialogue text
    this.dialogueText.text = dialogue.text;

    // Clear existing option buttons
    for (const button of this.optionButtons) {
      button.removeFromParent();
    }
    this.optionButtons.length = 0;

    // Create option buttons
    for (let i = 0; i < dialogue.options.length; i++) {
      const option = dialogue.options[i];
      if (!option) continue;

      const button = new Button(option.text);
      button.position.set(20, 100 + i * 50);

      button.clicked.subscribe(() => {
        option.action();
        this.hideDialogue();
      });

      this.optionButtons.push(button);
      this.dialogueContainer.addChild(button);
    }

    // Center the dialogue on screen
    this.dialogueContainer.position.set(-250, -100); // Centered assuming 500x200 size
  }

  hideDialogue() {
    if (!this.isVisible) return;

    this.isVisible = false;
    this.dialogueContainer.visible = false;

    // Clear option buttons
    for (const button of this.optionButtons) {
      button.removeFromParent();
    }
    this.optionButtons.length = 0;
  }

  override destroy() {
    super.destroy();
    for (const button of this.optionButtons) {
      button.destroy();
    }
  }
}

export type { DialogueData, DialogueOption };
