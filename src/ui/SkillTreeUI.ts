import { type Application, Container, Graphics, Text } from "pixi.js";
import type { CharacterType } from "../core/Character";
import type { SkillSystem } from "../core/SkillSystem";

interface SkillWithState {
  id: string;
  name: string;
  description: string;
  currentLevel: number;
  maxLevel: number;
  canUpgrade: boolean;
  upgradeCost: number;
}

export class SkillTreeUI {
  private readonly app: Application;
  private readonly skillSystem: SkillSystem;
  private readonly container: Container;
  private isVisible = false;
  private currentCharacter: CharacterType = "helio";
  private readonly skillButtons: Map<string, Container> = new Map();

  // UI state
  private readonly skillPointsText: Text;
  private readonly characterTabs: Map<CharacterType, Container> = new Map();
  private readonly skillTreeContainer: Container;

  public onClose?: () => void;

  constructor(app: Application, skillSystem: SkillSystem) {
    this.app = app;
    this.skillSystem = skillSystem;
    this.container = new Container();
    this.container.visible = false;
    this.app.stage.addChild(this.container);

    // Create skill points display
    this.skillPointsText = new Text({
      text: `Skill Points: ${skillSystem.getSkillPoints()}`,
      style: { fill: "#ffffff", fontSize: 20, fontWeight: "bold" },
    });
    this.skillPointsText.x = 20;
    this.skillPointsText.y = 20;
    this.container.addChild(this.skillPointsText);

    // Create skill tree container
    this.skillTreeContainer = new Container();
    this.skillTreeContainer.y = 80;
    this.container.addChild(this.skillTreeContainer);

    this.createUI();
    this.setupEventListeners();
  }

  private createUI(): void {
    this.createBackground();
    this.createCharacterTabs();
    this.createCloseButton();
    this.updateSkillTree();
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

  private createCharacterTabs(): void {
    const characters = this.skillSystem.getAllCharacters();
    const tabWidth = 120;
    const tabHeight = 50;

    characters.forEach((character, index) => {
      const tab = new Container();
      tab.x = 20 + index * (tabWidth + 10);
      tab.y = 60;

      // Tab background
      const bg = new Graphics();
      const isActive = character.type === this.currentCharacter;
      const isUnlocked = character.skillState.isUnlocked;

      if (!isUnlocked) {
        bg.beginFill(0x333333, 0.5);
      } else if (isActive) {
        bg.beginFill(0x4a90e2, 0.9);
      } else {
        bg.beginFill(0x666666, 0.7);
      }

      bg.drawRoundedRect(0, 0, tabWidth, tabHeight, 8);
      bg.endFill();

      // Add border for active tab
      if (isActive) {
        bg.lineStyle(2, 0xffffff, 0.8);
        bg.drawRoundedRect(0, 0, tabWidth, tabHeight, 8);
      }

      tab.addChild(bg);

      // Character name
      const nameText = new Text({
        text: character.data.name,
        style: {
          fill: isUnlocked ? "#ffffff" : "#888888",
          fontSize: 14,
          fontWeight: "bold",
          align: "center",
        },
      });
      nameText.anchor.set(0.5);
      nameText.x = tabWidth / 2;
      nameText.y = tabHeight / 2;
      tab.addChild(nameText);

      // Make tab interactive if unlocked
      if (isUnlocked) {
        tab.eventMode = "static";
        tab.cursor = "pointer";
        tab.on("pointerdown", () => {
          this.currentCharacter = character.type;
          this.updateCharacterTabs();
          this.updateSkillTree();
        });
      }

      this.characterTabs.set(character.type, tab);
      this.container.addChild(tab);
    });
  }

  private updateCharacterTabs(): void {
    this.characterTabs.forEach((tab, characterId) => {
      const character = this.skillSystem.getCharacter(characterId);
      const isActive = characterId === this.currentCharacter;
      const isUnlocked = character.skillState.isUnlocked;

      // Update background
      const bg = tab.children[0] as Graphics;
      bg.clear();

      if (!isUnlocked) {
        bg.beginFill(0x333333, 0.5);
      } else if (isActive) {
        bg.beginFill(0x4a90e2, 0.9);
      } else {
        bg.beginFill(0x666666, 0.7);
      }

      bg.drawRoundedRect(0, 0, 120, 50, 8);
      bg.endFill();

      if (isActive) {
        bg.lineStyle(2, 0xffffff, 0.8);
        bg.drawRoundedRect(0, 0, 120, 50, 8);
      }
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
      style: { fill: "#ffffff", fontSize: 20, fontWeight: "bold" },
    });
    closeText.anchor.set(0.5);
    closeText.x = 15;
    closeText.y = 15;
    closeBtn.addChild(closeText);

    this.container.addChild(closeBtn);
  }

  private updateSkillTree(): void {
    // Clear existing skill tree
    this.skillTreeContainer.removeChildren();
    this.skillButtons.clear();

    const skillsWithState = this.skillSystem.getCharacterSkillsWithState(this.currentCharacter);
    const categories = [
      { name: "Light Attack", skills: skillsWithState.lightAttack, color: 0x4ec9ff },
      { name: "Heavy Attack", skills: skillsWithState.heavyAttack, color: 0xff4e4e },
      { name: "Block", skills: skillsWithState.block, color: 0x4eff4e },
      { name: "Dodge", skills: skillsWithState.dodge, color: 0xffff4e },
      { name: "Unique Skills", skills: skillsWithState.unique, color: 0xff4eff },
    ];

    let yOffset = 0;
    const categorySpacing = 160;

    categories.forEach((category) => {
      if (category.skills.isEmpty) return;

      // Category header
      const categoryHeader = new Text({
        text: category.name,
        style: { fill: "#ffffff", fontSize: 18, fontWeight: "bold" },
      });
      categoryHeader.x = 20;
      categoryHeader.y = yOffset;
      this.skillTreeContainer.addChild(categoryHeader);

      yOffset += 40;

      // Skills in this category
      category.skills.forEach((skill, index) => {
        const skillContainer = this.createSkillButton(skill, category.color);
        skillContainer.x = 40 + index * 180;
        skillContainer.y = yOffset;
        this.skillTreeContainer.addChild(skillContainer);
        this.skillButtons.set(skill.id, skillContainer);
      });

      yOffset += categorySpacing;
    });
  }

  private createSkillButton(skill: SkillWithState, categoryColor: number): Container {
    const container = new Container();

    // Skill background
    const bg = new Graphics();
    const canUpgrade = skill.canUpgrade && this.skillSystem.getSkillPoints() >= skill.upgradeCost;
    const isMaxLevel = skill.currentLevel >= skill.maxLevel;

    let bgColor = 0x333333;
    if (isMaxLevel) {
      bgColor = 0x228b22; // Green for maxed skills
    } else if (skill.currentLevel > 0) {
      bgColor = 0x4a4a4a; // Gray for partially upgraded
    }

    bg.beginFill(bgColor, 0.8);
    bg.drawRoundedRect(0, 0, 160, 120, 8);
    bg.endFill();

    // Add border if can upgrade
    if (canUpgrade && !isMaxLevel) {
      bg.lineStyle(2, categoryColor, 0.8);
      bg.drawRoundedRect(0, 0, 160, 120, 8);
    }

    container.addChild(bg);

    // Skill name
    const nameText = new Text({
      text: skill.name,
      style: { fill: "#ffffff", fontSize: 12, fontWeight: "bold", wordWrap: true, wordWrapWidth: 150 },
    });
    nameText.x = 8;
    nameText.y = 8;
    container.addChild(nameText);

    // Skill level
    const levelText = new Text({
      text: `${skill.currentLevel}/${skill.maxLevel}`,
      style: { fill: "#ffff00", fontSize: 11 },
    });
    levelText.x = 8;
    levelText.y = 35;
    container.addChild(levelText);

    // Skill description
    const descText = new Text({
      text: skill.description,
      style: { fill: "#cccccc", fontSize: 9, wordWrap: true, wordWrapWidth: 144 },
    });
    descText.x = 8;
    descText.y = 55;
    container.addChild(descText);

    // Upgrade cost (if not maxed)
    if (!isMaxLevel) {
      const costText = new Text({
        text: `Cost: ${skill.upgradeCost}`,
        style: { fill: canUpgrade ? "#00ff00" : "#ff8888", fontSize: 10 },
      });
      costText.x = 8;
      costText.y = 100;
      container.addChild(costText);
    }

    // Make interactive if can upgrade
    if (canUpgrade && !isMaxLevel) {
      container.eventMode = "static";
      container.cursor = "pointer";
      container.on("pointerdown", () => {
        if (this.skillSystem.upgradeSkill(this.currentCharacter, skill.id)) {
          this.updateSkillTree();
          this.updateSkillPoints();
        }
      });
    }

    return container;
  }

  private updateSkillPoints(): void {
    this.skillPointsText.text = `Skill Points: ${this.skillSystem.getSkillPoints()}`;
  }

  private setupEventListeners(): void {
    // Listen to skill system events
    this.skillSystem.onSkillPointsChange = () => {
      this.updateSkillPoints();
      if (this.isVisible) {
        this.updateSkillTree(); // Refresh upgrade availability
      }
    };

    this.skillSystem.onCharacterUnlock = () => {
      this.updateCharacterTabs();
    };
  }

  show(): void {
    this.isVisible = true;
    this.container.visible = true;
    this.currentCharacter = this.skillSystem.getCurrentCharacterType();
    this.updateCharacterTabs();
    this.updateSkillTree();
    this.updateSkillPoints();
  }

  hide(): void {
    this.isVisible = false;
    this.container.visible = false;
    this.onClose?.();
  }

  resize(): void {
    // Update background size
    const bg = this.container.children[0] as Graphics;
    bg.clear();
    bg.beginFill(0x000000, 0.8);
    bg.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    bg.endFill();
    bg.eventMode = "static";

    // Update close button position
    const closeBtn = this.container.children[this.container.children.length - 1];
    if (closeBtn) {
      closeBtn.x = this.app.screen.width - 50;
    }
  }
}
