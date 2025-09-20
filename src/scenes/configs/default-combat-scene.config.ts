import type { SceneConfig } from "./scene-config.types";

/**
 * Default combat scene configuration with a larger, more detailed layout
 */
export const defaultCombatSceneConfig: SceneConfig = {
  name: "Default Combat Arena",
  description: "A large combat arena with varied terrain and strategic cover",
  version: "1.0.0",

  // Larger world bounds - 80x80 instead of 50x50
  bounds: {
    min: { x: -40, z: -40 },
    max: { x: 40, z: 40 }
  },

  // Larger ground with better tiling
  ground: {
    width: 80,
    height: 80,
    position: { x: 0, y: 0, z: 0 },
    textures: {
      diffuse: "textures/ground/diffuse",
      normal: "textures/ground/normal",
      roughness: "textures/ground/arm",
      metalness: "textures/ground/arm"
    },
    // Increase UV repeat for better tiling on larger ground
    uvRepeat: { u: 4, v: 4 }
  },

  // Enhanced lighting setup with more strategic placement
  lights: [
    // Ambient light
    {
      type: "ambient",
      position: { x: 0, y: 0, z: 0 },
      color: 0x404040,
      intensity: 0.6
    },
    // Main directional light
    {
      type: "directional",
      position: { x: 10, y: 10, z: 5 },
      color: 0xffffff,
      intensity: 0.25,
      castShadow: true,
      shadowConfig: {
        mapSize: { width: 2048, height: 2048 },
        camera: {
          near: 0.5,
          far: 50,
          left: -40,
          right: 40,
          top: 40,
          bottom: -40
        }
      }
    },
    // Floating light spheres - more varied placement
    {
      type: "floating",
      position: { x: -25, y: 12, z: -20 },
      color: 0xffddaa,
      intensity: 1.0,
      floatSpeed: 0.0008,
      floatAmplitude: 2
    },
    {
      type: "floating",
      position: { x: 30, y: 15, z: 15 },
      color: 0x00ddff,
      intensity: 0.8,
      floatSpeed: 0.0012,
      floatAmplitude: 1.5
    },
    {
      type: "floating",
      position: { x: 10, y: 18, z: -30 },
      color: 0xffffaa,
      intensity: 1.2,
      floatSpeed: 0.0007,
      floatAmplitude: 2.5
    },
    {
      type: "floating",
      position: { x: -15, y: 14, z: 25 },
      color: 0xffaadd,
      intensity: 0.9,
      floatSpeed: 0.001,
      floatAmplitude: 1.8
    },
    {
      type: "floating",
      position: { x: 0, y: 16, z: 0 },
      color: 0xaaffaa,
      intensity: 1.1,
      floatSpeed: 0.0009,
      floatAmplitude: 2.2
    },
    {
      type: "floating",
      position: { x: -35, y: 13, z: 10 },
      color: 0xffaaff,
      intensity: 0.7,
      floatSpeed: 0.0011,
      floatAmplitude: 1.6
    }
  ],

  // Many more rocks and obstacles for better strategic gameplay
  obstacles: [
    // Outer perimeter rocks - larger defensive positions
    { type: "rock", position: { x: -35, y: 0, z: -35, scale: 2.0, rotationY: 0.5 } },
    { type: "rock", position: { x: 38, y: 0, z: -32, scale: 1.8, rotationY: 1.2 } },
    { type: "rock", position: { x: -32, y: 0, z: 36, scale: 2.2, rotationY: 2.1 } },
    { type: "rock", position: { x: 35, y: 0, z: 38, scale: 1.9, rotationY: 3.8 } },
    { type: "rock", position: { x: -38, y: 0, z: 8, scale: 1.7, rotationY: 4.5 } },
    { type: "rock", position: { x: 40, y: 0, z: -8, scale: 2.1, rotationY: 1.8 } },
    { type: "rock", position: { x: 8, y: 0, z: -38, scale: 1.6, rotationY: 2.7 } },
    { type: "rock", position: { x: -12, y: 0, z: 37, scale: 1.8, rotationY: 0.9 } },

    // Mid-range rocks for tactical cover
    { type: "rock", position: { x: -25, y: 0, z: -20, scale: 1.4, rotationY: 1.3 } },
    { type: "rock", position: { x: 28, y: 0, z: -18, scale: 1.2, rotationY: 2.4 } },
    { type: "rock", position: { x: -22, y: 0, z: 25, scale: 1.6, rotationY: 0.7 } },
    { type: "rock", position: { x: 26, y: 0, z: 22, scale: 1.3, rotationY: 3.1 } },
    { type: "rock", position: { x: -28, y: 0, z: 5, scale: 1.1, rotationY: 4.2 } },
    { type: "rock", position: { x: 30, y: 0, z: -5, scale: 1.5, rotationY: 1.6 } },
    { type: "rock", position: { x: 5, y: 0, z: -25, scale: 1.3, rotationY: 2.8 } },
    { type: "rock", position: { x: -8, y: 0, z: 28, scale: 1.4, rotationY: 0.4 } },

    // Inner tactical rocks - smaller, for quick cover
    { type: "rock", position: { x: -15, y: 0, z: -12, scale: 0.8, rotationY: 1.7 } },
    { type: "rock", position: { x: 18, y: 0, z: -10, scale: 0.9, rotationY: 2.9 } },
    { type: "rock", position: { x: -12, y: 0, z: 16, scale: 0.7, rotationY: 0.8 } },
    { type: "rock", position: { x: 15, y: 0, z: 14, scale: 1.0, rotationY: 3.4 } },
    { type: "rock", position: { x: -18, y: 0, z: 2, scale: 0.9, rotationY: 4.8 } },
    { type: "rock", position: { x: 20, y: 0, z: -2, scale: 0.8, rotationY: 1.9 } },
    { type: "rock", position: { x: 2, y: 0, z: -15, scale: 0.8, rotationY: 3.0 } },
    { type: "rock", position: { x: -5, y: 0, z: 18, scale: 0.9, rotationY: 0.6 } },

    // Central area - strategic clusters
    { type: "rock", position: { x: -8, y: 0, z: -8, scale: 0.6, rotationY: 2.2 } },
    { type: "rock", position: { x: 10, y: 0, z: -6, scale: 0.7, rotationY: 3.7 } },
    { type: "rock", position: { x: -6, y: 0, z: 12, scale: 0.6, rotationY: 1.4 } },
    { type: "rock", position: { x: 8, y: 0, z: 10, scale: 0.8, rotationY: 4.1 } },

    // Additional scattered rocks for visual variety
    { type: "rock", position: { x: 0, y: 0, z: 32, scale: 1.3, rotationY: 2.6 } },
    { type: "rock", position: { x: -30, y: 0, z: -10, scale: 1.2, rotationY: 1.1 } },
    { type: "rock", position: { x: 32, y: 0, z: 8, scale: 1.4, rotationY: 3.9 } },
    { type: "rock", position: { x: 12, y: 0, z: 28, scale: 1.1, rotationY: 0.3 } },
    { type: "rock", position: { x: -25, y: 0, z: 15, scale: 1.0, rotationY: 4.6 } }
  ],

  // Spawn points spread across the larger arena
  spawnPoints: [
    // Player spawn at center
    {
      type: "player",
      position: { x: 0, y: 0.5, z: 0 }
    },
    // Portal spawn 
    {
      type: "portal",
      position: { x: 0, y: 0, z: 30 }
    },
    // Enemy spawn points - distributed around the arena
    {
      type: "enemy",
      position: { x: -20, y: 5, z: -20 },
      enemyCount: 1
    },
    {
      type: "enemy",
      position: { x: 25, y: 5, z: -15 },
      enemyCount: 1
    },
    {
      type: "enemy",
      position: { x: -15, y: 5, z: 25 },
      enemyCount: 1
    },
    {
      type: "enemy",
      position: { x: 20, y: 5, z: 20 },
      enemyCount: 1
    },
    {
      type: "enemy",
      position: { x: -30, y: 5, z: 0 },
      enemyCount: 1
    },
    {
      type: "enemy",
      position: { x: 30, y: 5, z: 5 },
      enemyCount: 1
    }
  ],

  // Enhanced environment settings
  environment: {
    fog: {
      color: 0x2a2a3a,
      near: 15,  // Start fog a bit further for larger arena
      far: 150   // Extend fog range for larger arena
    },
    skybox: {
      texture: "textures/skybox/storm",
      rotation: { x: -Math.PI / 2, y: (-3 * Math.PI) / 4, z: 0 }
    },
    effects: {
      bloom: {
        enabled: true,
        intensity: 10,
        radius: 0.5,
        luminanceThreshold: 0.2,
        luminanceSmoothing: 0.3
      },
      chromaticAberration: {
        enabled: true,
        offset: { x: 0.002, y: 0.002 }
      },
      depthOfField: {
        enabled: true,
        focusDistance: 0.035,
        focalLength: 0.02,
        bokehScale: 3.0
      }
    }
  }
};