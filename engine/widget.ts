/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: We use template methods */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: We use template methods */

import type { Constructor } from "@elumixor/frontils";
import { Container } from "pixi.js";
import type { Scene } from "./scene";
import type { Service } from "./service";

export abstract class Widget {
  private _scene?: Scene;
  readonly container = new Container();

  get scene() {
    if (!this._scene) throw new Error("Widget is not part of a scene yet");
    return this._scene;
  }
  set scene(scene: Scene) {
    this._scene = scene;
  }

  get game() {
    return this.scene.game;
  }

  get uiContainer() {
    return this.scene.uiRoot;
  }

  async init() {
    this.uiContainer.addChild(this.container);
  }

  update(_dt: number) {}

  destroy() {
    this.container.destroy({ children: true });
  }

  protected getService<T extends Service>(serviceClass: Constructor<T>) {
    return this.scene.getService(serviceClass);
  }

  protected addChild(...child: Container[]) {
    this.container.addChild(...child);
  }
}
