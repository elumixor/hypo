import type { Scene } from "./scene";
import type { Service } from "./service";

export abstract class Game {
  private readonly globalServices: Map<Function, Service> = new Map();
  private currentScene?: Scene;
  private readonly scenes: Map<string, Scene> = new Map();

  protected onInit(): void {}
  
  protected onUpdate(_dt: number): void {}
  
  protected onDestroy(): void {}

  addGlobalService<T extends Service>(service: T): T {
    this.globalServices.set(service.constructor, service);
    service.init();
    return service;
  }

  getGlobalService<T extends Service>(serviceClass: new (...args: any[]) => T): T {
    const service = this.globalServices.get(serviceClass);
    if (!service) {
      throw new Error(`Global service ${serviceClass.name} not found`);
    }
    return service as T;
  }

  hasGlobalService<T extends Service>(serviceClass: new (...args: any[]) => T): boolean {
    return this.globalServices.has(serviceClass);
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

    // Update global services
    for (const service of Array.from(this.globalServices.values())) {
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

    // Destroy global services
    for (const service of Array.from(this.globalServices.values())) {
      service.destroy();
    }
    this.globalServices.clear();
  }
}