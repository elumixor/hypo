import { ColliderBehavior, type CollisionEvent, Entity, TransformBehavior, ticker } from "@engine";
import { resources } from "resources";
import type { Object3D } from "three";
import { CollisionGroup } from "../../../collision-group";
import { CameraFollowBehavior } from "../behaviors/camera-follow.behavior";
import { DashBehavior } from "../behaviors/dash.behavior";
import { EnergyBehavior } from "../behaviors/energy.behavior";
import { HealthBehavior } from "../behaviors/health.behavior";
import { PlayerAutoAttackBehavior } from "../behaviors/player-auto-attack.behavior";
import { PlayerMovementBehavior } from "../behaviors/player-movement.behavior";
import { ShieldBehavior } from "../behaviors/shield.behavior";
import { Projectile } from "./projectile";

export class Player extends Entity {
  // Self behaviors
  private readonly collider = this.addBehavior(new ColliderBehavior(CollisionGroup.Player));
  private readonly health = this.addBehavior(new HealthBehavior(150)); // Player has 150 HP
  private readonly cameraFollow = this.addBehavior(new CameraFollowBehavior());

  private model!: Object3D;

  constructor() {
    super();

    this.addBehavior(new PlayerMovementBehavior());
    this.addBehavior(new DashBehavior());
    this.addBehavior(new EnergyBehavior(50, 50, 15)); // Player has 50 energy, regenerates at 5 per second
    this.addBehavior(new PlayerAutoAttackBehavior());
    this.addBehavior(new ShieldBehavior());
  }

  override async init() {
    await super.init();

    this.cameraFollow.targetTransform = this.transform;

    // Listen to collision events
    this.on(this.collider.collided, this.onCollision.bind(this));

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

  private onCollision({ other }: CollisionEvent) {
    if (other.collisionGroup !== CollisionGroup.EnemyProjectile) return;

    const projectile = other.entity.as(Projectile);
    this.health.health -= projectile.damage;
    projectile.returnToPool();
  }

  override update(dt: number) {
    super.update(dt);

    // Add subtle hover animation to the model
    this.model.position.y = Math.sin(ticker.lastTime * 0.002) * 0.1;
  }
}
