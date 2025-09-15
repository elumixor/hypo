import type { Constructor } from "./behavior";
import type { Scene } from "./scene";
import type { Service } from "./service";

export abstract class Game {
  private readonly services: Map<Function, Service> = new Map();
  private currentScene?: Scene;
  private readonly scenes: Map<string, Scene> = new Map();

  protected onInit(): void {}

  protected onUpdate(_dt: number): void {}

  protected onDestroy(): void {}

  addService<T extends Service>(service: T): T {
    this.services.set(service.constructor, service);
    service.init();
    return service;
  }

  getService<T extends Service>(serviceClass: Constructor<T>): T {
    const service = this.services.get(serviceClass);
    if (!service) {
      throw new Error(`Service ${serviceClass.name} not found`);
    }
    return service as T;
  }

  registerScene(scene: Scene): void {
    scene.setGame(this);
    this.scenes.set(scene.id, scene);
    scene.init();
  }

  switchToScene(sceneId: string): void {
    const scene = this.scenes.get(sceneId);
    if (!scene) {
      throw new Error(`Scene ${sceneId} not found`);
    }

    if (this.currentScene) {
      this.currentScene.exitScene();
    }

    this.currentScene = scene;
    this.currentScene.enterScene();
  }

  getCurrentScene(): Scene | undefined {
    return this.currentScene;
  }

  init(): void {
    this.onInit();
  }

  update(dt: number): void {
    this.onUpdate(dt);

    // Update services
    for (const service of Array.from(this.services.values())) {
      service.update(dt);
    }

    // Update current scene
    if (this.currentScene) {
      this.currentScene.update(dt);
    }
  }

  destroy(): void {
    this.onDestroy();

    // Destroy current scene
    if (this.currentScene) {
      this.currentScene.exitScene();
      this.currentScene.destroy();
    }

    // Destroy all scenes
    for (const scene of Array.from(this.scenes.values())) {
      scene.destroy();
    }
    this.scenes.clear();

    // Destroy services
    for (const service of Array.from(this.services.values())) {
      service.destroy();
    }
    this.services.clear();
  }
}
