import { EventEmitter as LibEventEmitter } from "@elumixor/frontils";

/**
 * Type-safe event system for game communication
 */

export interface GameEvents {
  // Player events
  "player:hit": { damage: number; currentHp: number };
  "player:death": { level: number; xp: number };
  "player:levelUp": { newLevel: number; xp: number; xpToNext: number };
  "player:dash": { success: boolean };
  "player:shield": { active: boolean };

  // Combat events
  "combat:attack": { type: "easy" | "alt"; target?: { x: number; y: number; z: number } };
  "combat:projectile:spawn": { fromPlayer: boolean; position: { x: number; y: number; z: number } };
  "combat:enemy:killed": { position: { x: number; y: number; z: number } };

  // XP events
  "xp:collected": { amount: number; totalXp: number };
  "xp:spawned": { position: { x: number; y: number; z: number } };

  // UI events
  "ui:statusUpdate": { message: string };
  "ui:healthUpdate": { current: number; max: number };
  "ui:xpUpdate": { level: number; xp: number; xpToNext: number };

  // Game state events
  "game:paused": Record<string, never>;
  "game:resumed": Record<string, never>;
  "game:over": Record<string, never>;
  "game:restart": Record<string, never>;

  // Character events
  "character:switch": { from: string; to: string };
  "character:join": { characterId: string; name: string };

  // World events
  "world:transition": { from: number; to: number };
  "level:complete": { worldId: number; levelId: number };
  "boss:defeated": { worldId: number; bossId: string };
}

export type GameEventType = keyof GameEvents;
export type GameEventData<T extends GameEventType> = GameEvents[T];

/**
 * Custom EventEmitter class that extends the library version with type-safe game events
 */
export class EventEmitter {
  private readonly emitters = new Map<GameEventType, LibEventEmitter<unknown>>();

  private getEmitter<T extends GameEventType>(event: T): LibEventEmitter<GameEventData<T>> {
    if (!this.emitters.has(event)) {
      this.emitters.set(event, new LibEventEmitter<GameEventData<T>>() as LibEventEmitter<unknown>);
    }
    return this.emitters.get(event) as LibEventEmitter<GameEventData<T>>;
  }

  /**
   * Subscribe to an event
   */
  on<T extends GameEventType>(event: T, listener: (data: GameEventData<T>) => void): () => void {
    const emitter = this.getEmitter(event);
    emitter.subscribe(listener);
    return (): void => emitter.unsubscribe(listener);
  }

  /**
   * Subscribe to an event but only listen once
   */
  once<T extends GameEventType>(event: T, listener: (data: GameEventData<T>) => void): () => void {
    const emitter = this.getEmitter(event);
    emitter.subscribeOnce(listener);
    return (): void => emitter.unsubscribe(listener);
  }

  /**
   * Emit an event to all listeners
   */
  emit<T extends GameEventType>(event: T, data: GameEventData<T>): void {
    const emitter = this.getEmitter(event);
    emitter.emit(data);
  }

  /**
   * Remove all listeners for a specific event or all events
   */
  removeAllListeners(event?: GameEventType): void {
    if (event) {
      this.emitters.delete(event);
    } else {
      this.emitters.clear();
    }
  }

  /**
   * Get the number of listeners for an event
   */
  listenerCount(event: GameEventType): number {
    const emitter = this.emitters.get(event);
    return emitter ? 1 : 0; // Library EventEmitter doesn't expose listener count
  }

  /**
   * Get next event promise (useful for async operations)
   */
  async nextEvent<T extends GameEventType>(event: T): Promise<GameEventData<T>> {
    const emitter = this.getEmitter(event);
    return await emitter.nextEvent;
  }
}

// Global event emitter instance
export const gameEvents: EventEmitter = new EventEmitter();
