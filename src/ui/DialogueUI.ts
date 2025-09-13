import { type Application, Container, Graphics, Text } from "pixi.js";
import type { DialogueNode, DialogueOption, DialogueSystem } from "./DialogueSystem";

export class DialogueUI {
  private container: Container;
  private background: Graphics;
  private rightAvatar!: Graphics; // Using graphics as placeholder for now
  private speakerText: Text;
  private dialogueText: Text;
  private optionButtons: Container[] = [];
  private currentText = "";
  private targetText = "";
  private typewriterTimer = 0;
  private typewriterSpeed = 0.03; // Time between characters
  private isTyping = false;

  constructor(
    private app: Application,
    private dialogueSystem: DialogueSystem,
  ) {
    this.container = new Container();
    this.container.visible = false;
    this.app.stage.addChild(this.container);

    // Create background panel
    this.background = new Graphics();
    this.background.rect(0, 0, 800, 250).fill({ color: 0x000000, alpha: 0.8 });
    this.background.rect(10, 10, 780, 230).fill({ color: 0x222222, alpha: 0.9 });
    this.container.addChild(this.background);

    // Create dummy avatars
    this.createAvatars();

    // Create speaker text
    this.speakerText = new Text({
      text: "",
      style: {
        fill: "#ffdd44",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 1,
      },
    });
    this.speakerText.x = 150;
    this.speakerText.y = 25;
    this.container.addChild(this.speakerText);

    // Create dialogue text
    this.dialogueText = new Text({
      text: "",
      style: {
        fill: "#ffffff",
        fontSize: 16,
        wordWrap: true,
        wordWrapWidth: 620,
        lineHeight: 24,
      },
    });
    this.dialogueText.x = 150;
    this.dialogueText.y = 55;
    this.container.addChild(this.dialogueText);

    // Position the dialogue UI at bottom of screen
    this.updatePosition();

    // Listen for dialogue changes
    this.dialogueSystem.setOnDialogueChange((dialogue) => {
      if (dialogue) {
        this.showDialogue(dialogue);
      } else {
        this.hide();
      }
    });

    // Listen for resize to reposition
    window.addEventListener("resize", () => this.updatePosition());
  }

  private createAvatars() {
    // Left avatar (Guard character) - using a simple colored rectangle as placeholder
    const leftAvatarBg = new Graphics();
    leftAvatarBg.rect(0, 0, 120, 120).fill(0x4488aa);
    leftAvatarBg.circle(60, 40, 25).fill(0x66aacc); // Head
    leftAvatarBg.rect(35, 65, 50, 45).fill(0x8844aa); // Body
    leftAvatarBg.x = 20;
    leftAvatarBg.y = 20;
    this.container.addChild(leftAvatarBg);

    // Right avatar (Player character) - another simple colored rectangle
    this.rightAvatar = new Graphics();
    this.rightAvatar.rect(0, 0, 120, 120).fill(0xaa4444);
    this.rightAvatar.circle(60, 40, 25).fill(0xcc6666); // Head
    this.rightAvatar.rect(35, 65, 50, 45).fill(0xaa8844); // Body
    this.rightAvatar.x = 660;
    this.rightAvatar.y = 20;
    this.rightAvatar.visible = false; // Only show when player is speaking
    this.container.addChild(this.rightAvatar);
  }

  private updatePosition() {
    this.container.x = (this.app.screen.width - 800) / 2;
    this.container.y = this.app.screen.height - 280;
  }

  private showDialogue(dialogue: DialogueNode) {
    this.container.visible = true;

    // Show appropriate avatar based on speaker
    const isPlayer =
      dialogue.speaker.toLowerCase().includes("player") || dialogue.speaker.toLowerCase().includes("you");
    this.rightAvatar.visible = isPlayer;

    // Set speaker name
    this.speakerText.text = dialogue.speaker;

    // Start typewriter effect for dialogue text
    this.startTypewriter(dialogue.text);

    // Clear existing options
    this.clearOptions();

    // Show options after text is fully typed (or immediately if no animation)
    if (dialogue.options && dialogue.options.length > 0) {
      // Wait for typewriter to finish, then show options
      setTimeout(
        () => {
          if (!this.isTyping) {
            this.createOptions(dialogue.options!);
          }
        },
        dialogue.text.length * this.typewriterSpeed * 1000 + 500,
      );
    }
  }

  private startTypewriter(text: string) {
    this.targetText = text;
    this.currentText = "";
    this.typewriterTimer = 0;
    this.isTyping = true;
    this.dialogueText.text = "";

    // Add typewriter animation to game loop
    const typewriterTick = (dt: number) => {
      if (!this.isTyping) return;

      this.typewriterTimer += dt;

      if (this.typewriterTimer >= this.typewriterSpeed && this.currentText.length < this.targetText.length) {
        this.currentText += this.targetText[this.currentText.length];
        this.dialogueText.text = this.currentText;
        this.typewriterTimer = 0;
      }

      if (this.currentText.length >= this.targetText.length) {
        this.isTyping = false;
        // Show options now if they exist and haven't been created yet
        const currentDialogue = this.dialogueSystem.getCurrentDialogue();
        if (currentDialogue?.options && this.optionButtons.length === 0) {
          this.createOptions(currentDialogue.options);
        }
      }
    };

    // Simple animation loop - we'll add this to game update later
    const animate = () => {
      if (this.isTyping) {
        typewriterTick(0.016); // ~60fps
        requestAnimationFrame(animate);
      }
    };
    animate();
  }

  private createOptions(options: DialogueOption[]) {
    this.clearOptions();

    const startY = 150;
    const spacing = 35;

    options.forEach((option, index) => {
      const optionContainer = new Container();

      // Button background
      const bg = new Graphics();
      bg.rect(0, 0, 760, 30).fill({ color: 0x333333 });
      bg.rect(2, 2, 756, 26).fill({ color: 0x444444, alpha: 0.8 });

      // Option text
      const optionText = new Text({
        text: `${index + 1}. ${option.text}`,
        style: {
          fill: "#ffffff",
          fontSize: 14,
          letterSpacing: 0.5,
        },
      });
      optionText.x = 10;
      optionText.y = 6;

      optionContainer.addChild(bg);
      optionContainer.addChild(optionText);
      optionContainer.x = 20;
      optionContainer.y = startY + index * spacing;

      // Make interactive
      optionContainer.eventMode = "static";
      optionContainer.cursor = "pointer";

      // Hover effects
      optionContainer.on("pointerover", () => {
        bg.clear();
        bg.rect(0, 0, 760, 30).fill({ color: 0x555555 });
        bg.rect(2, 2, 756, 26).fill({ color: 0x666666, alpha: 0.8 });
      });

      optionContainer.on("pointerout", () => {
        bg.clear();
        bg.rect(0, 0, 760, 30).fill({ color: 0x333333 });
        bg.rect(2, 2, 756, 26).fill({ color: 0x444444, alpha: 0.8 });
      });

      optionContainer.on("pointerdown", () => {
        this.selectOption(index);
      });

      this.container.addChild(optionContainer);
      this.optionButtons.push(optionContainer);
    });
  }

  private clearOptions() {
    this.optionButtons.forEach((button) => {
      this.container.removeChild(button);
      button.destroy();
    });
    this.optionButtons = [];
  }

  private selectOption(index: number) {
    this.dialogueSystem.selectOption(index);
  }

  private hide() {
    this.container.visible = false;
    this.clearOptions();
    this.isTyping = false;
  }

  // Allow external control
  startDialogue(dialogueId: string) {
    return this.dialogueSystem.startDialogue(dialogueId);
  }

  // Handle keyboard input for option selection
  handleKeyPress(key: string) {
    if (!this.container.visible) return false;

    const currentDialogue = this.dialogueSystem.getCurrentDialogue();
    if (!currentDialogue?.options) return false;

    const num = parseInt(key);
    if (num >= 1 && num <= currentDialogue.options.length) {
      this.selectOption(num - 1);
      return true;
    }

    // Space or Enter to skip typing animation
    if ((key === " " || key === "enter") && this.isTyping) {
      this.currentText = this.targetText;
      this.dialogueText.text = this.currentText;
      this.isTyping = false;
      if (currentDialogue?.options && this.optionButtons.length === 0) {
        this.createOptions(currentDialogue.options);
      }
      return true;
    }

    return false;
  }
}
