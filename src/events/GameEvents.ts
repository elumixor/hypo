import { EventEmitter } from "@elumixor/frontils";

/**
 * Type-safe event system for game communication
 * Individual EventEmitters for each event type using @elumixor/frontils
 */

// Player events
export const playerHit = new EventEmitter<{ damage: number; currentHp: number }>();
export const playerDeath = new EventEmitter<{ level: number; xp: number }>();
export const playerLevelUp = new EventEmitter<{ newLevel: number; xp: number; xpToNext: number }>();
export const playerDash = new EventEmitter<{ success: boolean }>();
export const playerShield = new EventEmitter<{ active: boolean }>();

// Combat events
export const combatAttack = new EventEmitter<{ type: "easy" | "alt"; target?: { x: number; y: number; z: number } }>();
export const combatProjectileSpawn = new EventEmitter<{
  fromPlayer: boolean;
  position: { x: number; y: number; z: number };
}>();
export const combatEnemyKilled = new EventEmitter<{ position: { x: number; y: number; z: number } }>();

// XP events
export const xpCollected = new EventEmitter<{ amount: number; totalXp: number }>();
export const xpSpawned = new EventEmitter<{ position: { x: number; y: number; z: number } }>();

// UI events
export const uiStatusUpdate = new EventEmitter<{ message: string }>();
export const uiHealthUpdate = new EventEmitter<{ current: number; max: number }>();
export const uiXpUpdate = new EventEmitter<{ level: number; xp: number; xpToNext: number }>();

// Game state events
export const gamePaused = new EventEmitter<Record<string, never>>();
export const gameResumed = new EventEmitter<Record<string, never>>();
export const gameOver = new EventEmitter<Record<string, never>>();
export const gameRestart = new EventEmitter<Record<string, never>>();

// Character events
export const characterSwitch = new EventEmitter<{ from: string; to: string }>();
export const characterJoin = new EventEmitter<{ characterId: string; name: string }>();

// World events
export const worldTransition = new EventEmitter<{ from: number; to: number }>();
export const levelComplete = new EventEmitter<{ worldId: number; levelId: number }>();
export const bossDefeated = new EventEmitter<{ worldId: number; bossId: string }>();
