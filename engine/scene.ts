import type { Constructor } from "./behavior";
import type { Entity } from "./entity";
import type { Game } from "./game";
import type { Service } from "./service";
import type { Widget } from "./widget";

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
    entity.scene = this;
    // Use a simple counter or timestamp for entity ids since we removed the id field
    const entityId = `entity_${Date.now()}_${Math.random()}`;
    this.entities.set(entityId, entity);
    entity.init();
    entity.enterScene();
    return entity;
  }

  removeEntity(entity: Entity): void {
    // Find entity by reference since we removed id field
    const entries = Array.from(this.entities.entries());
    for (const [id, storedEntity] of entries) {
      if (storedEntity === entity) {
        entity.exitScene();
        entity.destroy();
        this.entities.delete(id);
        break;
      }
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

  getService<T extends Service>(serviceClass: Constructor<T>): T {
    const service = this.services.get(serviceClass);
    if (!service) {
      throw new Error(`Service ${serviceClass.name} not found in scene ${this.id}`);
    }
    return service as T;
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
