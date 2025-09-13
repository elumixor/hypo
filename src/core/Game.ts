import * as THREE from "three";
import { Projectiles } from "../combat/Projectiles";
import { GameConfig } from "../config/GameConfig";
import { gameEvents } from "../events/GameEvents";
import { Keyboard } from "../input/Keyboard";
import { gameState } from "../state/GameState";
import { Hud } from "../ui/Hud";
import type { Enemy } from "../world/Enemy";
import { Player } from "../world/Player";
import { Spawner } from "../world/Spawner";
import { Loop } from "./Loop";

export class Game {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(
    GameConfig.CAMERA.FOV,
    innerWidth / innerHeight,
    GameConfig.CAMERA.NEAR,
    GameConfig.CAMERA.FAR,
  );
  readonly renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  readonly keyboard = new Keyboard();
  readonly player = new Player(this.keyboard, GameConfig.PLAYER.INITIAL_YAW);
  readonly spawner = new Spawner(this.scene);
  readonly projectiles = new Projectiles();
  xpCrystals: THREE.Mesh[] = [];
  readonly loop = new Loop();
  hud!: Hud;
  yaw = GameConfig.CAMERA.YAW;
  pitch = GameConfig.CAMERA.PITCH;
  dist = GameConfig.CAMERA.DISTANCE;
  autoShootTimer = 0;
  tmp = new THREE.Vector3();
  tAccum = 0;
  lastDash = false;
  lastBlock = false;

  constructor(readonly root: HTMLElement) {
    this.setupEventListeners();
  }

  /**
   * Set up event listeners for game state changes
   */
  private setupEventListeners(): void {
    // Listen for UI updates
    gameEvents.on("ui:statusUpdate", ({ message }) => {
      this.hud?.setStatus(message);
    });

    gameEvents.on("ui:healthUpdate", ({ current, max }) => {
      this.hud?.setHealth(current, max);
    });

    gameEvents.on("ui:xpUpdate", ({ level, xp, xpToNext }) => {
      this.hud?.setXP(level, xp, xpToNext);
    });

    // Listen for player events
    gameEvents.on("player:levelUp", ({ newLevel }) => {
      gameEvents.emit("ui:statusUpdate", { message: `Leveled to ${newLevel}!` });
    });
  }
  doAttack(type: "easy" | "alt") {
    log("Game", "attack", type);
    // choose a target if available, otherwise fire forward
    const target = this.closestEnemy();
    if (target) {
      this.tmp.copy(target.mesh.position).sub(this.player.mesh.position);
      this.tmp.y = 0;
      if (this.tmp.lengthSq() > 0.0001) {
        this.spawnPlayerProjectile(this.tmp, type);
        gameEvents.emit("combat:attack", {
          type,
          target: {
            x: target.mesh.position.x,
            y: target.mesh.position.y,
            z: target.mesh.position.z,
          },
        });
      }
    } else {
      // fire in player facing direction
      const forward = new THREE.Vector3(-Math.cos(this.player.yaw), 0, -Math.sin(this.player.yaw));
      this.spawnPlayerProjectile(forward, type);
      gameEvents.emit("combat:attack", { type });
    }
    gameEvents.emit("ui:statusUpdate", { message: `Attack: ${type}` });
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
      gameEvents.emit("player:dash", { success: true });
      gameEvents.emit("ui:statusUpdate", { message: "Dash!" });
    } else {
      log("Game", "dash-failed-cooldown");
      gameEvents.emit("player:dash", { success: false });
    }
  }

  doBlock() {
    if (this.lastBlock) return;
    this.lastBlock = true;
    log("Game", "block");
    // toggle player shield
    const newState = !this.player.shieldActive;
    this.player.setShield(newState);
    gameState.setShield(newState);
    gameEvents.emit("ui:statusUpdate", { message: newState ? "Block!" : "Block off" });
  }

  async init() {
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.domElement.style.display = "block";
    this.root.prepend(this.renderer.domElement);
    this.scene.background = new THREE.Color(GameConfig.COLORS.BACKGROUND);
    this.camera.position.set(3, 13.5, 4.5);
    this.camera.lookAt(0, 0.6, 0);

    // world pieces
    const ground = new THREE.Mesh(
      new THREE.CylinderGeometry(
        GameConfig.WORLD.GROUND_RADIUS,
        GameConfig.WORLD.GROUND_RADIUS,
        GameConfig.WORLD.GROUND_HEIGHT,
        40,
      ),
      new THREE.MeshStandardMaterial({
        color: GameConfig.COLORS.GROUND,
        roughness: 0.9,
      }),
    );
    ground.position.y = -0.1;
    this.scene.add(ground);
    const light = new THREE.DirectionalLight("#ffffff", GameConfig.WORLD.DIRECTIONAL_LIGHT_INTENSITY);
    light.position.set(4, 6, 3);
    this.scene.add(light);
    this.scene.add(new THREE.AmbientLight("#404040", GameConfig.WORLD.AMBIENT_LIGHT_INTENSITY));

    // add player
    this.scene.add(this.player.mesh);
    this.spawner.spawn(GameConfig.ENEMIES.WAVE_SIZE);

    // pixi hud
    const hudApp = new (await import("pixi.js")).Application();
    await hudApp.init({ backgroundAlpha: 0, antialias: true, resizeTo: window });
    hudApp.canvas.style.position = "fixed";
    hudApp.canvas.style.top = "0";
    hudApp.canvas.style.left = "0";
    hudApp.canvas.style.pointerEvents = "none";
    this.root.append(hudApp.canvas);
    this.hud = new Hud(hudApp);

    // Initialize HUD with current state
    const state = gameState.current;
    this.hud.setHealth(state.player.hp, state.player.maxHp);
    this.hud.setXP(state.player.level, state.player.xp, state.player.xpToNext);

    // UI button bindings
    this.hud.onAuto = (v) => {
      gameState.setAutoAttack(v);
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
    gameState.updateGameTime(dt);
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
    const state = gameState.current;
    if (state.combat.autoAttack) this.autoShoot(dt);
    // collect XP crystals when near
    for (let i = this.xpCrystals.length - 1; i >= 0; i--) {
      const c = this.xpCrystals[i];
      if (!c) continue;
      if (c.position.distanceTo(this.player.mesh.position) < GameConfig.PROGRESSION.XP_COLLECTION_DISTANCE) {
        this.collectXP(i);
      }
    }
    this.updateCamera();
    this.renderer.render(this.scene, this.camera);
    this.updateHud();
    if (state.player.hp <= 0) this.respawn();
  }
  updateCamera() {
    const playerPos = this.player.mesh.position;
    this.camera.position.set(
      playerPos.x + Math.cos(this.yaw) * this.dist,
      playerPos.y + GameConfig.CAMERA.HEIGHT_OFFSET * this.pitch,
      playerPos.z + Math.sin(this.yaw) * this.dist,
    );
    this.camera.lookAt(playerPos.x, playerPos.y + GameConfig.CAMERA.LOOK_HEIGHT, playerPos.z);
  }
  stepEnemies(dt: number, t: number) {
    const aliveEnemies = this.spawner.getAliveEnemies();
    const minPlayerDist = GameConfig.ENEMIES.MIN_PLAYER_DISTANCE;
    const separation = GameConfig.ENEMIES.SEPARATION_DISTANCE;

    for (const enemy of aliveEnemies) {
      // move towards player but maintain a minimum distance
      this.tmp.copy(this.player.mesh.position).sub(enemy.mesh.position);
      this.tmp.y = 0;
      const distance = this.tmp.length();
      if (distance > minPlayerDist) {
        this.tmp.normalize();
        enemy.mesh.position.addScaledVector(this.tmp, dt * enemy.getMovementSpeed());
      }

      // simple separation from other enemies
      for (const other of aliveEnemies) {
        if (enemy === other) continue;
        const dist = enemy.mesh.position.distanceTo(other.mesh.position);
        if (dist < separation && dist > 0.001) {
          const dir = enemy.mesh.position.clone().sub(other.mesh.position).setY(0).normalize();
          enemy.mesh.position.addScaledVector(dir, (separation - dist) * 0.5);
        }
      }

      // Check if enemy should shoot
      if (enemy.shouldShoot(t)) {
        this.projectiles.add(
          enemy.mesh.position.clone(),
          this.tmp.set(
            this.player.mesh.position.x - enemy.mesh.position.x,
            0,
            this.player.mesh.position.z - enemy.mesh.position.z,
          ),
          false,
          this.scene,
          enemy.getDamage(),
        );
      }
    }
    this.spawner.ensureWave(GameConfig.ENEMIES.WAVE_SIZE);
  }
  removeEnemy(enemy: Enemy) {
    // spawn XP crystal at enemy position
    const position = enemy.mesh.position.clone();
    this.spawner.remove(enemy);
    this.spawnXP(position);

    gameEvents.emit("combat:enemy:killed", {
      position: { x: position.x, y: position.y, z: position.z },
    });
  }

  spawnXP(pos: THREE.Vector3) {
    const geometry = new THREE.SphereGeometry(0.18, 8, 6);
    const material = new THREE.MeshStandardMaterial({
      color: GameConfig.COLORS.XP_CRYSTAL,
      emissive: "#58b",
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(pos).y += 0.2;
    this.scene.add(mesh);
    this.xpCrystals.push(mesh);

    gameEvents.emit("xp:spawned", {
      position: { x: pos.x, y: pos.y, z: pos.z },
    });
  }

  collectXP(index: number) {
    const crystal = this.xpCrystals[index];
    if (!crystal) return;

    this.scene.remove(crystal);
    this.xpCrystals.splice(index, 1);

    // Use GameState to handle XP logic
    gameState.addExperience(1);
  }
  autoShoot(dt: number) {
    this.autoShootTimer -= dt;
    if (this.autoShootTimer <= 0) {
      const target = this.closestEnemy();
      if (target) {
        this.tmp.copy(target.mesh.position).sub(this.player.mesh.position);
        this.tmp.y = 0;
        if (this.tmp.lengthSq() > 0.001) {
          this.spawnPlayerProjectile(this.tmp, "easy");
          this.autoShootTimer = GameConfig.COMBAT.AUTO_SHOOT_INTERVAL;
        }
      }
    }
  }

  closestEnemy() {
    const aliveEnemies = this.spawner.getAliveEnemies();
    let best: Enemy | undefined;
    let bestDistance = Infinity;

    for (const enemy of aliveEnemies) {
      const distance = enemy.mesh.position.distanceTo(this.player.mesh.position);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = enemy;
      }
    }
    return best;
  }

  updateHud() {
    const state = gameState.current;
    gameState.updateWorldStats(this.spawner.aliveCount, this.projectiles.count);

    this.hud.setStatus(
      `HP:${state.player.hp} Enemies:${state.world.enemyCount} Proj:${state.world.projectileCount} FPS:${this.loop.fps.toFixed(0)}`,
    );
  }
  respawn() {
    gameEvents.emit("ui:statusUpdate", { message: "You Died - Respawning" });
    gameState.respawn();
    this.player.mesh.position.set(0, 0.4, 0);
  }

  playerHit() {
    gameState.damagePlayer(1);
    log("Game", "player-hit", gameState.current.player.hp);
  }
}
