import type { Scene } from "@engine";
import { 
  AmbientLight, 
  DirectionalLight, 
  Fog, 
  Mesh, 
  MeshStandardMaterial, 
  PlaneGeometry,
  SphereGeometry,
  MeshBasicMaterial,
  BackSide
} from "three";
import { resources } from "resources";
import { FloatingLightSphere } from "../entities/floating-light-sphere";
import { ObstacleManager } from "../entities/rock-manager";
import { Player } from "../entities/player";
import { Portal } from "../entities/portal";
import type { SceneConfig, LightConfig, Transform3D } from "../../configs";

/**
 * Builds scene elements from configuration
 */
export class SceneBuilder {
  constructor(private readonly scene: Scene) {}

  /**
   * Build the complete scene from configuration
   */
  async buildFromConfig(config: SceneConfig): Promise<void> {
    // Build ground
    this.buildGround(config.ground);
    
    // Build environment
    this.buildEnvironment(config.environment);
    
    // Build lights
    this.buildLights(config.lights);
    
    // Build obstacles
    await this.buildObstacles(config.obstacles);
    
    // Build spawn points
    this.buildSpawnPoints(config.spawnPoints);
  }

  /**
   * Build the ground mesh
   */
  private buildGround(groundConfig: SceneConfig['ground']): void {
    const geometry = new PlaneGeometry(groundConfig.width, groundConfig.height);
    
    // Create material with textures if specified
    const materialConfig: any = {};
    if (groundConfig.textures?.diffuse) {
      materialConfig.map = resources.get(groundConfig.textures.diffuse as any);
    }
    if (groundConfig.textures?.normal) {
      materialConfig.normalMap = resources.get(groundConfig.textures.normal as any);
    }
    if (groundConfig.textures?.roughness) {
      materialConfig.roughnessMap = resources.get(groundConfig.textures.roughness as any);
    }
    if (groundConfig.textures?.metalness) {
      materialConfig.metalnessMap = resources.get(groundConfig.textures.metalness as any);
    }
    
    const material = new MeshStandardMaterial(materialConfig);
    
    // Apply UV repeat for tiling
    if (groundConfig.uvRepeat && materialConfig.map) {
      materialConfig.map.repeat.set(groundConfig.uvRepeat.u, groundConfig.uvRepeat.v);
      materialConfig.map.wrapS = materialConfig.map.wrapT = 1000; // RepeatWrapping
    }

    const groundMesh = new Mesh(geometry, material);
    
    // Position and rotate the ground
    const pos = groundConfig.position ?? { x: 0, y: 0, z: 0 };
    groundMesh.position.set(pos.x, pos.y, pos.z);
    groundMesh.rotation.x = -Math.PI / 2; // Make horizontal
    groundMesh.receiveShadow = true;
    
    this.scene.sceneRoot.add(groundMesh);
  }

  /**
   * Build environment settings (fog, skybox)
   */
  private buildEnvironment(envConfig: SceneConfig['environment']): void {
    // Setup fog
    if (envConfig.fog) {
      const fog = new Fog(envConfig.fog.color, envConfig.fog.near, envConfig.fog.far);
      this.scene.game.sceneRoot.fog = fog;
    }

    // Setup skybox
    if (envConfig.skybox) {
      const skyboxGeometry = new SphereGeometry(1000, 32, 16);
      const skyboxMaterial = new MeshBasicMaterial({
        map: resources.get(envConfig.skybox.texture as any),
        side: BackSide,
        fog: false
      });
      
      const skybox = new Mesh(skyboxGeometry, skyboxMaterial);
      if (envConfig.skybox.rotation) {
        skybox.rotation.set(
          envConfig.skybox.rotation.x,
          envConfig.skybox.rotation.y,
          envConfig.skybox.rotation.z
        );
      }
      this.scene.camera.add(skybox);
    }
  }

  /**
   * Build lights from configuration
   */
  private buildLights(lightConfigs: LightConfig[]): void {
    for (const lightConfig of lightConfigs) {
      switch (lightConfig.type) {
        case 'ambient':
          this.buildAmbientLight(lightConfig);
          break;
        case 'directional':
          this.buildDirectionalLight(lightConfig);
          break;
        case 'floating':
          this.buildFloatingLight(lightConfig);
          break;
      }
    }
  }

  private buildAmbientLight(config: LightConfig): void {
    const light = new AmbientLight(config.color, config.intensity);
    this.scene.sceneRoot.add(light);
  }

  private buildDirectionalLight(config: LightConfig): void {
    const light = new DirectionalLight(config.color, config.intensity);
    light.position.set(config.position.x, config.position.y, config.position.z);
    
    if (config.castShadow) {
      light.castShadow = true;
      
      if (config.shadowConfig) {
        if (config.shadowConfig.mapSize) {
          light.shadow.mapSize.width = config.shadowConfig.mapSize.width;
          light.shadow.mapSize.height = config.shadowConfig.mapSize.height;
        }
        
        if (config.shadowConfig.camera) {
          const cam = config.shadowConfig.camera;
          light.shadow.camera.near = cam.near;
          light.shadow.camera.far = cam.far;
          light.shadow.camera.left = cam.left;
          light.shadow.camera.right = cam.right;
          light.shadow.camera.top = cam.top;
          light.shadow.camera.bottom = cam.bottom;
        }
      }
    }
    
    this.scene.sceneRoot.add(light);
  }

  private buildFloatingLight(config: LightConfig): void {
    const light = new FloatingLightSphere(
      config.color,
      config.intensity,
      config.floatSpeed,
      config.floatAmplitude
    );
    
    light.position.set(config.position.x, config.position.y, config.position.z);
    this.scene.addEntity(light);
  }

  /**
   * Build obstacles from configuration
   */
  private async buildObstacles(obstacleConfigs: SceneConfig['obstacles']): Promise<void> {
    if (obstacleConfigs.length > 0) {
      const obstacleManager = new ObstacleManager(obstacleConfigs);
      this.scene.addEntity(obstacleManager);
    }
  }

  /**
   * Build spawn points from configuration
   */
  private buildSpawnPoints(spawnConfigs: SceneConfig['spawnPoints']): void {
    for (const spawnConfig of spawnConfigs) {
      switch (spawnConfig.type) {
        case 'player':
          this.buildPlayerSpawn(spawnConfig.position);
          break;
        case 'portal':
          this.buildPortalSpawn(spawnConfig.position);
          break;
        case 'enemy':
          // Enemy spawning will be handled by the EnemyManager
          // We'll store these for later use
          break;
      }
    }
  }

  private buildPlayerSpawn(position: Transform3D): void {
    const player = new Player();
    player.position.set(position.x, position.y, position.z);
    this.scene.addEntity(player);
  }

  private buildPortalSpawn(position: Transform3D): void {
    const portal = new Portal();
    portal.position.set(position.x, position.y, position.z);
    this.scene.addEntity(portal);
  }

  /**
   * Get enemy spawn points from configuration
   */
  getEnemySpawnPoints(config: SceneConfig): Transform3D[] {
    return config.spawnPoints
      .filter(spawn => spawn.type === 'enemy')
      .map(spawn => spawn.position);
  }
}