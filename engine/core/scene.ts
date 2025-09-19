import type { Constructor } from "@elumixor/frontils";
import { type InputMappingContext, InputService } from "@engine/systems/input";
import { Container } from "pixi.js";
import { Group } from "three";
import type { Behavior } from "./behavior";
import type { Entity } from "./entity";
import type { Game } from "./game";
import type { Service } from "./service";
import type { Widget } from "./widget";
import type { Effects, EffectsConfig } from "../../src/rendering/effects";

export abstract class Scene {
  protected _game?: Game;

  readonly entities = [] as Entity[];
  readonly widgets = [] as Widget[];
  readonly services = [] as Service[];

  readonly uiRoot = new Container();
  readonly sceneRoot = new Group();

  input?: InputMappingContext;

  // Optional post-processing effects
  protected effects?: Effects;
  protected effectsConfig?: EffectsConfig;

  get game() {
    if (!this._game) throw new Error("Scene is not part of a game yet");
    return this._game;
  }

  set game(game: Game) {
    this._game = game;
    for (const service of this.services) service.game = game;
  }

  /** Handy shortcut to the game camera */
  get camera() {
    return this.game.camera;
  }

  /** Get the effects instance if enabled */
  getEffects() {
    return this.effects;
  }

  /** Check if effects are enabled for this scene */
  hasEffects() {
    return !!this.effects;
  }

  private get initialized() {
    return !!this._game;
  }

  async init() {
    // Set the input context if we have one. The input service is always available as global on the Game
    if (this.input) this.getService(InputService).context = this.input;

    this.game.uiRoot.addChild(this.uiRoot);
    this.game.sceneRoot.add(this.sceneRoot);

    // Initialize effects if config is provided
    if (this.effectsConfig) {
      const { Effects } = await import("../../src/rendering/effects");
      this.effects = new Effects(
        this.game.sceneRoot,
        this.game.camera,
        this.game.threeRenderer,
        this.effectsConfig
      );
      
      // Subscribe to resize events
      this.game.resized.subscribe(({ width, height }) => {
        this.effects?.resize(width, height);
      });
    }

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

    // Clean up effects
    if (this.effects) {
      this.effects.destroy();
      this.effects = undefined;
    }

    for (const service of this.services) service.destroy();
    for (const entity of Array.from(this.entities.values())) entity.destroy();
    for (const widget of Array.from(this.widgets.values())) widget.destroy();
  }

  addEntity<T extends Entity>(entity: T) {
    entity.scene = this;

    if (this.initialized) void entity.init().then(() => this.entities.push(entity));
    else this.entities.push(entity);

    return entity;
  }

  removeEntity(entity: Entity) {
    if (!this.entities.includes(entity)) return;
    this.entities.remove(entity);
    entity.destroy();
  }

  /** Should be called before onInit() - in constructor() */
  addWidget<T extends Widget>(widget: T) {
    widget.scene = this;
    this.widgets.push(widget);
    return widget;
  }

  removeWidget(widget: Widget) {
    if (!this.widgets.includes(widget)) return;
    widget.destroy();
    this.widgets.remove(widget);
  }

  addService<T extends Service>(service: T) {
    service.scene = this;
    this.services.push(service);
    return service;
  }

  getService<T extends Service>(serviceClass: Constructor<T>): T {
    const myService = this.services.find((s) => s instanceof serviceClass) as T | undefined;
    return myService ?? this.game.getService<T>(serviceClass);
  }

  getEntity<T extends Entity>(entityClass: Constructor<T>): T {
    const entity = this.entities.find((e) => e instanceof entityClass) as T | undefined;
    if (!entity) throw new Error(`Entity ${entityClass.name} not found in scene`);
    return entity;
  }

  getEntities<T extends Entity>(entityClass: Constructor<T>): T[] {
    return this.entities.filter((e) => e instanceof entityClass) as T[];
  }

  getBehaviors<T extends Behavior>(behaviorClass: Constructor<T>): T[] {
    return this.entities.flatMap((e) => e.getBehaviors(behaviorClass));
  }

  /** Configure post-processing effects for this scene. Must be called before init() */
  protected configureEffects(config: EffectsConfig) {
    this.effectsConfig = config;
  }
}
