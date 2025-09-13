import * as THREE from "three";
import { CharacterManager } from "../characters/CharacterManager";
import { Projectiles } from "../combat/Projectiles";
import { EffectsManager } from "../effects/EffectsManager";
import { Keyboard } from "../input/Keyboard";
import { CharacterSwitchUI } from "../ui/CharacterSwitchUI";
import { DialogueSystem } from "../ui/DialogueSystem";
import { DialogueUI } from "../ui/DialogueUI";
import { Hud } from "../ui/Hud";
import { SkillTreeUI } from "../ui/SkillTreeUI";
import type { Enemy } from "../world/Enemy";
import { Player } from "../world/Player";
import { Spawner } from "../world/Spawner";
import { LevelRenderer, type LevelSceneConfig } from "./LevelRenderer";
import { LevelSystem, LevelType } from "./LevelSystem";
import { Loop } from "./Loop";
import { SkillSystem } from "./SkillSystem";

export class Game {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
  readonly renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  readonly keyboard = new Keyboard();
  readonly player = new Player(this.keyboard, Math.PI * 0.25);
  readonly spawner = new Spawner(this.scene);
  readonly projectiles = new Projectiles();
  readonly levelSystem = new LevelSystem();
  readonly levelRenderer = new LevelRenderer();
  readonly effects = new EffectsManager(this.scene, this.camera);
  readonly characterManager = new CharacterManager();
  readonly dialogueSystem = new DialogueSystem();
  xpCrystals: THREE.Mesh[] = [];
  level = 1;
  xp = 0;
  xpToNext = 5;
  readonly loop = new Loop();
  readonly skillSystem = new SkillSystem();
  hud!: Hud;
  skillTreeUI!: SkillTreeUI;
  characterSwitchUI!: CharacterSwitchUI;
  dialogueUI!: DialogueUI;
  yaw = Math.PI * 0.25;
  pitch = 1.5;
  dist = 10;
  hp = 10;
  autoShootTimer = 0;
  tmp = new THREE.Vector3();
  tAccum = 0;
  autoAttack = true;
  lastDash = false;
  lastBlock = false;
  lastR = false;
  lastT = false;
  lastC = false;
  lastE = false;

  // Level progression state
  currentLevelConfig: LevelSceneConfig | null = null;
  isInSafeZone = false;
  levelCompleted = false;

  constructor(readonly root: HTMLElement) {}

  loadCurrentLevel() {
    // Clear existing scene
    while (this.scene.children.length > 0) {
      const child = this.scene.children[0];
      if (child) {
        this.scene.remove(child);
      }
    }

    // Clear existing enemies
    this.spawner.clearAll();

    const levelConfig = this.levelSystem.getCurrentLevel();
    if (!levelConfig) {
      console.error("No current level available");
      return;
    }

    // Render the level using the level renderer
    this.currentLevelConfig = this.levelRenderer.renderLevel(levelConfig);

    // Apply the rendered scene (copy objects to main scene)
    for (const child of this.currentLevelConfig.scene.children) {
      const cloned = child.clone();
      if (cloned) {
        this.scene.add(cloned);
      }
    }

    // Position player at spawn point
    this.player.mesh.position.copy(this.currentLevelConfig.playerSpawnPosition);
    this.scene.add(this.player.mesh);

    // Check if this is a safe zone
    this.isInSafeZone = levelConfig.type === LevelType.SAFE_ZONE;
    this.levelCompleted = false;

    if (!this.isInSafeZone) {
      // Spawn enemies for regular/boss levels
      this.spawnLevelEnemies();
    }

    // Update HUD with level info
    const worldName = this.getWorldName();
    const levelIndex = this.levelSystem.getCurrentLevelIndex() + 1;
    const totalLevels = this.levelSystem.getTotalLevelsInCurrentWorld();
    this.hud.setStatus(`${worldName} - Level ${levelIndex}/${totalLevels}: ${levelConfig.name}`);
  }

  spawnLevelEnemies() {
    if (!this.currentLevelConfig) return;

    // Clear existing enemies
    this.spawner.clearAll();

    // Spawn enemies based on level configuration
    for (const spawnInfo of this.currentLevelConfig.enemySpawns) {
      // For now, spawn basic enemies at the specified positions
      for (let i = 0; i < spawnInfo.count; i++) {
        this.spawner.spawnAtPosition(
          spawnInfo.position.x + (Math.random() - 0.5) * 0.5,
          spawnInfo.position.z + (Math.random() - 0.5) * 0.5,
          this // Pass game reference for AI initialization
        );
      }
    }
  }

  checkLevelCompletion() {
    if (this.levelCompleted) return;

    if (this.isInSafeZone) {
      // Check if player reached target position
      if (this.currentLevelConfig?.targetPosition) {
        const distance = this.player.mesh.position.distanceTo(this.currentLevelConfig.targetPosition);
        if (distance < 1.0) {
          this.completeLevelProgression();
        }
      }
    } else {
      // Check if all enemies are defeated
      if (this.spawner.enemies.length === 0) {
        this.completeLevelProgression();
      }
    }
  }

  completeLevelProgression() {
    this.levelCompleted = true;
    const canContinue = this.levelSystem.completeCurrentLevel();

    if (!canContinue) {
      this.hud.setStatus("Congratulations! You have completed all worlds!");
      return;
    }

    // Load next level after a short delay
    setTimeout(() => {
      this.loadCurrentLevel();
    }, 1500);
  }

  getWorldName(): string {
    const world = this.levelSystem.getCurrentWorld();
    const worldNames = ["Wrath", "Desire", "Greed", "Attachment", "Envy", "Pride"];
    return worldNames[world] || "Unknown";
  }
  doAttack(type: "easy" | "alt") {
    log("Game", "attack", type);

    // Energy cost for alt attack (easy attack is free)
    if (type === "alt") {
      const altAttackCost = 15;
      if (!this.player.consumeEnergy(altAttackCost)) {
        this.hud.setStatus("Not enough energy for Alt Attack");
        return;
      }
    }

    // choose a target if available, otherwise fire forward
    const target = this.closestEnemy();
    if (target) {
      this.tmp.copy(target.mesh.position).sub(this.player.mesh.position);
      this.tmp.y = 0;
      if (this.tmp.lengthSq() > 0.0001) this.spawnPlayerProjectile(this.tmp, type);
    } else {
      // fire in player facing direction
      const f = new THREE.Vector3(-Math.cos(this.player.yaw), 0, -Math.sin(this.player.yaw));
      this.spawnPlayerProjectile(f, type);
    }
    this.hud.setStatus(`Attack: ${type}`);
  }

  spawnPlayerProjectile(dir: THREE.Vector3, kind: "easy" | "alt" = "easy") {
    const origin = this.player.mesh.position.clone().add(new THREE.Vector3(0, 0.4, 0));
    this.projectiles.add(origin, dir, true, this.scene);
    log("Game", "attack-fired", kind);
  }

  doDash() {
    if (this.lastDash) return; // only trigger on edge
    this.lastDash = true;
    const started = this.player.startDash();
    if (started) {
      log("Game", "dash");
      this.hud.setStatus("Dash!");
      // Add dash visual effects
      this.effects.dashEffect(this.player.mesh.position);
    } else {
      log("Game", "dash-failed-cooldown");
    }
  }

  doBlock() {
    if (this.lastBlock) return;
    this.lastBlock = true;
    log("Game", "block");
    // toggle player shield
    const newState = !this.player.shieldActive;
    this.player.setShield(newState);
    this.hud.setStatus(newState ? "Block!" : "Block off");
    // Add block visual effects when activating
    if (newState) {
      this.effects.blockEffect(this.player.mesh.position);
    }
  }
  
  startDialogue() {
    log("Game", "dialogue-start");
    this.hud.setStatus("Starting dialogue...");
    this.dialogueUI.startDialogue("greeting");
  }

  async init() {
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.domElement.style.display = "block";
    this.root.prepend(this.renderer.domElement);

    this.camera.position.set(3, 13.5, 4.5);
    this.camera.lookAt(0, 0.6, 0);

    // world pieces
    const ground = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 0.2, 40),
      new THREE.MeshStandardMaterial({ color: "#111318", roughness: 0.9 }),
    );
    ground.position.y = -0.1;
    this.scene.add(ground);
    const light = new THREE.DirectionalLight("#ffffff", 2.2);
    light.position.set(4, 6, 3);
    this.scene.add(light);
    this.scene.add(new THREE.AmbientLight("#404040", 0.6));

    // add player
    this.scene.add(this.player.mesh);
    this.spawner.spawn(5, this);

    // pixi hud
    const hudApp = new (await import("pixi.js")).Application();
    await hudApp.init({ backgroundAlpha: 0, antialias: true, resizeTo: window });
    hudApp.canvas.style.position = "fixed";
    hudApp.canvas.style.top = "0";
    hudApp.canvas.style.left = "0";
    hudApp.canvas.style.pointerEvents = "none";
    this.root.append(hudApp.canvas);
    this.hud = new Hud(hudApp);
    this.hud.setHealth(this.hp, 10);
    this.hud.setEnergy(this.player.energy, this.player.maxEnergy);
    this.hud.setXP(this.level, this.xp, this.xpToNext);
    this.hud.setSkillPoints(this.skillSystem.getSkillPoints());
    this.hud.setCurrentCharacter("Helio", "#4ec9ff");

    // Initialize skill UI components
    this.skillTreeUI = new SkillTreeUI(hudApp, this.skillSystem);
    this.characterSwitchUI = new CharacterSwitchUI(hudApp, this.skillSystem);
    
    // Initialize dialogue UI
    this.dialogueUI = new DialogueUI(hudApp, this.dialogueSystem);

    // Load the first level after HUD is ready
    this.loadCurrentLevel();

    // UI button bindings
    this.hud.onAuto = (v) => {
      this.autoAttack = v;
    };
    this.hud.onEasy = () => this.doAttack("easy");
    this.hud.onAlt = () => this.doAttack("alt");
    this.hud.onDash = () => this.doDash();
    this.hud.onBlock = () => this.doBlock();
    this.hud.onSkills = () => this.showSkillTree();
    this.hud.onCharacterSwitch = () => this.showCharacterSwitch();
    this.hud.onDialogue = () => this.startDialogue();

    addEventListener("resize", () => this.onResize());
    this.loop.add((dt) => this.update(dt));
    this.loop.start();

    // Setup skill system event handlers
    this.setupSkillSystemHandlers();
  }

  setupSkillSystemHandlers(): void {
    this.skillSystem.onSkillPointsChange = (skillPoints) => {
      this.hud.setSkillPoints(skillPoints);
    };

    this.skillSystem.onCharacterChange = (characterId) => {
      const character = this.skillSystem.getCharacter(characterId);
      this.hud.setCurrentCharacter(character.data.name, character.data.color);
      this.hud.setStatus(`Switched to ${character.data.name}`);
    };

    this.skillTreeUI.onClose = () => {
      // Resume game when skill tree is closed
    };

    this.characterSwitchUI.onClose = () => {
      // Resume game when character switch is closed
    };

    this.characterSwitchUI.onCharacterSwitch = () => {
      // Character switching is handled by the skill system
    };
  }

  showSkillTree(): void {
    this.skillTreeUI.show();
  }

  showCharacterSwitch(): void {
    this.characterSwitchUI.show();
  }

  // (removed duplicate and misplaced code)
  onResize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();

    // Resize skill UI components
    if (this.skillTreeUI) {
      this.skillTreeUI.resize();
    }
    if (this.characterSwitchUI) {
      this.characterSwitchUI.resize();
    }
  }
  update(dt: number) {
    this.player.update(dt);
    this.spawner.update(dt); // Update enemy AI
    this.projectiles.update(
      dt,
      this.scene,
      this.player,
      this.spawner.enemies,
      () => this.playerHit(),
      (e) => this.removeEnemy(e),
      this.effects, // Pass effects manager
    );
    // Keyboard dash/block (edge-triggered)
    if (this.keyboard.dash) {
      this.doDash();
    } else {
      this.lastDash = false;
    }
    if (this.keyboard.block) {
      this.doBlock();
    } else {
      this.lastBlock = false;
    }

    // Character system controls
    if (this.keyboard.has("r")) {
      if (!this.lastR) {
        this.toggleSafeZone();
        this.lastR = true;
      }
    } else {
      this.lastR = false;
    }

    if (this.keyboard.has("t")) {
      if (!this.lastT) {
        this.demonstrateCharacterInteraction();
        this.lastT = true;
      }
    } else {
      this.lastT = false;
    }

    if (this.keyboard.has("c")) {
      if (!this.lastC) {
        this.switchToNextCharacter();
        this.lastC = true;
      }
    } else {
      this.lastC = false;
    }
    
    // Dialogue system input handling
    if (this.dialogueSystem.isActive()) {
      // Handle number key presses for dialogue options
      for (let i = 1; i <= 9; i++) {
        if (this.keyboard.has(i.toString())) {
          this.dialogueUI.handleKeyPress(i.toString());
          break;
        }
      }
      // Handle space/enter for skipping typing animation
      if (this.keyboard.has(" ") || this.keyboard.has("enter")) {
        this.dialogueUI.handleKeyPress(" ");
      }
    } else {
      // Only allow starting dialogue when not already in one
      if (this.keyboard.has("e")) {
        if (!this.lastE) {
          this.startDialogue();
          this.lastE = true;
        }
      } else {
        this.lastE = false;
      }
    }
    if (this.autoAttack) this.autoShoot(dt);
    // collect XP crystals when near
    for (let i = this.xpCrystals.length - 1; i >= 0; i--) {
      const c = this.xpCrystals[i];
      if (!c) continue;
      if (c.position.distanceTo(this.player.mesh.position) < 0.8) {
        this.collectXP(i);
      }
    }

    // Check level completion
    this.checkLevelCompletion();

    // Only spawn new waves if not in a safe zone and level system allows it
    if (!this.isInSafeZone && this.currentLevelConfig && !this.levelCompleted) {
      this.spawner.ensureWave(5, this);
    }

    // Update effects system first
    const p = this.player.mesh.position;
    const baseCameraPos = new THREE.Vector3(
      p.x + Math.cos(this.yaw) * this.dist,
      p.y + 3.5 * this.pitch,
      p.z + Math.sin(this.yaw) * this.dist,
    );
    this.effects.update(dt, baseCameraPos);

    // Update camera (effects may modify camera position for shake)
    this.updateCamera();
    this.renderer.render(this.scene, this.camera);
    this.updateHud();
    if (this.hp <= 0) this.respawn();
  }
  updateCamera() {
    const p = this.player.mesh.position;
    // Only set camera position if camera shake is not active
    if (!this.effects.isShaking()) {
      this.camera.position.set(
        p.x + Math.cos(this.yaw) * this.dist,
        p.y + 3.5 * this.pitch,
        p.z + Math.sin(this.yaw) * this.dist,
      );
    }
    this.camera.lookAt(p.x, p.y + 0.4, p.z);
  }

  removeEnemy(e: Enemy) {
    // spawn XP crystal at enemy position
    const pos = e.mesh.position.clone();
    // Add enemy death visual effects
    this.effects.enemyHitEffect(pos);
    this.spawner.remove(e);
    this.spawnXP(pos);
  }

  spawnXP(pos: THREE.Vector3) {
    const geo = new THREE.SphereGeometry(0.18, 8, 6);
    const mat = new THREE.MeshStandardMaterial({ color: "#7af", emissive: "#58b" });
    const m = new THREE.Mesh(geo, mat);
    m.position.copy(pos).y += 0.2;
    this.scene.add(m);
    this.xpCrystals.push(m);
  }

  collectXP(index: number) {
    const c = this.xpCrystals[index];
    if (!c) return;
    // Add XP collection visual effects
    this.effects.xpCollectEffect(c.position);
    this.scene.remove(c);
    this.xpCrystals.splice(index, 1);
    this.xp += 1;
    if (this.xp >= this.xpToNext) {
      this.level += 1;
      this.xp = 0;
      this.xpToNext = Math.floor(this.xpToNext * 1.4) + 2;
      this.hud.setStatus(`Leveled to ${this.level}`);

      // Notify skill system of level up
      this.skillSystem.onLevelUp(this.level);
    }
    this.hud.setXP(this.level, this.xp, this.xpToNext);
  }
  autoShoot(dt: number) {
    this.autoShootTimer -= dt;
    if (this.autoShootTimer <= 0) {
      const target = this.closestEnemy();
      if (target) {
        this.tmp.copy(target.mesh.position).sub(this.player.mesh.position);
        this.tmp.y = 0;
        if (this.tmp.lengthSq() > 0.001) this.spawnPlayerProjectile(this.tmp, "easy");
        this.autoShootTimer = 0.5;
      }
    }
  }
  closestEnemy() {
    let best: Enemy | undefined;
    let bestD = Infinity;
    for (const e of this.spawner.enemies) {
      const d = e.mesh.position.distanceTo(this.player.mesh.position);
      if (d < bestD) {
        bestD = d;
        best = e;
      }
    }
    return best;
  }
  updateHud() {
    const activeChar = this.characterManager.getActiveCharacter();
    const partyCount = this.characterManager.getPartyMembers().length;

    this.hud.setStatus(
      `HP:${this.hp} Energy:${Math.floor(this.player.energy)} Enemies:${this.spawner.enemies.length} Proj:${this.projectiles.list.length} ` +
        `Active:${activeChar?.name || "None"} Party:${partyCount} FPS:${this.loop.fps.toFixed(0)}`,
    );
    this.hud.setEnergy(this.player.energy, this.player.maxEnergy);
  }
  respawn() {
    this.hud.setStatus("You Died - Respawning");
    this.hp = 10;

    // Reset to start of Wrath world
    this.levelSystem.reset();
    this.loadCurrentLevel();

    // Reset XP/level
    this.level = 1;
    this.xp = 0;
    this.xpToNext = 5;
    this.hud.setXP(this.level, this.xp, this.xpToNext);

    // Reset skill system on death
    this.skillSystem.reset();
    this.hud.setSkillPoints(this.skillSystem.getSkillPoints());
    this.hud.setCurrentCharacter("Helio", "#4ec9ff");
  }

  // Character interaction methods
  toggleSafeZone() {
    if (this.characterManager.getAvailableForInteraction().length === 0) {
      // Enter safe zone
      this.characterManager.enterSafeZone();

      // Demo: unlock companion characters after some time
      if (this.level >= 2) {
        this.characterManager.unlockCharacter("kai");
        this.characterManager.addToParty("kai");
      }
      if (this.level >= 4) {
        this.characterManager.unlockCharacter("iris");
        this.characterManager.addToParty("iris");
      }
      if (this.level >= 6) {
        this.characterManager.unlockCharacter("lucy");
        this.characterManager.addToParty("lucy");
      }

      this.hud.setStatus("Entered Safe Zone - Press T to interact with characters");
    } else {
      // Exit safe zone
      this.characterManager.exitSafeZone();
      this.hud.setStatus("Exited Safe Zone");
    }
  }

  demonstrateCharacterInteraction() {
    const availableChars = this.characterManager.getAvailableForInteraction();
    if (availableChars.length === 0) {
      this.hud.setStatus("No characters available for interaction");
      return;
    }

    // Find the first character we can interact with (not ourselves)
    const activeChar = this.characterManager.getActiveCharacter();
    const targetChar = availableChars.find((char) => char !== activeChar?.type);

    if (!targetChar) {
      this.hud.setStatus("No other characters available for interaction");
      return;
    }

    // Get available interaction options
    const options = this.characterManager.getInteractionOptions(targetChar);
    if (options.length === 0) {
      this.hud.setStatus(`No interaction options available for ${targetChar}`);
      return;
    }

    // Use the first available interaction
    const firstOption = options[0];
    if (!firstOption) {
      this.hud.setStatus("No interaction options available");
      return;
    }

    const result = this.characterManager.interact(targetChar, firstOption.id);

    if (result.success) {
      let message = result.message;

      if (result.skillsUnlocked && result.skillsUnlocked.length > 0) {
        message += ` | New skills unlocked: ${result.skillsUnlocked.join(", ")}`;
      }

      if (result.traitsUnlocked && result.traitsUnlocked.length > 0) {
        message += ` | New traits unlocked: ${result.traitsUnlocked.join(", ")}`;
      }

      this.hud.setStatus(message);

      // Log relationship summary
      log("Game", this.characterManager.getRelationshipSummary(activeChar?.type || "helios"));
    } else {
      this.hud.setStatus(result.message);
    }
  }

  switchToNextCharacter() {
    const partyMembers = this.characterManager.getPartyMembers();
    if (partyMembers.length <= 1) {
      this.hud.setStatus("Only one character in party");
      return;
    }

    const activeChar = this.characterManager.getActiveCharacter();
    const currentIndex = partyMembers.findIndex((char) => char.type === activeChar?.type);
    const nextIndex = (currentIndex + 1) % partyMembers.length;
    const nextChar = partyMembers[nextIndex];

    if (!nextChar) {
      this.hud.setStatus("Error switching character");
      return;
    }

    if (this.characterManager.switchCharacter(nextChar.type)) {
      this.hud.setStatus(`Switched to ${nextChar.name}`);

      // Show character stats
      const stats = nextChar.getEffectiveStats();
      log("Game", `${nextChar.name} stats:`, stats);

      // Show available skills
      const skills = nextChar.getAvailableSkills();
      if (skills.length > 0) {
        log(
          "Game",
          `${nextChar.name} available skills:`,
          skills.map((s) => s.name),
        );
      }

      // Show available traits
      const traits = nextChar.getAvailablePassiveTraits();
      if (traits.length > 0) {
        log(
          "Game",
          `${nextChar.name} active traits:`,
          traits.map((t) => t.name),
        );
      }
    }
  }

  playerHit() {
    this.hp -= 1;
    log("Game", "player-hit", this.hp);
    this.hud.setHealth(this.hp, 10);
    // Add player hit visual effects
    this.effects.playerHitEffect(this.player.mesh.position);
    if (this.hp <= 0) {
      // Don't reset XP/level immediately, wait for respawn
    }
  }

  // Damage dealing methods for AI to use
  damagePlayer(amount: number) {
    if (this.player.shieldActive) {
      log("Game", "player-damage-blocked", amount);
      return;
    }
    this.hp -= amount;
    log("Game", "player-damaged", amount, this.hp);
    this.hud.setHealth(this.hp, 10);
    if (this.hp <= 0) {
      this.level = 1;
      this.xp = 0;
      this.xpToNext = 5;
      this.hud.setXP(this.level, this.xp, this.xpToNext);
    }
  }

  damageEnemy(enemy: Enemy, amount: number) {
    const killed = enemy.takeDamage(amount);
    if (killed) {
      this.removeEnemy(enemy);
    }
  }
}
