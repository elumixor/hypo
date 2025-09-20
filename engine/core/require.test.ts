import { describe, expect, it } from "bun:test";
import { Behavior } from "./behavior";
import { Entity } from "./entity";
import { Scene } from "./scene";

describe("EngineObject.require()", () => {
  it("should have the reference", async () => {
    class B extends Behavior {}
    class E extends Entity {
      readonly b = this.addBehavior(new B());
      readonly b2 = this.require(B);
    }

    const scene = new Scene();
    const e = new E();

    scene.addEntity(e);

    await e.init();

    expect(e.b).toBeInstanceOf(B);
    expect(e.b2).toBeInstanceOf(B);
    expect(e.b).toBe(e.b2);
  });
});
