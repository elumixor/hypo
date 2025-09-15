import type { Service } from "./service";
import type { Scene } from "./scene";

export abstract class Behavior {
  protected entity!: Entity;

  protected onInit(): void {}
  
  protected onEnterScene(): void {}
  
  protected onUpdate(_dt: number): void {}
  
  protected onExitScene(): void {}
  
  protected onDestroy(): void {}

  setEntity(entity: Entity): void {
    this.entity = entity;
  }

  protected getService<T extends Service>(serviceClass: new (...args: any[]) => T): T {
    return this.entity.scene.getService(serviceClass);
  }

  init(): void {
    this.onInit();
  }

  enterScene(): void {
    this.onEnterScene();
  }

  update(dt: number): void {
    this.onUpdate(dt);
  }

  exitScene(): void {
    this.onExitScene();
  }

  destroy(): void {
    this.onDestroy();
  }
}

export abstract class Entity {
  readonly id: string;
  scene!: Scene;
  private readonly behaviors: Behavior[] = [];

  constructor(id?: string) {
    this.id = id || Math.random().toString(36).substring(2);
  }

  protected onInit(): void {}
  
  protected onEnterScene(): void {}
  
  protected onUpdate(_dt: number): void {}
  
  protected onExitScene(): void {}
  
  protected onDestroy(): void {}

  addBehavior(behavior: Behavior): void {
    behavior.setEntity(this);
    this.behaviors.push(behavior);
    if (this.scene) {
      behavior.init();
      behavior.enterScene();
    }
  }

  removeBehavior(behavior: Behavior): void {
    const index = this.behaviors.indexOf(behavior);
    if (index !== -1) {
      behavior.exitScene();
      behavior.destroy();
      this.behaviors.splice(index, 1);
    }
  }

  setScene(scene: Scene): void {
    this.scene = scene;
  }

  protected getService<T extends Service>(serviceClass: new (...args: any[]) => T): T {
    return this.scene.getService(serviceClass);
  }

  init(): void {
    this.onInit();
    for (const behavior of this.behaviors) behavior.init();
  }

  enterScene(): void {
    this.onEnterScene();
    for (const behavior of this.behaviors) behavior.enterScene();
  }

  update(dt: number): void {
    this.onUpdate(dt);
    for (const behavior of this.behaviors) behavior.update(dt);
  }

  exitScene(): void {
    this.onExitScene();
    for (const behavior of this.behaviors) behavior.exitScene();
  }

  destroy(): void {
    this.onDestroy();
    for (const behavior of this.behaviors) behavior.destroy();
    this.behaviors.length = 0;
  }
}