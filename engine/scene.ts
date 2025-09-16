import type { Constructor } from "@elumixor/frontils";
import { Container } from "pixi.js";
import { Group } from "three";
import type { Entity } from "./entity";
import type { Game } from "./game";
import type { Service } from "./service";
import type { Widget } from "./widget";

export abstract class Scene {
  protected _game?: Game;

  readonly entities = [] as Entity[];
  readonly widgets = [] as Widget[];
  readonly services = [] as Service[];

  readonly uiRoot = new Container();
  readonly sceneRoot = new Group();

  get game() {
    if (!this._game) throw new Error("Scene is not part of a game yet");
    return this._game;
  }

  set game(game: Game) {
    this._game = game;
  }

  /** Handy shortcut to the game camera */
  get camera() {
    return this.game.camera;
  }

  async init() {
    this.game.uiRoot.addChild(this.uiRoot);
    this.game.sceneRoot.add(this.sceneRoot);

    await Promise.all([
      ...this.services.map((s) => s.init()),
      ...this.entities.map((e) => e.init()),
      ...this.widgets.map((w) => w.init()),
    ]);
  }

  update(dt: number) {
    for (const service of this.services) service.update(dt);
    for (const entity of Array.from(this.entities.values())) entity.update(dt);
    for (const widget of Array.from(this.widgets.values())) widget.update(dt);
  }

  destroy() {
    this.game.uiRoot.removeChild(this.uiRoot);
    this.game.sceneRoot.remove(this.sceneRoot);

    for (const service of this.services) service.destroy();
    for (const entity of Array.from(this.entities.values())) entity.destroy();
    for (const widget of Array.from(this.widgets.values())) widget.destroy();
  }

  /** Should be called before onInit() - in constructor() */
  addEntity<T extends Entity>(entity: T) {
    entity.scene = this;
    this.entities.push(entity);
  }

  removeEntity(entity: Entity) {
    if (!this.entities.includes(entity)) return;
    if (this._game) entity.destroy();
    this.entities.remove(entity);
  }

  /** Should be called before onInit() - in constructor() */
  addWidget(widget: Widget) {
    widget.scene = this;
    this.widgets.push(widget);
  }

  removeWidget(widget: Widget) {
    if (!this.widgets.includes(widget)) return;
    widget.destroy();
    this.widgets.remove(widget);
  }

  addService(service: Service) {
    this.services.push(service);
  }

  getService<T extends Service>(serviceClass: Constructor<T>): T | undefined {
    const myService = this.services.find((s) => s instanceof serviceClass) as T | undefined;
    return myService ?? this.game.getService<T>(serviceClass);
  }
}
