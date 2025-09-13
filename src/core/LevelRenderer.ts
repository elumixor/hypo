/**
 * Level renderer for Three.js scenes
 *
 * Takes level configurations and builds the appropriate 3D scenes
 */

import * as THREE from "three";
import type { LevelConfig, TileConfig } from "./LevelSystem";
import { LevelType, WorldType } from "./LevelSystem";

export interface LevelSceneConfig {
  scene: THREE.Scene;
  playerSpawnPosition: THREE.Vector3;
  targetPosition?: THREE.Vector3;
  enemySpawns: Array<{ position: THREE.Vector3; type: string; count: number }>;
  bounds: { min: THREE.Vector3; max: THREE.Vector3 };
}

export class LevelRenderer {
  private readonly tileSize = 1.0;
  private readonly wallHeight = 2.0;

  // Material cache for performance
  private readonly materials: Map<string, THREE.Material> = new Map();

  constructor() {
    this.initializeMaterials();
  }

  private initializeMaterials(): void {
    // Ground materials for different worlds
    const worldColors = {
      wrath: "#1a0f0f", // Dark red
      desire: "#1a0f1a", // Dark purple
      greed: "#1a1a0f", // Dark yellow
      attachment: "#0f1a0f", // Dark green
      envy: "#0f1a1a", // Dark cyan
      pride: "#0f0f1a", // Dark blue
    };

    for (const [world, color] of Object.entries(worldColors)) {
      this.materials.set(
        `ground_${world}`,
        new THREE.MeshStandardMaterial({
          color,
          roughness: 0.8,
        }),
      );
    }

    // Wall material
    this.materials.set(
      "wall",
      new THREE.MeshStandardMaterial({
        color: "#333333",
        roughness: 0.6,
      }),
    );

    // Hazard material
    this.materials.set(
      "hazard",
      new THREE.MeshStandardMaterial({
        color: "#aa3333",
        roughness: 0.4,
        emissive: "#331111",
      }),
    );

    // Target material
    this.materials.set(
      "target",
      new THREE.MeshStandardMaterial({
        color: "#33aa33",
        roughness: 0.4,
        emissive: "#113311",
      }),
    );

    // Spawn material
    this.materials.set(
      "spawn",
      new THREE.MeshStandardMaterial({
        color: "#3333aa",
        roughness: 0.4,
        emissive: "#111133",
      }),
    );
  }

  public renderLevel(config: LevelConfig): LevelSceneConfig {
    const scene = new THREE.Scene();
    let playerSpawnPosition = new THREE.Vector3(0, 0.4, 0);
    let targetPosition: THREE.Vector3 | undefined;
    const enemySpawns: Array<{ position: THREE.Vector3; type: string; count: number }> = [];

    // Set scene background based on world
    const worldName = this.getWorldName(config.world);
    scene.background = this.getWorldSkyColor(config.world);

    // Add lighting
    this.addLighting(scene, config.world);

    // Render ground and walls
    const { bounds } = this.renderTiles(scene, config, worldName);

    // Process tiles for special positions
    for (let y = 0; y < config.tiles.length; y++) {
      const row = config.tiles[y];
      if (!row) continue;
      for (let x = 0; x < row.length; x++) {
        const tile = row[x];
        if (!tile) continue;
        const worldPos = this.tileToWorldPosition(x, y);

        switch (tile.type) {
          case "spawn":
            playerSpawnPosition = new THREE.Vector3(worldPos.x, 0.4, worldPos.z);
            break;
          case "target":
            targetPosition = new THREE.Vector3(worldPos.x, 0.2, worldPos.z);
            break;
        }
      }
    }

    // Add enemy spawns from configuration
    if (config.enemySpawns) {
      for (const spawn of config.enemySpawns) {
        const worldPos = this.tileToWorldPosition(spawn.x, spawn.y);
        enemySpawns.push({
          position: new THREE.Vector3(worldPos.x, 0.4, worldPos.z),
          type: spawn.enemyType,
          count: spawn.count,
        });
      }
    }

    // Add level-specific decorations
    this.addLevelDecorations(scene, config);

    return {
      scene,
      playerSpawnPosition,
      targetPosition,
      enemySpawns,
      bounds,
    };
  }

  private renderTiles(scene: THREE.Scene, config: LevelConfig, worldName: string) {
    const tiles = config.tiles;
    const height = tiles.length;
    const width = tiles[0]?.length || 0;

    // Create ground plane
    const groundGeometry = new THREE.PlaneGeometry(width * this.tileSize, height * this.tileSize);
    const groundMaterial = 
      this.materials.get(`ground_${worldName}`) || 
      this.materials.get("ground_wrath") ||
      new THREE.MeshStandardMaterial({ color: "#4a4a4a" });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(((width - 1) * this.tileSize) / 2, 0, ((height - 1) * this.tileSize) / 2);
    scene.add(ground);

    // Process individual tiles
    for (let y = 0; y < height; y++) {
      const row = tiles[y];
      if (!row) continue;
      for (let x = 0; x < width; x++) {
        const tile = row[x];
        if (!tile) continue;
        this.renderTile(scene, tile, x, y);
      }
    }

    const bounds = {
      min: new THREE.Vector3(-this.tileSize / 2, 0, -this.tileSize / 2),
      max: new THREE.Vector3((width - 0.5) * this.tileSize, this.wallHeight, (height - 0.5) * this.tileSize),
    };

    return { bounds };
  }

  private renderTile(scene: THREE.Scene, tile: TileConfig, x: number, y: number) {
    const worldPos = this.tileToWorldPosition(x, y);

    switch (tile.type) {
      case "wall":
        this.createWall(scene, worldPos);
        break;
      case "hazard":
        this.createHazard(scene, worldPos);
        break;
      case "target":
        this.createTarget(scene, worldPos);
        break;
      case "spawn":
        this.createSpawnMarker(scene, worldPos);
        break;
    }
  }

  private tileToWorldPosition(x: number, y: number): THREE.Vector3 {
    return new THREE.Vector3(x * this.tileSize, 0, y * this.tileSize);
  }

  private createWall(scene: THREE.Scene, position: THREE.Vector3): void {
    const geometry = new THREE.BoxGeometry(this.tileSize, this.wallHeight, this.tileSize);
    const material = this.materials.get("wall") || new THREE.MeshStandardMaterial({ color: "#666666" });
    const wall = new THREE.Mesh(geometry, material);
    wall.position.copy(position);
    wall.position.y = this.wallHeight / 2;
    scene.add(wall);
  }

  private createHazard(scene: THREE.Scene, position: THREE.Vector3): void {
    const geometry = new THREE.CylinderGeometry(this.tileSize * 0.4, this.tileSize * 0.4, 0.2, 8);
    const material = this.materials.get("hazard") || new THREE.MeshStandardMaterial({ color: "#ff4444" });
    const hazard = new THREE.Mesh(geometry, material);
    hazard.position.copy(position);
    hazard.position.y = 0.1;
    scene.add(hazard);
  }

  private createTarget(scene: THREE.Scene, position: THREE.Vector3): void {
    // Create a more visible target with a tall cylinder and glowing effect
    const geometry = new THREE.CylinderGeometry(this.tileSize * 0.4, this.tileSize * 0.4, 1.5, 16);
    const material = this.materials.get("target") || new THREE.MeshStandardMaterial({ color: "#00ff00" });
    const target = new THREE.Mesh(geometry, material);
    target.position.copy(position);
    target.position.y = 0.75; // Raise it up so it's more visible
    scene.add(target);

    // Add a glowing ring at the base
    const glowGeometry = new THREE.RingGeometry(this.tileSize * 0.4, this.tileSize * 0.6, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: "#33ff33",
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.rotation.x = -Math.PI / 2;
    glow.position.copy(position);
    glow.position.y = 0.01;
    scene.add(glow);

    // Add a second ring that pulses
    const pulseGeometry = new THREE.RingGeometry(this.tileSize * 0.6, this.tileSize * 0.8, 16);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: "#88ff88",
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
    pulse.rotation.x = -Math.PI / 2;
    pulse.position.copy(position);
    pulse.position.y = 0.02;
    scene.add(pulse);
  }

  private createSpawnMarker(scene: THREE.Scene, position: THREE.Vector3): void {
    // Small marker to indicate spawn point (for debugging/development)
    const geometry = new THREE.SphereGeometry(0.1, 8, 6);
    const material = this.materials.get("spawn") || new THREE.MeshStandardMaterial({ color: "#0000ff" });
    const marker = new THREE.Mesh(geometry, material);
    marker.position.copy(position);
    marker.position.y = 0.1;
    scene.add(marker);
  }

  private addLighting(scene: THREE.Scene, world: WorldType): void {
    // Directional light
    const dirLight = new THREE.DirectionalLight("#ffffff", 1.5);
    dirLight.position.set(10, 15, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Ambient light with world-specific tinting
    const ambientColors = {
      [WorldType.WRATH]: "#551111",
      [WorldType.DESIRE]: "#551155",
      [WorldType.GREED]: "#555511",
      [WorldType.ATTACHMENT]: "#115511",
      [WorldType.ENVY]: "#115555",
      [WorldType.PRIDE]: "#111155",
    };

    const ambientLight = new THREE.AmbientLight(ambientColors[world], 0.4);
    scene.add(ambientLight);
  }

  private addLevelDecorations(scene: THREE.Scene, config: LevelConfig): void {
    // Add decorations based on level type and world
    if (config.type === LevelType.BOSS) {
      this.addBossDecorations(scene, config);
    } else if (config.type === LevelType.SAFE_ZONE) {
      this.addSafeZoneDecorations(scene, config);
    }
  }

  private addBossDecorations(scene: THREE.Scene, _config: LevelConfig): void {
    // Add dramatic lighting and atmospheric effects for boss fights
    const spotLight = new THREE.SpotLight("#ff4444", 2, 20, Math.PI / 6, 0.5);
    spotLight.position.set(0, 10, 0);
    spotLight.target.position.set(12, 0, 12); // Center of boss arena
    scene.add(spotLight);
    scene.add(spotLight.target);
  }

  private addSafeZoneDecorations(scene: THREE.Scene, _config: LevelConfig): void {
    // Add peaceful, welcoming elements to safe zones
    const warmLight = new THREE.PointLight("#ffdd88", 1, 10);
    warmLight.position.set(8, 3, 8); // Near the target position
    scene.add(warmLight);
  }

  private getWorldName(world: WorldType): string {
    return WorldType[world].toLowerCase();
  }

  private getWorldSkyColor(world: WorldType): THREE.Color {
    const skyColors = {
      [WorldType.WRATH]: "#1a0a0a",
      [WorldType.DESIRE]: "#1a0a1a",
      [WorldType.GREED]: "#1a1a0a",
      [WorldType.ATTACHMENT]: "#0a1a0a",
      [WorldType.ENVY]: "#0a1a1a",
      [WorldType.PRIDE]: "#0a0a1a",
    };

    return new THREE.Color(skyColors[world]);
  }
}
