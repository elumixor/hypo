import { EventEmitter } from "@elumixor/event-emitter";
import { ColliderBehavior, Entity } from "@engine";
import { CollisionGroup } from "collision-group";
import { resources } from "resources";
import type { Object3D } from "three";

export class Portal extends Entity {
  readonly reached = new EventEmitter();

  private readonly collider = this.addBehavior(new ColliderBehavior(CollisionGroup.PickUps, 2)); // Slightly larger collision radius

  private model!: Object3D;

  override async init() {
    await super.init();

    // Load the portal model
    const { scene } = resources.get("models/portal");
    this.model = scene.children.first.clone();

    // Add model to transform behavior's group
    this.addChild(this.model);

    // Position portal at a distance from origin
    this.position.set(8, 5, 8);

    // Listen to collision events
    this.on(this.collider.collided, () => this.reached.emit());
  }

  override update(dt: number) {
    super.update(dt);

    // Rotate the portal slowly
    this.model.rotation.y += dt * 0.001;
  }
}
