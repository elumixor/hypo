import { ColliderBehavior, Entity, TransformBehavior, ticker } from "@engine";
import type { CollisionEvent } from "@engine/systems/collision/collider.behavior";
import { HealthBehavior } from "behaviors/health.behavior";
import { resources } from "resources";
import type { Object3D } from "three";
import { destroy } from "utils";
import { BlockBehavior } from "../behaviors/block.behavior";
import { CameraFollowBehavior } from "../behaviors/camera-follow.behavior";
import { PlayerAutoAttackBehavior } from "../behaviors/player-auto-attack.behavior";
import { PlayerMovementBehavior } from "../behaviors/player-movement.behavior";
import { CollisionGroup } from "../collision-group";

export class Player extends Entity {
  private model!: Object3D;
  private collider!: ColliderBehavior;

  constructor() {
    super();

    this.addBehavior(new TransformBehavior());
    this.addBehavior(new PlayerMovementBehavior());
    this.addBehavior(new CameraFollowBehavior());
    this.addBehavior(new HealthBehavior(100)); // Player has 100 HP
    this.collider = this.addBehavior(new ColliderBehavior(CollisionGroup.Player));
    this.addBehavior(new PlayerAutoAttackBehavior());
    this.addBehavior(new BlockBehavior());
  }

  override async init() {
    await super.init();

    this.getBehavior(CameraFollowBehavior).targetTransform = this.getBehavior(TransformBehavior);

    // Listen to collision events
    this.collider.collided.subscribe(this.onCollision);

    // Load the drone model
    const { scene } = resources.get("models/drone");
    this.model = scene.children.first.clone();

    // Enable shadow casting for all meshes in the model
    this.model.traverse((child) => {
      if (child.type === "Mesh") child.castShadow = true;
    });

    // Add model to transform behavior's group
    const transform = this.getBehavior(TransformBehavior);
    transform.group.add(this.model);
    transform.group.position.y = 5;
  }

  private readonly onCollision = (event: { other: ColliderBehavior; self: ColliderBehavior }) => {
    const { other } = event;
    const otherEntity = other.entity;

    // Only handle collisions with enemy projectiles
    if (other.collisionGroup !== CollisionGroup.EnemyProjectile) return;

    // Try to block with shield first
    let damage = 10; // Default projectile damage
    
    try {
      const blockBehavior = this.getBehavior(BlockBehavior);
      if (blockBehavior.blockingActive) {
        damage = blockBehavior.absorbDamage(damage);
      }
    } catch {
      // BlockBehavior might be disabled, continue with full damage
    }

    // Apply remaining damage to health
    if (damage > 0) {
      const healthBehavior = this.getBehavior(HealthBehavior);
      healthBehavior.takeDamage(damage);
    }

    // Remove the projectile
    this.scene.removeEntity(otherEntity);
  };

  override update(dt: number) {
    super.update(dt);

    // Add subtle hover animation to the model
    this.model.position.y = Math.sin(ticker.lastTime * 0.002) * 0.1;
  }

  override destroy() {
    // Unsubscribe from collision events
    this.collider.collided.unsubscribe(this.onCollision);

    destroy(this.model);

    super.destroy();
  }
}
