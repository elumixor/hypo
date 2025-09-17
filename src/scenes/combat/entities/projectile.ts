import { ColliderBehavior, Entity, TransformBehavior } from "@engine";
import { HealthBehavior } from "behaviors/health.behavior";
import { Mesh, MeshLambertMaterial, SphereGeometry, Vector3 } from "three";
import { destroy } from "utils";
import { CollisionGroup } from "../collision-group";
import { Enemy } from "./enemy";
import { Player } from "./player";

export class Projectile extends Entity {
  private readonly speed = 3;
  private mesh!: Mesh;
  private readonly direction = new Vector3();
  private readonly targetPosition = new Vector3();
  private lifetime = 0;
  private readonly maxLifetime = 5000; // 5 seconds
  private readonly transform: TransformBehavior;
  private readonly collider: ColliderBehavior;

  constructor(
    private readonly startPosition: Vector3,
    targetPosition: Vector3,
    private readonly isPlayerProjectile = false,
    private readonly damage = 10,
  ) {
    super();

    this.transform = this.addBehavior(new TransformBehavior());
    this.collider = this.addBehavior(
      new ColliderBehavior(isPlayerProjectile ? CollisionGroup.PlayerProjectile : CollisionGroup.EnemyProjectile),
    );

    this.targetPosition.copy(targetPosition);
  }

  override async init() {
    await super.init();

    this.transform.group.position.copy(this.startPosition);

    // Listen to collision events
    this.collider.collided.subscribe(this.onCollision);

    // Create red sphere geometry
    const geometry = new SphereGeometry(1, 8, 8);
    const material = new MeshLambertMaterial({ color: 0xff0000 }); // Red color

    this.mesh = new Mesh(geometry, material);

    // Add to transform group
    this.transform.group.add(this.mesh);

    // Calculate direction towards target
    this.direction.copy(this.targetPosition).sub(this.transform.group.position).normalize();
  }

  override update(dt: number) {
    super.update(dt);

    this.lifetime += dt;

    // Move towards target
    const moveAmount = this.speed * dt * 0.01;
    this.transform.group.position.add(this.direction.clone().multiplyScalar(moveAmount));

    // Destroy after max lifetime
    if (this.lifetime >= this.maxLifetime) this.scene.removeEntity(this);
  }

  private readonly onCollision = (event: { other: ColliderBehavior; self: ColliderBehavior }) => {
    const { other } = event;
    const targetEntity = other.entity;

    // Skip collision with player if this is a player projectile
    if (this.isPlayerProjectile && !(targetEntity instanceof Enemy)) return;

    // Skip collision with enemies if this is an enemy projectile
    if (!this.isPlayerProjectile && !(targetEntity instanceof Player)) return;

    // Try to get health component and apply damage
    const healthComponent = targetEntity.getBehavior(HealthBehavior);
    healthComponent.takeDamage(this.damage);

    // Destroy the projectile
    this.scene.removeEntity(this);
  };

  override destroy() {
    // Unsubscribe from collision events
    this.collider.collided.unsubscribe(this.onCollision);

    destroy(this.mesh);

    super.destroy();
  }
}
