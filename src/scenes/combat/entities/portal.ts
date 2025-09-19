import { EventEmitter } from "@elumixor/event-emitter";
import { ColliderBehavior, Entity, TransformBehavior } from "@engine";
import { resources } from "resources";
import type { Object3D } from "three";
import { destroy } from "utils";
import { CollisionGroup } from "../collision-group";

export class Portal extends Entity {
  readonly reached = new EventEmitter();

  private readonly collider = this.addBehavior(new ColliderBehavior(CollisionGroup.PickUps, 2)); // Slightly larger collision radius
  private readonly transform = this.addBehavior(new TransformBehavior());

  private model!: Object3D;

  override async init() {
    await super.init();

    // Load the portal model
    const { scene } = resources.get("models/portal");
    this.model = scene.children.first.clone();

    // Add model to transform behavior's group
    this.transform.group.add(this.model);

    // Position portal at a distance from origin
    this.transform.group.position.set(8, 5, 8);

    // Listen to collision events
    this.collider.collided.subscribe(this.onCollision);
  }

  private readonly onCollision = () => {
    this.reached.emit();
  };

  override update(dt: number) {
    super.update(dt);

    // Rotate the portal slowly
    this.model.rotation.y += dt * 0.001;
  }

  override destroy() {
    this.collider.collided.unsubscribe(this.onCollision);
    destroy(this.model);
    super.destroy();
  }
}
