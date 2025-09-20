/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: We use template methods */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: We use template methods */

import type { Constructor } from "@elumixor/frontils";
import { Container } from "pixi.js";
import { EngineObject } from "./engine-object";
import type { Scene } from "./scene";
import type { Service } from "./service";

export abstract class Widget extends EngineObject {
  private _scene?: Scene;
  readonly container = new Container();
  readonly position = this.container.position;
  readonly scale = this.container.scale;
  readonly rotation = this.container.rotation;

  // Widgets usually don't need to be updated every frame
  protected override _enabled = false;

  get x() {
    return this.position.x;
  }
  set x(value: number) {
    this.position.x = value;
  }
  get y() {
    return this.position.y;
  }
  set y(value: number) {
    this.position.y = value;
  }

  get visible() {
    return this.container.visible;
  }
  set visible(value: boolean) {
    this.container.visible = value;
  }

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

  override async init() {
    await super.init();
    this.scene.uiRoot.addChild(this.container);
  }

  override destroy() {
    this._scene?.removeWidget(this);
    this.container.destroy({ children: true });
    super.destroy();
  }

  protected getService<T extends Service>(serviceClass: Constructor<T>) {
    return this.scene.getService(serviceClass);
  }

  protected addChild<T extends Container[]>(...child: T): T[0] {
    return this.container.addChild(...child);
  }
}
