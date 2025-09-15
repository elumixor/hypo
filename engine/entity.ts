import type { Behavior, Constructor } from "./behavior";
import type { Scene } from "./scene";
import type { Service } from "./service";

export abstract class Entity {
  scene!: Scene;
  private readonly behaviors: Behavior[] = [];

  onInit(): void {}

  onEnterScene(): void {}

  onUpdate(_dt: number): void {}

  onExitScene(): void {}

  onDestroy(): void {}

  addBehavior(behavior: Behavior): void {
    behavior.entity = this;
    this.behaviors.push(behavior);
    if (this.scene) {
      behavior.onInit();
      behavior.onEnterScene();
    }
  }

  removeBehavior(behavior: Behavior): void {
    const index = this.behaviors.indexOf(behavior);
    if (index !== -1) {
      behavior.onExitScene();
      behavior.onDestroy();
      this.behaviors.splice(index, 1);
    }
  }

  protected getService<T extends Service>(serviceClass: Constructor<T>): T {
    return this.scene.getService(serviceClass);
  }

  init(): void {
    this.onInit();
    for (const behavior of this.behaviors) behavior.onInit();
  }

  enterScene(): void {
    this.onEnterScene();
    for (const behavior of this.behaviors) behavior.onEnterScene();
  }

  update(dt: number): void {
    this.onUpdate(dt);
    for (const behavior of this.behaviors) behavior.onUpdate(dt);
  }

  exitScene(): void {
    this.onExitScene();
    for (const behavior of this.behaviors) behavior.onExitScene();
  }

  destroy(): void {
    this.onDestroy();
    for (const behavior of this.behaviors) behavior.onDestroy();
    this.behaviors.length = 0;
  }
}
