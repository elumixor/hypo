import type { Scene } from "./scene";
import type { Service } from "./service";

export abstract class Widget {
  readonly id: string;
  scene!: Scene;

  constructor(id?: string) {
    this.id = id || Math.random().toString(36).substring(2);
  }

  protected onInit(): void {}

  protected onEnterScene(): void {}

  protected onUpdate(_dt: number): void {}

  protected onExitScene(): void {}

  protected onDestroy(): void {}

  setScene(scene: Scene): void {
    this.scene = scene;
  }

  protected getService<T extends Service>(serviceClass: new (...args: any[]) => T): T {
    return this.scene.getService(serviceClass);
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
