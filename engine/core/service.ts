import type { Constructor } from "@elumixor/frontils";
import type { Game } from "./game";
import type { Scene } from "./scene";

/**
 * Base class for services that provide functionality to entities and widgets within a scene.
 */
export abstract class Service {
  private _game?: Game;
  scene?: Scene;

  get game() {
    if (!this._game) throw new Error("Service is not part of a game yet");
    return this._game;
  }

  set game(game: Game) {
    this._game = game;
  }

  /** Called either when the game is started, if the service is game-wide, or when the scene is initialized. */
  async init() {
    // Override in subclasses
  }

  /** Called every frame while the service is active. */
  update(_dt: number) {
    // Override in subclasses
  }

  /** Called in the scene-local services when the scene is destroyed. */
  destroy() {
    // Override in subclasses
  }

  protected getService<T extends Service>(serviceClass: Constructor<T>): T {
    return this.scene?.getService(serviceClass) ?? this.game.getService(serviceClass);
  }

  /** Handy logging function that prepends the colored service name. */
  protected log(...args: unknown[]) {
    log(this.constructor.name, ...args);
  }

  /** Handy warning logging function that prepends the colored service name. */
  protected logWarning(...args: unknown[]) {
    logWarning(this.constructor.name, ...args);
  }

  /** Handy error logging function that prepends the colored service name. */
  protected logError(...args: unknown[]) {
    logError(this.constructor.name, ...args);
  }
}
