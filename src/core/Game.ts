import * as THREE from "three";
import { CharacterManager } from "../characters/CharacterManager";
import { Projectiles } from "../combat/Projectiles";
import { Keyboard } from "../input/Keyboard";
import { Hud } from "../ui/Hud";
import type { Enemy } from "../world/Enemy";
import { Player } from "../world/Player";
import { Spawner } from "../world/Spawner";
import { Loop } from "./Loop";

export class Game {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
  readonly renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  readonly keyboard = new Keyboard();
  readonly player = new Player(this.keyboard, Math.PI * 0.25);
  readonly spawner = new Spawner(this.scene);
  readonly projectiles = new Projectiles();
  readonly characterManager = new CharacterManager();
  xpCrystals: THREE.Mesh[] = [];
  level = 1;
  xp = 0;
  xpToNext = 5;
  readonly loop = new Loop();
  hud!: Hud;
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

  constructor(readonly root: HTMLElement) {}
  doAttack(type: "easy" | "alt") {
    log("Game", "attack", type);
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
  }

  async init() {
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.domElement.style.display = "block";
    this.root.prepend(this.renderer.domElement);
    this.scene.background = new THREE.Color("#050507");
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
    this.spawner.spawn(5);

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
    this.hud.setXP(this.level, this.xp, this.xpToNext);

    // UI button bindings
    this.hud.onAuto = (v) => {
      this.autoAttack = v;
    };
    this.hud.onEasy = () => this.doAttack("easy");
    this.hud.onAlt = () => this.doAttack("alt");
    this.hud.onDash = () => this.doDash();
    this.hud.onBlock = () => this.doBlock();

    addEventListener("resize", () => this.onResize());
    this.loop.add((dt, t) => this.update(dt, t));
    this.loop.start();
  }

  // (removed duplicate and misplaced code)
  onResize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }
  update(dt: number, t: number) {
    this.player.update(dt);
    this.stepEnemies(dt, t);
    this.projectiles.update(
      dt,
      this.scene,
      this.player,
      this.spawner.enemies,
      () => this.playerHit(),
      (e) => this.removeEnemy(e),
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
    if (this.autoAttack) this.autoShoot(dt);
    // collect XP crystals when near
    for (let i = this.xpCrystals.length - 1; i >= 0; i--) {
      const c = this.xpCrystals[i];
      if (!c) continue;
      if (c.position.distanceTo(this.player.mesh.position) < 0.8) {
        this.collectXP(i);
      }
    }
    this.updateCamera();
    this.renderer.render(this.scene, this.camera);
    this.updateHud();
    if (this.hp <= 0) this.respawn();
  }
  updateCamera() {
    const p = this.player.mesh.position;
    this.camera.position.set(
      p.x + Math.cos(this.yaw) * this.dist,
      p.y + 3.5 * this.pitch,
      p.z + Math.sin(this.yaw) * this.dist,
    );
    this.camera.lookAt(p.x, p.y + 0.4, p.z);
  }
  stepEnemies(dt: number, t: number) {
    const minPlayerDist = 0.9;
    const separation = 0.6;
    for (let i = 0; i < this.spawner.enemies.length; i++) {
      const e = this.spawner.enemies[i];
      if (!e || e.dead) continue;
      // move towards player but maintain a minimum distance
      this.tmp.copy(this.player.mesh.position).sub(e.mesh.position);
      this.tmp.y = 0;
      const d = this.tmp.length();
      if (d > minPlayerDist) {
        this.tmp.normalize();
        e.mesh.position.addScaledVector(this.tmp, dt * 1.2);
      }
      // simple separation from other enemies
      for (let j = 0; j < this.spawner.enemies.length; j++) {
        if (i === j) continue;
        const o = this.spawner.enemies[j];
        if (!o) continue;
        const dist = e.mesh.position.distanceTo(o.mesh.position);
        if (dist < separation && dist > 0.001) {
          const dir = e.mesh.position.clone().sub(o.mesh.position).setY(0).normalize();
          e.mesh.position.addScaledVector(dir, (separation - dist) * 0.5);
        }
      }
      if (t > e.tShoot) {
        this.projectiles.add(
          e.mesh.position.clone(),
          this.tmp.set(
            this.player.mesh.position.x - e.mesh.position.x,
            0,
            this.player.mesh.position.z - e.mesh.position.z,
          ),
          false,
          this.scene,
        );
        e.tShoot = t + 900 + Math.random() * 600;
      }
    }
    this.spawner.ensureWave(5);
  }
  removeEnemy(e: Enemy) {
    // spawn XP crystal at enemy position
    const pos = e.mesh.position.clone();
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
    this.scene.remove(c);
    this.xpCrystals.splice(index, 1);
    this.xp += 1;
    if (this.xp >= this.xpToNext) {
      this.level += 1;
      this.xp = 0;
      this.xpToNext = Math.floor(this.xpToNext * 1.4) + 2;
      this.hud.setStatus(`Leveled to ${this.level}`);
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
      `HP:${this.hp} Enemies:${this.spawner.enemies.length} Proj:${this.projectiles.list.length} ` +
        `Active:${activeChar?.name || "None"} Party:${partyCount} FPS:${this.loop.fps.toFixed(0)}`,
    );
  }
  respawn() {
    this.hud.setStatus("You Died - Respawning");
    this.hp = 10;
    this.player.mesh.position.set(0, 0.4, 0);
  }

  // Character interaction methods
  toggleSafeZone() {
    if (this.characterManager.getAvailableForInteraction().length === 0) {
      // Enter safe zone
      this.characterManager.enterSafeZone();

      // Demo: unlock companion characters after some time
      if (this.level >= 2) {
        this.characterManager.unlockCharacter("companion1");
        this.characterManager.addToParty("companion1");
      }
      if (this.level >= 4) {
        this.characterManager.unlockCharacter("companion2");
        this.characterManager.addToParty("companion2");
      }
      if (this.level >= 6) {
        this.characterManager.unlockCharacter("companion3");
        this.characterManager.addToParty("companion3");
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
      log("Game", this.characterManager.getRelationshipSummary(activeChar?.type || "helio"));
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
    if (this.hp <= 0) {
      // reset XP/level
      this.level = 1;
      this.xp = 0;
      this.xpToNext = 5;
      this.hud.setXP(this.level, this.xp, this.xpToNext);
    }
  }
}
