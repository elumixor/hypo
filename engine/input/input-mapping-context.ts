import { EventEmitter } from "@elumixor/event-emitter";
import { Vector2 } from "three";

export abstract class InputMappingContext {
  private readonly eventMappings = new Map<string, EventEmitter<void>>();
  private readonly flagMappings = new Map<string, { value: boolean }>();
  private readonly vector2Mappings: Array<{
    vector: Vector2;
    positiveX: string;
    negativeX: string;
    positiveY: string;
    negativeY: string;
  }> = [];
  private readonly previousPressedKeys = new Set<string>();
  protected readonly pressedKeys = new Set<string>();

  protected map2D(positiveX: string, negativeX: string, positiveY: string, negativeY: string): Vector2 {
    const vector = new Vector2();
    this.vector2Mappings.push({ vector, positiveX, negativeX, positiveY, negativeY });
    return vector;
  }

  protected mapEvent(key: string): EventEmitter<void> {
    const emitter = new EventEmitter<void>();
    this.eventMappings.set(key, emitter);
    return emitter;
  }

  protected mapFlag(key: string): { value: boolean } {
    const flag = { value: false };
    this.flagMappings.set(key, flag);
    return flag;
  }

  // Called by service to update key states
  updateKeys(pressedKeys: Set<string>) {
    this.previousPressedKeys.clear();
    for (const key of this.pressedKeys) this.previousPressedKeys.add(key);

    this.pressedKeys.clear();
    for (const key of pressedKeys) this.pressedKeys.add(key);

    // Emit events for newly pressed keys
    for (const key of this.pressedKeys) {
      if (!this.previousPressedKeys.has(key)) {
        this.eventMappings.get(key)?.emit();
      }
    }

    // Update flags
    for (const [key, flag] of this.flagMappings) {
      flag.value = this.pressedKeys.has(key);
    }

    // Update vectors
    for (const mapping of this.vector2Mappings) {
      mapping.vector.set(0, 0);
      if (this.pressedKeys.has(mapping.positiveX)) mapping.vector.x += 1;
      if (this.pressedKeys.has(mapping.negativeX)) mapping.vector.x -= 1;
      if (this.pressedKeys.has(mapping.positiveY)) mapping.vector.y += 1;
      if (this.pressedKeys.has(mapping.negativeY)) mapping.vector.y -= 1;
      if (mapping.vector.length() > 0) mapping.vector.normalize();
    }
  }
}
