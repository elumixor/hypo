import type { Entity } from "./entity";
import type { Service } from "./service";

export abstract class Behavior {
  entity!: Entity;

  onInit(): void {
    // Override in subclasses
  }

  onEnterScene(): void {
    // Override in subclasses
  }

  onUpdate(_dt: number): void {
    // Override in subclasses
  }

  onExitScene(): void {
    // Override in subclasses
  }

  onDestroy(): void {
    // Override in subclasses
  }

  protected getService<T extends Service>(serviceClass: Constructor<T>): T {
    return this.entity.scene.getService(serviceClass);
  }
}

export type Constructor<T> = new (...args: any[]) => T;
