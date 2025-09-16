import type { Game } from "./game";

/**
 * Base class for services that provide functionality to entities and widgets within a scene.
 */
export abstract class Service {
  private _game?: Game;

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
}
