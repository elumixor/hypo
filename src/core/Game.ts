import * as THREE from "three";
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
    this.loop.add((dt) => this.update(dt));
    this.loop.start();
  }

  // (removed duplicate and misplaced code)
  onResize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
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
    this.hud.setStatus(
      `HP:${this.hp} Enemies:${this.spawner.enemies.length} Proj:${this.projectiles.list.length} FPS:${this.loop.fps.toFixed(0)}`,
    );
  }
  respawn() {
    this.hud.setStatus("You Died - Respawning");
    this.hp = 10;
    this.player.mesh.position.set(0, 0.4, 0);
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
