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
  "game:paused": {};
  "game:resumed": {};
  "game:over": {};
  "game:restart": {};

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

export class EventEmitter {
  private listeners = new Map<GameEventType, Set<(data: any) => void>>();

  /**
   * Subscribe to an event
   */
  on<T extends GameEventType>(event: T, listener: (data: GameEventData<T>) => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    const eventListeners = this.listeners.get(event)!;
    eventListeners.add(listener);

    // Return unsubscribe function
    return () => {
      eventListeners.delete(listener);
      if (eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    };
  }

  /**
   * Subscribe to an event but only listen once
   */
  once<T extends GameEventType>(event: T, listener: (data: GameEventData<T>) => void): () => void {
    const unsubscribe = this.on(event, (data) => {
      unsubscribe();
      listener(data);
    });
    return unsubscribe;
  }

  /**
   * Emit an event to all listeners
   */
  emit<T extends GameEventType>(event: T, data: GameEventData<T>): void {
    const eventListeners = this.listeners.get(event);
    if (!eventListeners) return;

    // Create a copy to avoid issues if listeners are modified during iteration
    const listeners = [...eventListeners];
    for (const listener of listeners) {
      try {
        listener(data);
      } catch (error) {
        console.error(`Error in event listener for '${event}':`, error);
      }
    }
  }

  /**
   * Remove all listeners for a specific event or all events
   */
  removeAllListeners(event?: GameEventType): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  /**
   * Get the number of listeners for an event
   */
  listenerCount(event: GameEventType): number {
    return this.listeners.get(event)?.size ?? 0;
  }
}

// Global event emitter instance
export const gameEvents = new EventEmitter();