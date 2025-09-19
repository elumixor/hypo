import { ColliderBehavior, type CollisionEvent, cast, Entity, TransformBehavior, ticker } from "@engine";
import { resources } from "resources";
import type { Object3D } from "three";
import { destroy } from "utils";
import { CameraFollowBehavior } from "../behaviors/camera-follow.behavior";
import { DashBehavior } from "../behaviors/dash.behavior";
import { EnergyBehavior } from "../behaviors/energy.behavior";
import { HealthBehavior } from "../behaviors/health.behavior";
import { PlayerAutoAttackBehavior } from "../behaviors/player-auto-attack.behavior";
import { PlayerMovementBehavior } from "../behaviors/player-movement.behavior";
import { ShieldBehavior } from "../behaviors/shield.behavior";
import { CollisionGroup } from "../collision-group";
import { Projectile } from "./projectile";

export class Player extends Entity {
  // Self behaviors
  private readonly collider = this.addBehavior(new ColliderBehavior(CollisionGroup.Player));
  private readonly health = this.addBehavior(new HealthBehavior(100)); // Player has 100 HP

  private model!: Object3D;

  constructor() {
    super();

    this.addBehavior(new TransformBehavior());
    this.addBehavior(new PlayerMovementBehavior());
    this.addBehavior(new DashBehavior());
    this.addBehavior(new CameraFollowBehavior());
    this.addBehavior(new EnergyBehavior(50, 50, 15)); // Player has 50 energy, regenerates at 5 per second
    this.addBehavior(new PlayerAutoAttackBehavior());
    this.addBehavior(new ShieldBehavior());
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

  private readonly onCollision = ({ other }: CollisionEvent) => {
    if (other.collisionGroup !== CollisionGroup.EnemyProjectile) return;

    const projectile = cast(Projectile, other.entity);
    this.health.health -= projectile.damage;
    projectile.destroy();
  };

  override update(dt: number) {
    super.update(dt);

    // Add subtle hover animation to the model
    this.model.position.y = Math.sin(ticker.lastTime * 0.002) * 0.1;
  }

  override destroy() {
    this.collider.collided.unsubscribe(this.onCollision);
    destroy(this.model);
    super.destroy();
  }
}
