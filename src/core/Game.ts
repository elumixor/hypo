import * as THREE from "three";
import { Projectiles } from "../combat/Projectiles";
import { Keyboard } from "../input/Keyboard";
import {
  type ExperienceData,
  ExperienceService,
  GameStateService,
  type HealthData,
  HealthService,
  Services,
} from "../services";
import { TimerSystem } from "../systems";
import { Hud } from "../ui/Hud";
import type { Enemy } from "../world/Enemy";
import { Player } from "../world/Player";
import { Spawner } from "../world/Spawner";

/**
 * Main game class using service-based architecture
 * This version separates concerns into different services and uses component-based entities
 */
export class Game {
  // Core Three.js setup
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
  readonly renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  // Input and UI
  readonly keyboard = new Keyboard();
  private hud!: Hud;

  // Game entities
  readonly player = new Player(this.keyboard, {
    yaw: Math.PI * 0.25,
    movement: { speed: 4 },
    health: { maxHealth: 10 },
  });
  readonly spawner = new Spawner(this.scene);
  readonly projectiles = new Projectiles();

  // Systems
  private readonly timerSystem = new TimerSystem();

  // Game state
  private readonly xpCrystals: THREE.Mesh[] = [];
  private readonly tmpVector = new THREE.Vector3();
  private autoShootTimer = 0;
  private autoAttack = true;
  private lastDash = false;
  private lastBlock = false;

  // Camera state
  private readonly cameraYaw = Math.PI * 0.25;
  private readonly cameraPitch = 1.5;
  private readonly cameraDistance = 10;

  constructor(readonly root: HTMLElement) {
    this.setupServices();
    this.setupRenderer();
    this.setupScene();
    this.setupEventListeners();
    this.setupServiceEventHandlers();
    void this.setupUIAsync(); // Start UI setup in background
    this.startGameLoop();
    log("Game", "HYPO game started");
  }

  /**
   * Handle player attack action
   */
  doAttack(type: "easy" | "alt") {
    log("Game", "attack", type);

    const target = this.findClosestEnemy();
    if (target) {
      this.tmpVector.copy(target.mesh.position).sub(this.player.mesh.position);
      this.tmpVector.y = 0;
      if (this.tmpVector.lengthSq() > 0.0001) {
        this.spawnPlayerProjectile(this.tmpVector, type);
      }
    } else {
      // Fire in player facing direction
      const forward = new THREE.Vector3(-Math.cos(this.player.yaw), 0, -Math.sin(this.player.yaw));
      this.spawnPlayerProjectile(forward, type);
    }

    this.hud.setStatus(`Attack: ${type}`);
  }

  /**
   * Handle player dash action
   */
  doDash() {
    if (this.lastDash) return; // Edge-triggered input
    this.lastDash = true;

    const started = this.player.startDash();
    if (started) {
      log("Game", "dash");
      this.hud.setStatus("Dash!");
    } else {
      log("Game", "dash-failed-cooldown");
    }
  }

  /**
   * Handle player block action
   */
  doBlock() {
    if (this.lastBlock) return; // Edge-triggered input
    this.lastBlock = true;

    log("Game", "block");
    this.player.toggleShield();
    this.hud.setStatus(this.player.shieldActive ? "Block!" : "Block off");
  }

  private setupServices() {
    // Register services - they initialize automatically in constructor
    Services.register(new HealthService());
    Services.register(new ExperienceService());
    Services.register(new GameStateService());
    Services.register(this.timerSystem);
  }

  private setupRenderer() {
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.domElement.style.display = "block";
    this.root.prepend(this.renderer.domElement);
  }

  private setupScene() {
    this.scene.background = new THREE.Color("#050507");
    this.camera.position.set(3, 13.5, 4.5);
    this.camera.lookAt(0, 0.6, 0);

    // World setup
    this.createWorld();
    this.scene.add(this.player.mesh);
    this.spawner.spawn(5);
  }

  private createWorld() {
    // Ground
    const ground = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 0.2, 40),
      new THREE.MeshStandardMaterial({ color: "#111318", roughness: 0.9 }),
    );
    ground.position.y = -0.1;
    this.scene.add(ground);

    // Lighting
    const directionalLight = new THREE.DirectionalLight("#ffffff", 2.2);
    directionalLight.position.set(4, 6, 3);
    this.scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight("#404040", 0.6);
    this.scene.add(ambientLight);
  }

  private async setupUIAsync(): Promise<void> {
    // PIXI HUD
    const hudApp = new (await import("pixi.js")).Application();
    await hudApp.init({ backgroundAlpha: 0, antialias: true, resizeTo: window });
    hudApp.canvas.style.position = "fixed";
    hudApp.canvas.style.top = "0";
    hudApp.canvas.style.left = "0";
    hudApp.canvas.style.pointerEvents = "none";
    this.root.append(hudApp.canvas);

    this.hud = new Hud(hudApp);

    // Set up UI event handlers
    this.hud.onAuto = (enabled) => {
      this.autoAttack = enabled;
    };
    this.hud.onEasy = () => this.doAttack("easy");
    this.hud.onAlt = () => this.doAttack("alt");
    this.hud.onDash = () => this.doDash();
    this.hud.onBlock = () => this.doBlock();

    // Initialize UI with current values
    const healthService = Services.get(HealthService);
    const experienceService = Services.get(ExperienceService);

    this.updateHealthUI(healthService.getHealthData());
    this.updateExperienceUI(experienceService.getExperienceData());
  }

  private setupEventListeners() {
    addEventListener("resize", () => this.onResize());
  }

  private setupServiceEventHandlers() {
    const healthService = Services.get(HealthService);
    const experienceService = Services.get(ExperienceService);
    const gameStateService = Services.get(GameStateService);

    // Health events
    healthService.onHealthChanged.subscribe((data) => this.updateHealthUI(data));
    healthService.onDamaged.subscribe(() => {
      // Could add screen shake, damage effects, etc.
    });
    healthService.onDeath.subscribe(() => {
      gameStateService.playerDied();
    });

    // Experience events
    experienceService.onExperienceChanged.subscribe((data) => this.updateExperienceUI(data));
    experienceService.onLevelUp.subscribe((levelData) => {
      this.hud.setStatus(`Leveled to ${levelData.newLevel}!`);

      // Apply level bonuses
      // biome-ignore lint/complexity/useLiteralKeys: bonusStats is Record<string, number>
      if (levelData.bonusStats?.["maxHealth"]) {
        // biome-ignore lint/complexity/useLiteralKeys: bonusStats is Record<string, number>
        healthService.setMaxHealth(healthService.maximum + levelData.bonusStats["maxHealth"]);
        healthService.healToFull(); // Heal on level up
      }
    });

    // Game state events
    gameStateService.onPlayerDied.subscribe(() => {
      this.hud.setStatus("You Died - Respawning");
    });

    gameStateService.onPlayerRespawned.subscribe(() => {
      this.respawnPlayer();
    });

    // Timer events for game loop
    this.timerSystem.onScaledTick.subscribe((timerData) => {
      this.update(timerData.deltaTime);
    });
  }

  private startGameLoop() {
    // The timer system will drive our game loop through events
    this.timerSystem.start();
  }

  private update(deltaTime: number) {
    // Update game entities
    this.player.update(deltaTime);
    this.updateEnemies(deltaTime);
    this.updateProjectiles(deltaTime);

    // Handle input
    this.handleKeyboardInput();

    // Handle auto-attack
    if (this.autoAttack) {
      this.updateAutoAttack(deltaTime);
    }

    // Collect XP crystals
    this.updateXPCollection();

    // Update camera
    this.updateCamera();

    // Render
    this.renderer.render(this.scene, this.camera);

    // Update HUD
    this.updateHUD();
  }

  private handleKeyboardInput() {
    // Handle dash input (edge-triggered)
    if (this.keyboard.dash) {
      this.doDash();
    } else {
      this.lastDash = false;
    }

    // Handle block input (edge-triggered)
    if (this.keyboard.block) {
      this.doBlock();
    } else {
      this.lastBlock = false;
    }
  }

  private updateEnemies(deltaTime: number) {
    const minPlayerDist = 0.9;
    const separation = 0.6;

    for (let i = 0; i < this.spawner.enemies.length; i++) {
      const enemy = this.spawner.enemies[i];
      if (!enemy || enemy.dead) continue;

      // Move towards player but maintain distance
      this.tmpVector.copy(this.player.mesh.position).sub(enemy.mesh.position);
      this.tmpVector.y = 0;
      const distanceToPlayer = this.tmpVector.length();

      if (distanceToPlayer > minPlayerDist) {
        this.tmpVector.normalize();
        enemy.mesh.position.addScaledVector(this.tmpVector, deltaTime * 1.2);
      }

      // Simple separation from other enemies
      this.applyEnemySeparation(enemy, i, separation);

      // Handle shooting
      if (performance.now() > enemy.tShoot) {
        this.enemyShoot(enemy);
      }
    }

    // Ensure we have enemies spawned
    this.spawner.ensureWave(5);
  }

  private applyEnemySeparation(enemy: Enemy, enemyIndex: number, separation: number) {
    for (let j = 0; j < this.spawner.enemies.length; j++) {
      if (enemyIndex === j) continue;

      const other = this.spawner.enemies[j];
      if (!other) continue;

      const distance = enemy.mesh.position.distanceTo(other.mesh.position);
      if (distance < separation && distance > 0.001) {
        const separationDir = enemy.mesh.position.clone().sub(other.mesh.position).setY(0).normalize();
        enemy.mesh.position.addScaledVector(separationDir, (separation - distance) * 0.5);
      }
    }
  }

  private enemyShoot(enemy: Enemy) {
    const direction = this.tmpVector.set(
      this.player.mesh.position.x - enemy.mesh.position.x,
      0,
      this.player.mesh.position.z - enemy.mesh.position.z,
    );

    this.projectiles.add(enemy.mesh.position.clone(), direction, false, this.scene);
    enemy.tShoot = performance.now() + 900 + Math.random() * 600;
  }

  private updateProjectiles(deltaTime: number) {
    this.projectiles.update(
      deltaTime,
      this.scene,
      this.player,
      this.spawner.enemies,
      () => this.playerHit(),
      (enemy: Enemy) => this.enemyKilled(enemy),
    );
  }

  private updateAutoAttack(deltaTime: number) {
    this.autoShootTimer -= deltaTime;
    if (this.autoShootTimer <= 0) {
      const target = this.findClosestEnemy();
      if (target) {
        this.tmpVector.copy(target.mesh.position).sub(this.player.mesh.position);
        this.tmpVector.y = 0;
        if (this.tmpVector.lengthSq() > 0.001) {
          this.spawnPlayerProjectile(this.tmpVector, "easy");
          this.autoShootTimer = 0.5;
        }
      }
    }
  }

  private updateXPCollection() {
    for (let i = this.xpCrystals.length - 1; i >= 0; i--) {
      const crystal = this.xpCrystals[i];
      if (!crystal) continue;

      if (crystal.position.distanceTo(this.player.mesh.position) < 0.8) {
        this.collectXP(i);
      }
    }
  }

  private updateCamera() {
    const playerPos = this.player.mesh.position;
    this.camera.position.set(
      playerPos.x + Math.cos(this.cameraYaw) * this.cameraDistance,
      playerPos.y + 3.5 * this.cameraPitch,
      playerPos.z + Math.sin(this.cameraYaw) * this.cameraDistance,
    );
    this.camera.lookAt(playerPos.x, playerPos.y + 0.4, playerPos.z);
  }

  private updateHUD() {
    const gameStateService = Services.get(GameStateService);
    const stats = gameStateService.getSessionStats();

    this.hud.setStatus(
      `Enemies:${this.spawner.enemies.length} Proj:${this.projectiles.list.length} Deaths:${stats.deaths}`,
    );
  }

  private playerHit() {
    const healthService = Services.get(HealthService);

    // Check if shield is active and can block
    if (this.player.shieldActive) {
      log("Game", "player-hit-blocked-by-shield");
      return;
    }

    healthService.takeDamage(1);
    log("Game", "player-hit", healthService.current);

    // Auto-respawn when dead
    if (!healthService.isAlive) {
      this.scheduleRespawn();
    }
  }

  private scheduleRespawn() {
    const gameStateService = Services.get(GameStateService);

    // Reset progression on death (as per game design)
    const experienceService = Services.get(ExperienceService);
    experienceService.reset();

    // Schedule respawn after a short delay
    setTimeout(() => {
      gameStateService.respawnPlayer();
    }, 2000);
  }

  private respawnPlayer() {
    const healthService = Services.get(HealthService);

    // Reset player position and health
    this.player.mesh.position.set(0, 0.4, 0);
    healthService.reset();

    // Clear XP crystals
    this.clearXPCrystals();
  }

  private enemyKilled(enemy: Enemy) {
    const gameStateService = Services.get(GameStateService);
    gameStateService.addEnemyKill();

    // Spawn XP crystal
    this.spawnXP(enemy.mesh.position.clone());

    // Remove enemy
    this.spawner.remove(enemy);
  }

  private spawnPlayerProjectile(direction: THREE.Vector3, kind: "easy" | "alt" = "easy") {
    const origin = this.player.mesh.position.clone().add(new THREE.Vector3(0, 0.4, 0));
    this.projectiles.add(origin, direction, true, this.scene);
    log("Game", "attack-fired", kind);
  }

  private spawnXP(position: THREE.Vector3) {
    const geometry = new THREE.SphereGeometry(0.18, 8, 6);
    const material = new THREE.MeshStandardMaterial({
      color: "#7af",
      emissive: "#58b",
    });

    const crystal = new THREE.Mesh(geometry, material);
    crystal.position.copy(position).add(new THREE.Vector3(0, 0.2, 0));

    this.scene.add(crystal);
    this.xpCrystals.push(crystal);
  }

  private collectXP(index: number) {
    const crystal = this.xpCrystals[index];
    if (!crystal) return;

    this.scene.remove(crystal);
    crystal.geometry.dispose();
    (crystal.material as THREE.Material).dispose();
    this.xpCrystals.splice(index, 1);

    // Add experience through service
    const experienceService = Services.get(ExperienceService);
    experienceService.addXp(1);
  }

  private clearXPCrystals() {
    for (const crystal of this.xpCrystals) {
      this.scene.remove(crystal);
      crystal.geometry.dispose();
      (crystal.material as THREE.Material).dispose();
    }
    this.xpCrystals.length = 0;
  }

  private findClosestEnemy(): Enemy | undefined {
    let closest: Enemy | undefined;
    let closestDistance = Infinity;

    for (const enemy of this.spawner.enemies) {
      if (enemy.dead) continue;

      const distance = enemy.mesh.position.distanceTo(this.player.mesh.position);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = enemy;
      }
    }

    return closest;
  }

  private updateHealthUI(data: HealthData) {
    this.hud.setHealth(data.current, data.maximum);
  }

  private updateExperienceUI(data: ExperienceData) {
    this.hud.setXP(data.level, data.currentXp, data.xpToNext);
  }

  private onResize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Clean up and destroy the game
   */
  destroy() {
    this.timerSystem.stop();
    this.clearXPCrystals();
    this.player.destroy();
    Services.destroy();
  }
}
