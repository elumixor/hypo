import { EventEmitter } from "@elumixor/event-emitter";
import { ColliderBehavior, Entity, TransformBehavior } from "@engine";
import { resources } from "resources";
import type { Object3D } from "three";
import { CollisionGroup } from "../../../collision-group";

export class NPC extends Entity {
  readonly interactionAvailable = new EventEmitter();
  readonly interactionUnavailable = new EventEmitter();

  private readonly collider = this.addBehavior(new ColliderBehavior(CollisionGroup.Static, 3)); // Interaction range
  private model!: Object3D;
  isPlayerNearby = false;

  constructor(_npcName = "NPC") {
    super();
    // Note: NPC name is stored but not used for now
  }

  override async init() {
    await super.init();

    // Load the helios model
    const { scene } = resources.get("models/helios");
    this.model = scene.children.first.clone();

    // Enable shadow casting for all meshes in the model
    this.model.traverse((child) => {
      if (child.type === "Mesh") child.castShadow = true;
    });

    // Add model to transform behavior's group
    const transform = this.getBehavior(TransformBehavior);
    transform.group.add(this.model);
    transform.group.position.y = 5;

    // Listen to collision events for player proximity
    this.on(this.collider.collided, ({ other }) => {
      if (other.collisionGroup === CollisionGroup.Player && !this.isPlayerNearby) {
        this.isPlayerNearby = true;
        this.interactionAvailable.emit();
      }
    });
  }

  checkPlayerDistance() {
    // Check if player is still in range
    const hasPlayerCollision = Array.from(this.collider.currentCollisions).some(
      (collision) => collision.collisionGroup === CollisionGroup.Player,
    );

    if (!hasPlayerCollision && this.isPlayerNearby) {
      this.isPlayerNearby = false;
      this.interactionUnavailable.emit();
    }
  }

  override update(dt: number) {
    super.update(dt);
    this.checkPlayerDistance();
  }

  override destroy() {
    super.destroy();
    if (this.model) {
      this.model.removeFromParent();
    }
  }
}
