import { Application, Container, Graphics, Text } from "pixi.js";
import type { CharacterType } from "../core/Character";
import type { SkillSystem } from "../core/SkillSystem";

export class CharacterSwitchUI {
  private app: Application;
  private skillSystem: SkillSystem;
  private container: Container;
  private isVisible = false;
  
  public onClose?: () => void;
  public onCharacterSwitch?: (characterId: CharacterType) => void;

  constructor(app: Application, skillSystem: SkillSystem) {
    this.app = app;
    this.skillSystem = skillSystem;
    this.container = new Container();
    this.container.visible = false;
    this.app.stage.addChild(this.container);
    
    this.createUI();
  }

  private createUI(): void {
    this.createBackground();
    this.createCharacterButtons();
    this.createCloseButton();
  }

  private createBackground(): void {
    const bg = new Graphics();
    bg.beginFill(0x000000, 0.8);
    bg.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    bg.endFill();
    bg.eventMode = "static";
    bg.cursor = "pointer";
    
    // Close when clicking background
    bg.on("pointerdown", () => this.hide());
    
    this.container.addChildAt(bg, 0);
  }

  private createCharacterButtons(): void {
    const characters = this.skillSystem.getAllCharacters();
    const currentChar = this.skillSystem.getCurrentCharacterType();
    
    // Title
    const titleText = new Text({
      text: "Switch Character",
      style: { fill: "#ffffff", fontSize: 24, fontWeight: "bold" }
    });
    titleText.anchor.set(0.5, 0);
    titleText.x = this.app.screen.width / 2;
    titleText.y = 50;
    this.container.addChild(titleText);
    
    const buttonWidth = 180;
    const buttonHeight = 120;
    const buttonsPerRow = Math.min(2, characters.length);
    const totalWidth = buttonsPerRow * buttonWidth + (buttonsPerRow - 1) * 20;
    const startX = (this.app.screen.width - totalWidth) / 2;
    
    characters.forEach((character, index) => {
      const row = Math.floor(index / buttonsPerRow);
      const col = index % buttonsPerRow;
      
      const button = new Container();
      button.x = startX + col * (buttonWidth + 20);
      button.y = 150 + row * (buttonHeight + 20);
      
      // Button background
      const bg = new Graphics();
      const isCurrentChar = character.data.id === currentChar;
      const isUnlocked = character.skillState.isUnlocked;
      
      if (!isUnlocked) {
        bg.beginFill(0x333333, 0.5);
      } else if (isCurrentChar) {
        bg.beginFill(parseInt(character.data.color.replace('#', ''), 16), 0.8);
      } else {
        bg.beginFill(0x666666, 0.7);
      }
      
      bg.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 12);
      bg.endFill();
      
      // Add border for current character
      if (isCurrentChar && isUnlocked) {
        bg.lineStyle(3, 0xffffff, 1);
        bg.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 12);
      }
      
      button.addChild(bg);
      
      // Character name
      const nameText = new Text({
        text: character.data.name,
        style: { 
          fill: isUnlocked ? "#ffffff" : "#888888", 
          fontSize: 18, 
          fontWeight: "bold",
          align: "center"
        }
      });
      nameText.anchor.set(0.5);
      nameText.x = buttonWidth / 2;
      nameText.y = 30;
      button.addChild(nameText);
      
      // Character description
      const descText = new Text({
        text: character.data.description,
        style: { 
          fill: isUnlocked ? "#cccccc" : "#666666", 
          fontSize: 12,
          align: "center",
          wordWrap: true,
          wordWrapWidth: buttonWidth - 20
        }
      });
      descText.anchor.set(0.5);
      descText.x = buttonWidth / 2;
      descText.y = 70;
      button.addChild(descText);
      
      // Status text
      let statusText = "";
      let statusColor = "#888888";
      
      if (!isUnlocked) {
        statusText = "LOCKED";
        statusColor = "#ff8888";
      } else if (isCurrentChar) {
        statusText = "CURRENT";
        statusColor = "#88ff88";
      } else {
        statusText = "AVAILABLE";
        statusColor = "#88ccff";
      }
      
      const status = new Text({
        text: statusText,
        style: { 
          fill: statusColor, 
          fontSize: 11, 
          fontWeight: "bold",
          align: "center"
        }
      });
      status.anchor.set(0.5);
      status.x = buttonWidth / 2;
      status.y = buttonHeight - 20;
      button.addChild(status);
      
      // Make interactive if unlocked and not current
      if (isUnlocked && !isCurrentChar) {
        button.eventMode = "static";
        button.cursor = "pointer";
        
        button.on("pointerdown", () => {
          if (this.skillSystem.switchCharacter(character.data.id)) {
            this.onCharacterSwitch?.(character.data.id);
            this.hide();
          }
        });
        
        // Hover effect
        button.on("pointerover", () => {
          bg.clear();
          bg.beginFill(parseInt(character.data.color.replace('#', ''), 16), 0.9);
          bg.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 12);
          bg.endFill();
        });
        
        button.on("pointerout", () => {
          bg.clear();
          bg.beginFill(0x666666, 0.7);
          bg.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 12);
          bg.endFill();
        });
      }
      
      this.container.addChild(button);
    });
  }

  private createCloseButton(): void {
    const closeBtn = new Graphics();
    closeBtn.beginFill(0xff4444, 0.8);
    closeBtn.drawRoundedRect(0, 0, 30, 30, 4);
    closeBtn.endFill();
    
    closeBtn.x = this.app.screen.width - 50;
    closeBtn.y = 20;
    closeBtn.eventMode = "static";
    closeBtn.cursor = "pointer";
    closeBtn.on("pointerdown", () => this.hide());
    
    // Add X text
    const closeText = new Text({
      text: "×",
      style: { fill: "#ffffff", fontSize: 20, fontWeight: "bold" }
    });
    closeText.anchor.set(0.5);
    closeText.x = 15;
    closeText.y = 15;
    closeBtn.addChild(closeText);
    
    this.container.addChild(closeBtn);
  }

  show(): void {
    this.isVisible = true;
    this.container.visible = true;
    
    // Recreate buttons to reflect current state
    this.container.removeChildren();
    this.createUI();
  }

  hide(): void {
    this.isVisible = false;
    this.container.visible = false;
    this.onClose?.();
  }

  resize(): void {
    if (this.isVisible) {
      // Recreate UI with new dimensions
      this.container.removeChildren();
      this.createUI();
    }
  }
}