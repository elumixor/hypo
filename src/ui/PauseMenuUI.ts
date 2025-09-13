import { type Application, Container, Graphics, Text } from "pixi.js";
import type { SaveSlot } from "../core/SaveLoadSystem";

export interface PauseMenuCallbacks {
  onResume: () => void;
  onQuickSave: () => void;
  onQuickLoad: () => void;
  onSaveGame: (slotId: string) => void;
  onLoadGame: (slotId: string) => void;
  onSettings: () => void;
  onMainMenu: () => void;
  onExit?: () => void;
}

export class PauseMenuUI {
  private readonly container: Container;
  private readonly background: Graphics;
  private titleText!: Text; // Use definite assignment assertion
  private readonly buttonContainer: Container;
  private readonly saveLoadContainer: Container;
  private buttons: Graphics[] = [];
  private visible = false;
  private showingSaveSlots = false;
  private showingLoadSlots = false;

  constructor(
    private readonly app: Application,
    private readonly callbacks: PauseMenuCallbacks,
  ) {
    this.container = new Container();
    this.background = new Graphics();
    this.buttonContainer = new Container();
    this.saveLoadContainer = new Container();

    this.setupUI();
    this.container.visible = false;
    this.app.stage.addChild(this.container);
  }

  private setupUI(): void {
    // Semi-transparent background
    this.background.rect(0, 0, this.app.screen.width, this.app.screen.height).fill({ color: 0x000000, alpha: 0.75 });

    this.container.addChild(this.background);

    // Title
    this.titleText = new Text({
      text: "PAUSED",
      style: {
        fontSize: 48,
        fill: "#4ec9ff",
        fontWeight: "bold",
        align: "center",
      },
    });
    this.titleText.anchor.set(0.5, 0.5);
    this.titleText.position.set(this.app.screen.width / 2, 100);
    this.container.addChild(this.titleText);

    // Button container
    this.buttonContainer.position.set(this.app.screen.width / 2, 200);
    this.container.addChild(this.buttonContainer);

    // Save/Load container (initially hidden)
    this.saveLoadContainer.position.set(this.app.screen.width / 2, 200);
    this.saveLoadContainer.visible = false;
    this.container.addChild(this.saveLoadContainer);

    this.createMainPauseButtons();
  }

  private createMainPauseButtons(): void {
    const buttonData = [
      { text: "Resume Game", action: () => this.callbacks.onResume() },
      { text: "Quick Save", action: () => this.callbacks.onQuickSave() },
      { text: "Quick Load", action: () => this.callbacks.onQuickLoad() },
      { text: "Save Game...", action: () => this.showSaveSlots() },
      { text: "Load Game...", action: () => this.showLoadSlots() },
      { text: "Settings", action: () => this.callbacks.onSettings() },
      { text: "Main Menu", action: () => this.callbacks.onMainMenu() },
    ];

    // Add exit button if callback provided (for electron/desktop)
    if (this.callbacks.onExit) {
      buttonData.push({ text: "Exit Game", action: () => this.callbacks.onExit?.() });
    }

    this.buttons = [];
    this.buttonContainer.removeChildren();

    buttonData.forEach((button, index) => {
      const buttonBg = this.createButton(button.text, index * 60, button.action);
      this.buttonContainer.addChild(buttonBg);
      this.buttons.push(buttonBg);
    });
  }

  private createButton(text: string, yOffset: number, onClick: () => void): Graphics {
    const button = new Graphics();
    const width = 280;
    const height = 50;

    // Button background
    button
      .roundRect(-width / 2, yOffset, width, height, 6)
      .fill({ color: 0x2a2a2a })
      .stroke({ color: 0x4ec9ff, width: 1 });

    // Button text
    const buttonText = new Text({
      text,
      style: {
        fontSize: 20,
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
        .roundRect(-width / 2, yOffset, width, height, 6)
        .fill({ color: 0x3a3a3a })
        .stroke({ color: 0x6edfff, width: 2 });
    });

    button.on("pointerleave", () => {
      button
        .clear()
        .roundRect(-width / 2, yOffset, width, height, 6)
        .fill({ color: 0x2a2a2a })
        .stroke({ color: 0x4ec9ff, width: 1 });
    });

    button.on("pointertap", onClick);

    return button;
  }

  private showSaveSlots(): void {
    this.showingSaveSlots = true;
    this.showingLoadSlots = false;
    this.buttonContainer.visible = false;
    this.saveLoadContainer.visible = true;
    this.titleText.text = "SAVE GAME";
    this.updateSaveLoadSlots();
  }

  private showLoadSlots(): void {
    this.showingLoadSlots = true;
    this.showingSaveSlots = false;
    this.buttonContainer.visible = false;
    this.saveLoadContainer.visible = true;
    this.titleText.text = "LOAD GAME";
    this.updateSaveLoadSlots();
  }

  private updateSaveLoadSlots(): void {
    this.saveLoadContainer.removeChildren();

    // Back button
    const backButton = this.createButton("Back", -80, () => {
      this.showingSaveSlots = false;
      this.showingLoadSlots = false;
      this.buttonContainer.visible = true;
      this.saveLoadContainer.visible = false;
      this.titleText.text = "PAUSED";
    });
    this.saveLoadContainer.addChild(backButton);

    // Create slots
    const slotIds = ["slot_1", "slot_2", "slot_3"];
    slotIds.forEach((slotId, index) => {
      const slotButton = this.createSlotButton(slotId, index * 80 + 20);
      this.saveLoadContainer.addChild(slotButton);
    });
  }

  private createSlotButton(slotId: string, yOffset: number): Graphics {
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
      text: `Slot ${slotId.split("_")[1]} - ${this.showingSaveSlots ? "Save Here" : "Empty"}`,
      style: {
        fontSize: 18,
        fill: this.showingSaveSlots ? "#4ec9ff" : "#cccccc",
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
      if (this.showingSaveSlots) {
        this.callbacks.onSaveGame(slotId);
      } else {
        this.callbacks.onLoadGame(slotId);
      }
      // Return to main pause menu after action
      this.showingSaveSlots = false;
      this.showingLoadSlots = false;
      this.buttonContainer.visible = true;
      this.saveLoadContainer.visible = false;
      this.titleText.text = "PAUSED";
    });

    return button;
  }

  updateSaveSlots(saveSlots: Record<string, SaveSlot>): void {
    if (!this.showingSaveSlots && !this.showingLoadSlots) return;

    this.saveLoadContainer.removeChildren();

    // Back button
    const backButton = this.createButton("Back", -80, () => {
      this.showingSaveSlots = false;
      this.showingLoadSlots = false;
      this.buttonContainer.visible = true;
      this.saveLoadContainer.visible = false;
      this.titleText.text = "PAUSED";
    });
    this.saveLoadContainer.addChild(backButton);

    // Create slots with actual save data
    const slotIds = ["slot_1", "slot_2", "slot_3"];
    slotIds.forEach((slotId, index) => {
      const saveSlot = saveSlots[slotId];
      const slotButton = this.createSlotButtonWithData(slotId, saveSlot, index * 80 + 20);
      this.saveLoadContainer.addChild(slotButton);
    });
  }

  private createSlotButtonWithData(slotId: string, saveSlot: SaveSlot | undefined, yOffset: number): Graphics {
    const button = new Graphics();
    const width = 400;
    const height = 70;

    const isEmpty = !saveSlot;
    const canUse = this.showingSaveSlots || !isEmpty;
    const bgColor = canUse ? (isEmpty ? 0x1a1a1a : 0x2a2a2a) : 0x0a0a0a;
    const borderColor = canUse ? (this.showingSaveSlots ? 0x4ec9ff : isEmpty ? 0x666666 : 0x4ec9ff) : 0x333333;

    // Button background
    button
      .roundRect(-width / 2, yOffset, width, height, 8)
      .fill({ color: bgColor })
      .stroke({ color: borderColor, width: canUse ? (isEmpty ? 1 : 2) : 1 });

    if (isEmpty || this.showingSaveSlots) {
      // Empty slot or save mode
      const text = this.showingSaveSlots
        ? `Slot ${slotId.split("_")[1]} - Save Here`
        : `Slot ${slotId.split("_")[1]} - Empty`;
      const emptyText = new Text({
        text,
        style: {
          fontSize: 18,
          fill: this.showingSaveSlots ? "#4ec9ff" : canUse ? "#666666" : "#333333",
          align: "left",
        },
      });
      emptyText.anchor.set(0, 0.5);
      emptyText.position.set(-width / 2 + 20, yOffset + height / 2);
      button.addChild(emptyText);

      if (this.showingSaveSlots && !isEmpty) {
        // Show what will be overwritten
        const overwriteText = new Text({
          text: `(Will overwrite: ${saveSlot.name})`,
          style: {
            fontSize: 12,
            fill: "#ff8888",
          },
        });
        overwriteText.anchor.set(0, 0.5);
        overwriteText.position.set(-width / 2 + 20, yOffset + height / 2 + 20);
        button.addChild(overwriteText);
      }
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

    button.interactive = canUse;
    button.cursor = canUse ? "pointer" : "not-allowed";

    if (canUse) {
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
          .stroke({ color: borderColor, width: isEmpty ? 1 : 2 });
      });

      button.on("pointertap", () => {
        if (this.showingSaveSlots) {
          this.callbacks.onSaveGame(slotId);
        } else {
          this.callbacks.onLoadGame(slotId);
        }
        // Return to main pause menu after action
        this.showingSaveSlots = false;
        this.showingLoadSlots = false;
        this.buttonContainer.visible = true;
        this.saveLoadContainer.visible = false;
        this.titleText.text = "PAUSED";
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
  }

  hide(): void {
    this.visible = false;
    this.container.visible = false;
    // Reset to main menu when hiding
    if (this.showingSaveSlots || this.showingLoadSlots) {
      this.showingSaveSlots = false;
      this.showingLoadSlots = false;
      this.buttonContainer.visible = true;
      this.saveLoadContainer.visible = false;
      this.titleText.text = "PAUSED";
    }
  }

  isVisible(): boolean {
    return this.visible;
  }

  resize(): void {
    this.background
      .clear()
      .rect(0, 0, this.app.screen.width, this.app.screen.height)
      .fill({ color: 0x000000, alpha: 0.75 });

    this.titleText.position.set(this.app.screen.width / 2, 100);
    this.buttonContainer.position.set(this.app.screen.width / 2, 200);
    this.saveLoadContainer.position.set(this.app.screen.width / 2, 200);
  }
}
