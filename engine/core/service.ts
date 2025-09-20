import type { Constructor } from "@elumixor/frontils";
import { EngineObject } from "./engine-object";
import type { Game } from "./game";
import type { Scene } from "./scene";

/**
 * Base class for services that provide functionality to entities and widgets within a scene.
 */
export abstract class Service extends EngineObject {
  private _game?: Game;
  scene?: Scene;

  // Services usually don't need to be updated every frame
  protected override _enabled = false;

  get game() {
    if (!this._game) throw new Error("Service is not part of a game yet");
    return this._game;
  }
  set game(game: Game) {
    this._game = game;
  }

  protected getService<T extends Service>(serviceClass: Constructor<T>): T {
    return this.scene?.getService(serviceClass) ?? this.game.getService(serviceClass);
  }
}
