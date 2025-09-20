/**
 * Position with optional rotation and scale
 */
export interface Transform3D {
  x: number;
  y: number;
  z: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
  scale?: number; // Uniform scale
}

/**
 * Ground configuration for the scene
 */
export interface GroundConfig {
  /** Size of the ground plane */
  width: number;
  height: number;
  /** Position of the ground */
  position?: { x: number; y: number; z: number };
  /** Ground texture configuration */
  textures?: {
    diffuse?: string;
    normal?: string;
    roughness?: string;
    metalness?: string;
  };
  /** UV repeat for tiling */
  uvRepeat?: { u: number; v: number };
}

/**
 * Light configuration
 */
export interface LightConfig {
  type: 'floating' | 'directional' | 'ambient';
  position: Transform3D;
  color: number;
  intensity: number;
  /** For floating lights */
  floatSpeed?: number;
  floatAmplitude?: number;
  /** For directional lights */
  castShadow?: boolean;
  shadowConfig?: {
    mapSize?: { width: number; height: number };
    camera?: {
      near: number;
      far: number;
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
  };
}

/**
 * Rock/obstacle configuration
 */
export interface ObstacleConfig {
  type: 'rock' | 'pillar' | 'wall';
  position: Transform3D;
  /** Model resource key */
  model?: string;
  /** Collision enabled */
  collision?: boolean;
}

/**
 * Spawn point configuration
 */
export interface SpawnPointConfig {
  type: 'player' | 'enemy' | 'portal';
  position: Transform3D;
  /** For enemy spawns - enemy type or count */
  enemyType?: string;
  enemyCount?: number;
}

/**
 * Environmental effect configuration
 */
export interface EnvironmentConfig {
  /** Fog settings */
  fog?: {
    color: number;
    near: number;
    far: number;
  };
  /** Skybox settings */
  skybox?: {
    texture: string;
    rotation?: { x: number; y: number; z: number };
  };
  /** Post-processing effects */
  effects?: {
    bloom?: {
      enabled: boolean;
      intensity: number;
      radius: number;
      luminanceThreshold: number;
      luminanceSmoothing: number;
    };
    chromaticAberration?: {
      enabled: boolean;
      offset: { x: number; y: number };
    };
    depthOfField?: {
      enabled: boolean;
      focusDistance: number;
      focalLength: number;
      bokehScale: number;
    };
  };
}

/**
 * Complete scene configuration
 */
export interface SceneConfig {
  /** Scene metadata */
  name: string;
  description?: string;
  version?: string;
  
  /** World bounds */
  bounds: {
    min: { x: number; z: number };
    max: { x: number; z: number };
  };
  
  /** Ground configuration */
  ground: GroundConfig;
  
  /** All lights in the scene */
  lights: LightConfig[];
  
  /** All obstacles/decorative objects */
  obstacles: ObstacleConfig[];
  
  /** Spawn points for player, enemies, etc. */
  spawnPoints: SpawnPointConfig[];
  
  /** Environmental settings */
  environment: EnvironmentConfig;
}