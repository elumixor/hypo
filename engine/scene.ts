import type { Entity } from "./entity";
import type { Service } from "./service";
import type { Widget } from "./widget";
import type { Game } from "./game";

export abstract class Scene {
  readonly id: string;
  protected game!: Game;
  private readonly entities: Map<string, Entity> = new Map();
  private readonly widgets: Map<string, Widget> = new Map();
  private readonly services: Map<Function, Service> = new Map();

  constructor(id: string) {
    this.id = id;
  }

  protected onInit(): void {}
  
  protected onEnterScene(): void {}
  
  protected onUpdate(_dt: number): void {}
  
  protected onExitScene(): void {}
  
  protected onDestroy(): void {}

  setGame(game: Game): void {
    this.game = game;
  }

  addEntity<T extends Entity>(entity: T): T {
    entity.setScene(this);
    this.entities.set(entity.id, entity);
    entity.init();
    entity.enterScene();
    return entity;
  }

  removeEntity(entity: Entity): void {
    if (this.entities.has(entity.id)) {
      entity.exitScene();
      entity.destroy();
      this.entities.delete(entity.id);
    }
  }

  addWidget<T extends Widget>(widget: T): T {
    widget.setScene(this);
    this.widgets.set(widget.id, widget);
    widget.init();
    widget.enterScene();
    return widget;
  }

  removeWidget(widget: Widget): void {
    if (this.widgets.has(widget.id)) {
      widget.exitScene();
      widget.destroy();
      this.widgets.delete(widget.id);
    }
  }

  addService<T extends Service>(service: T): T {
    this.services.set(service.constructor, service);
    service.init();
    service.enterScene();
    return service;
  }

  getService<T extends Service>(serviceClass: new (...args: any[]) => T): T {
    const service = this.services.get(serviceClass);
    if (!service) {
      throw new Error(`Service ${serviceClass.name} not found in scene ${this.id}`);
    }
    return service as T;
  }

  hasService<T extends Service>(serviceClass: new (...args: any[]) => T): boolean {
    return this.services.has(serviceClass);
  }

  init(): void {
    this.onInit();
  }

  enterScene(): void {
    this.onEnterScene();
  }

  update(dt: number): void {
    this.onUpdate(dt);
    
    // Update services
    for (const service of Array.from(this.services.values())) {
      service.update(dt);
    }
    
    // Update entities
    for (const entity of Array.from(this.entities.values())) {
      entity.update(dt);
    }
    
    // Update widgets
    for (const widget of Array.from(this.widgets.values())) {
      widget.update(dt);
    }
  }

  exitScene(): void {
    this.onExitScene();
    
    // Exit scene for all components
    for (const widget of Array.from(this.widgets.values())) {
      widget.exitScene();
    }
    
    for (const entity of Array.from(this.entities.values())) {
      entity.exitScene();
    }
    
    for (const service of Array.from(this.services.values())) {
      service.exitScene();
    }
  }

  destroy(): void {
    this.onDestroy();
    
    // Destroy all components
    for (const widget of Array.from(this.widgets.values())) {
      widget.destroy();
    }
    this.widgets.clear();
    
    for (const entity of Array.from(this.entities.values())) {
      entity.destroy();
    }
    this.entities.clear();
    
    for (const service of Array.from(this.services.values())) {
      service.destroy();
    }
    this.services.clear();
  }
}