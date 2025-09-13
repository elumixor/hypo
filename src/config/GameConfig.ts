/**
 * Central configuration for the HYPO game
 * All game constants and settings are defined here for easy maintenance
 */

export const GameConfig = {
  // World structure
  WORLD_COUNT: 8,
  LEVELS_PER_WORLD: 5,

  // Player configuration
  PLAYER: {
    SPEED: 4,
    MOVEMENT_SPEED: 4,
    DASH_SPEED: 10,
    DASH_DURATION: 0.18, // seconds
    DASH_COOLDOWN: 0.5,
    DASH_ENERGY_COST: 25,
    MAX_HP: 10,
    MAX_ENERGY: 100,
    ENERGY_REGEN_RATE: 20, // per second
    SHIELD_ENERGY_COST: 30, // per second
    SIZE: 0.8,
    HEIGHT_OFFSET: 0.4,
    SHIELD_RADIUS: 1.1,
    INITIAL_YAW: Math.PI * 0.25,
  },

  // Camera settings
  CAMERA: {
    FOV: 50,
    NEAR: 0.1,
    FAR: 100,
    YAW: Math.PI * 0.25,
    PITCH: 1.5,
    DISTANCE: 10,
    HEIGHT_OFFSET: 3.5,
    LOOK_HEIGHT: 0.4,
  },

  // Combat system
  COMBAT: {
    PROJECTILE_SPEED: 6,
    PROJECTILE_SIZE: 0.2,
    PROJECTILE_RANGE: 30,
    HIT_DISTANCE: 0.6,
    AUTO_SHOOT_INTERVAL: 0.5,
  },

  // Experience and leveling
  PROGRESSION: {
    INITIAL_LEVEL: 1,
    INITIAL_XP: 0,
    INITIAL_XP_TO_NEXT: 5,
    XP_MULTIPLIER: 1.4,
    XP_BASE_INCREASE: 2,
    XP_COLLECTION_DISTANCE: 0.8,
    XP_CRYSTAL_SIZE: 0.18,
  },

  // Enemy configuration
  ENEMIES: {
    WAVE_SIZE: 5,
    BASE_HP: 3,
    MIN_PLAYER_DISTANCE: 0.9,
    SEPARATION_DISTANCE: 0.6,
    MOVEMENT_SPEED: 1.2,
    SHOOT_COOLDOWN_MIN: 900, // ms
    SHOOT_COOLDOWN_VARIANCE: 600, // ms
  },

  // UI settings
  UI: {
    HEALTH_BAR_WIDTH: 160,
    HEALTH_BAR_HEIGHT: 12,
    STATUS_UPDATE_INTERVAL: 16, // ~60fps
  },

  // World environment
  WORLD: {
    GROUND_RADIUS: 5,
    GROUND_HEIGHT: 0.2,
    AMBIENT_LIGHT_INTENSITY: 0.6,
    DIRECTIONAL_LIGHT_INTENSITY: 2.2,
  },

  // Colors (hex strings for consistency)
  COLORS: {
    BACKGROUND: "#050507",
    PLAYER: "#4ec9ff",
    PLAYER_SHIELD: "#6cf",
    SHIELD: "#6cf",
    ENEMY: "#ff2b2b",
    PROJECTILE_PLAYER: "#ffe14e",
    PROJECTILE_ENEMY: "#ff7b72",
    XP_CRYSTAL: "#7af",
    GROUND: "#111318",
    UI_TEXT: "#ffffff",
    UI_HEALTH: "#ff4444",
    UI_BUTTON_BG: "#222a",
  },

  // Performance settings
  PERFORMANCE: {
    TARGET_FPS: 60,
    FPS_CALCULATION_INTERVAL: 0.5, // seconds
  },
} as const;

export type GameConfigType = typeof GameConfig;
