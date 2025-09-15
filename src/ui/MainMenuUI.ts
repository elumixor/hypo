import { type Application, Container, Graphics, Text } from "pixi.js";
import type { SaveSlot } from "../core/SaveLoadSystem";

export interface MainMenuCallbacks {
  onNewGame: () => void;
  onContinueGame: () => void;
  onLoadGame: (slotId: string) => void;
  onSettings: () => void;
  onExit?: () => void;
}

export class MainMenuUI {
  private readonly container: Container;
  private readonly background: Graphics;
  private titleText!: Text; // Use definite assignment assertion
  private readonly buttonContainer: Container;
  private readonly loadSlotsContainer: Container;
  private buttons: Graphics[] = [];
  private visible = false;
  private showingLoadSlots = false;

  constructor(
    private readonly app: Application,
    private readonly callbacks: MainMenuCallbacks,
  ) {
    this.container = new Container();
    this.background = new Graphics();
    this.buttonContainer = new Container();
    this.loadSlotsContainer = new Container();

    this.setupUI();
    this.container.visible = false;
    this.app.stage.addChild(this.container);
  }

  private setupUI(): void {
    // Semi-transparent background
    this.background.rect(0, 0, this.app.screen.width, this.app.screen.height).fill({ color: 0x000000, alpha: 0.85 });

    this.container.addChild(this.background);

    // Title
    this.titleText = new Text({
      text: "HYPO",
      style: {
        fontSize: 64,
        fill: "#4ec9ff",
        fontWeight: "bold",
        align: "center",
      },
    });
    this.titleText.anchor.set(0.5, 0.5);
    this.titleText.position.set(this.app.screen.width / 2, 120);
    this.container.addChild(this.titleText);

    // Subtitle
    const subtitleText = new Text({
      text: "Enter the depths of the psyche",
      style: {
        fontSize: 20,
        fill: "#cccccc",
        align: "center",
      },
    });
    subtitleText.anchor.set(0.5, 0.5);
    subtitleText.position.set(this.app.screen.width / 2, 180);
    this.container.addChild(subtitleText);

    // Button container
    this.buttonContainer.position.set(this.app.screen.width / 2, 280);
    this.container.addChild(this.buttonContainer);

    // Load slots container (initially hidden)
    this.loadSlotsContainer.position.set(this.app.screen.width / 2, 280);
    this.loadSlotsContainer.visible = false;
    this.container.addChild(this.loadSlotsContainer);

    this.createMainMenuButtons();
  }

  private createMainMenuButtons(): void {
    const buttonData = [
      { text: "New Game", action: () => this.callbacks.onNewGame() },
      { text: "Continue", action: () => this.callbacks.onContinueGame() },
      { text: "Load Game", action: () => this.showLoadSlots() },
      { text: "Settings", action: () => this.callbacks.onSettings() },
    ];

    // Add exit button if callback provided (for electron/desktop)
    if (this.callbacks.onExit) {
      buttonData.push({ text: "Exit", action: () => this.callbacks.onExit?.() });
    }

    this.buttons = [];
    this.buttonContainer.removeChildren();

    buttonData.forEach((button, index) => {
      const buttonBg = this.createButton(button.text, index * 80, button.action);
      this.buttonContainer.addChild(buttonBg);
      this.buttons.push(buttonBg);
    });
  }

  private createButton(text: string, yOffset: number, onClick: () => void): Graphics {
    const button = new Graphics();
    const width = 300;
    const height = 60;

    // Button background
    button
      .roundRect(-width / 2, yOffset, width, height, 8)
      .fill({ color: 0x2a2a2a })
      .stroke({ color: 0x4ec9ff, width: 2 });

    // Button text
    const buttonText = new Text({
      text,
      style: {
        fontSize: 24,
        fill: "#ffffff",
        align: "center",
      },
    });
    buttonText.anchor.set(0.5, 0.5);
    buttonText.position.set(0, yOffset + height / 2);
    button.addChild(buttonText);

    // Hover effects
    button.interactive = true;
    button.cursor = "pointer";

    button.on("pointerenter", () => {
      button
        .clear()
        .roundRect(-width / 2, yOffset, width, height, 8)
        .fill({ color: 0x3a3a3a })
        .stroke({ color: 0x6edfff, width: 2 });
    });

    button.on("pointerleave", () => {
      button
        .clear()
        .roundRect(-width / 2, yOffset, width, height, 8)
        .fill({ color: 0x2a2a2a })
        .stroke({ color: 0x4ec9ff, width: 2 });
    });

    button.on("pointertap", onClick);

    return button;
  }

  private showLoadSlots(): void {
    this.showingLoadSlots = true;
    this.buttonContainer.visible = false;
    this.loadSlotsContainer.visible = true;
    this.loadSlotsContainer.removeChildren();

    // Back button
    const backButton = this.createButton("Back", -80, () => {
      this.showingLoadSlots = false;
      this.buttonContainer.visible = true;
      this.loadSlotsContainer.visible = false;
    });
    this.loadSlotsContainer.addChild(backButton);

    // Load slots (this would be populated with actual save data)
    // For now, create placeholder slots
    for (let i = 0; i < 3; i++) {
      const slotButton = this.createLoadSlotButton(`slot_${i + 1}`, i * 80 + 20);
      this.loadSlotsContainer.addChild(slotButton);
    }
  }

  private createLoadSlotButton(slotId: string, yOffset: number): Graphics {
    const button = new Graphics();
    const width = 400;
    const height = 70;

    // Button background
    button
      .roundRect(-width / 2, yOffset, width, height, 8)
      .fill({ color: 0x1a1a1a })
      .stroke({ color: 0x666666, width: 1 });

    // Slot content (placeholder - would be populated with save data)
    const slotText = new Text({
      text: `Slot ${slotId.split("_")[1]} - Empty`,
      style: {
        fontSize: 18,
        fill: "#cccccc",
        align: "left",
      },
    });
    slotText.anchor.set(0, 0.5);
    slotText.position.set(-width / 2 + 20, yOffset + height / 2);
    button.addChild(slotText);

    button.interactive = true;
    button.cursor = "pointer";

    button.on("pointerenter", () => {
      button
        .clear()
        .roundRect(-width / 2, yOffset, width, height, 8)
        .fill({ color: 0x2a2a2a })
        .stroke({ color: 0x888888, width: 1 });
    });

    button.on("pointerleave", () => {
      button
        .clear()
        .roundRect(-width / 2, yOffset, width, height, 8)
        .fill({ color: 0x1a1a1a })
        .stroke({ color: 0x666666, width: 1 });
    });

    button.on("pointertap", () => {
      this.callbacks.onLoadGame(slotId);
    });

    return button;
  }

  updateSaveSlots(saveSlots: Record<string, SaveSlot>): void {
    if (!this.showingLoadSlots) return;

    this.loadSlotsContainer.removeChildren();

    // Back button
    const backButton = this.createButton("Back", -80, () => {
      this.showingLoadSlots = false;
      this.buttonContainer.visible = true;
      this.loadSlotsContainer.visible = false;
    });
    this.loadSlotsContainer.addChild(backButton);

    // Create slots with actual save data
    const slotIds = ["slot_1", "slot_2", "slot_3"];
    slotIds.forEach((slotId, index) => {
      const saveSlot = saveSlots[slotId];
      const slotButton = this.createLoadSlotButtonWithData(slotId, saveSlot, index * 80 + 20);
      this.loadSlotsContainer.addChild(slotButton);
    });
  }

  private createLoadSlotButtonWithData(slotId: string, saveSlot: SaveSlot | undefined, yOffset: number): Graphics {
    const button = new Graphics();
    const width = 400;
    const height = 70;

    const isEmpty = !saveSlot;
    const bgColor = isEmpty ? 0x1a1a1a : 0x2a2a2a;
    const borderColor = isEmpty ? 0x666666 : 0x4ec9ff;

    // Button background
    button
      .roundRect(-width / 2, yOffset, width, height, 8)
      .fill({ color: bgColor })
      .stroke({ color: borderColor, width: isEmpty ? 1 : 2 });

    if (isEmpty) {
      // Empty slot
      const emptyText = new Text({
        text: `Slot ${slotId.split("_")[1]} - Empty`,
        style: {
          fontSize: 18,
          fill: "#666666",
          align: "left",
        },
      });
      emptyText.anchor.set(0, 0.5);
      emptyText.position.set(-width / 2 + 20, yOffset + height / 2);
      button.addChild(emptyText);
    } else {
      // Save data slot
      const slotNumber = slotId.split("_")[1];
      const nameText = new Text({
        text: `Slot ${slotNumber}: ${saveSlot.name}`,
        style: {
          fontSize: 18,
          fill: "#ffffff",
          fontWeight: "bold",
        },
      });
      nameText.anchor.set(0, 0.5);
      nameText.position.set(-width / 2 + 20, yOffset + height / 2 - 12);
      button.addChild(nameText);

      const detailText = new Text({
        text: `Level ${saveSlot.level} • ${this.formatPlayTime(saveSlot.playTime)} • ${this.formatDate(saveSlot.timestamp)}`,
        style: {
          fontSize: 14,
          fill: "#cccccc",
        },
      });
      detailText.anchor.set(0, 0.5);
      detailText.position.set(-width / 2 + 20, yOffset + height / 2 + 12);
      button.addChild(detailText);
    }

    button.interactive = true;
    button.cursor = isEmpty ? "not-allowed" : "pointer";

    if (!isEmpty) {
      button.on("pointerenter", () => {
        button
          .clear()
          .roundRect(-width / 2, yOffset, width, height, 8)
          .fill({ color: 0x3a3a3a })
          .stroke({ color: 0x6edfff, width: 2 });
      });

      button.on("pointerleave", () => {
        button
          .clear()
          .roundRect(-width / 2, yOffset, width, height, 8)
          .fill({ color: bgColor })
          .stroke({ color: borderColor, width: 2 });
      });

      button.on("pointertap", () => {
        this.callbacks.onLoadGame(slotId);
      });
    }

    return button;
  }

  private formatPlayTime(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `${seconds}s`;
    }
  }

  private formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }

  show(): void {
    this.visible = true;
    this.container.visible = true;
    // Enable pointer events on the canvas when main menu is shown
    this.app.canvas.style.pointerEvents = "auto";
  }

  hide(): void {
    this.visible = false;
    this.container.visible = false;
    // Disable pointer events on the canvas when main menu is hidden
    this.app.canvas.style.pointerEvents = "none";
    // Reset to main menu when hiding
    if (this.showingLoadSlots) {
      this.showingLoadSlots = false;
      this.buttonContainer.visible = true;
      this.loadSlotsContainer.visible = false;
    }
  }

  isVisible(): boolean {
    return this.visible;
  }

  resize(): void {
    this.background
      .clear()
      .rect(0, 0, this.app.screen.width, this.app.screen.height)
      .fill({ color: 0x000000, alpha: 0.85 });

    this.titleText.position.set(this.app.screen.width / 2, 120);
    this.buttonContainer.position.set(this.app.screen.width / 2, 280);
    this.loadSlotsContainer.position.set(this.app.screen.width / 2, 280);
  }
}
