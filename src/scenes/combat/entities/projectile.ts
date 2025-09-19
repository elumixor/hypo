import { ColliderBehavior, type CollisionEvent, Entity, TransformBehavior } from "@engine";
import { Mesh, MeshLambertMaterial, PointLight, SphereGeometry, Vector3 } from "three";
import { destroy } from "utils";
import { CollisionGroup } from "../collision-group";

export class Projectile extends Entity {
  private readonly speed = 3;

  // Create red sphere geometry with emissive material
  private readonly mesh = new Mesh(
    new SphereGeometry(0.5, 8, 8),
    new MeshLambertMaterial({
      color: 0xff4444,
      emissive: 0xff0000, // Stronger red glow
    }),
  );
  private readonly light = new PointLight(0xff4444, 15.0, 50);
  private readonly direction = new Vector3();
  private readonly targetPosition = new Vector3();
  private lifetime = 0;
  private readonly maxLifetime = 5000; // 5 seconds
  private readonly transform = this.addBehavior(new TransformBehavior());
  private readonly collider: ColliderBehavior;

  constructor(
    private readonly startPosition: Vector3,
    targetPosition: Vector3,
    isPlayerProjectile = false,
    // biome-ignore lint/style/useConsistentMemberAccessibility: We declare a field that is public and not readonly
    public damage = 10,
  ) {
    super();

    this.collider = this.addBehavior(
      new ColliderBehavior(isPlayerProjectile ? CollisionGroup.PlayerProjectile : CollisionGroup.EnemyProjectile),
    );

    this.targetPosition.copy(targetPosition);
  }

  override async init() {
    await super.init();

    this.transform.group.position.copy(this.startPosition);

    // Add to transform group
    this.transform.group.add(this.mesh, this.light);

    // Calculate direction towards target
    this.direction.copy(this.targetPosition).sub(this.transform.group.position).normalize();

    // Listen for collisions
    this.collider.collided.subscribe(this.onCollision);
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

  private readonly onCollision = (event: CollisionEvent) => {
    // If hit static object (rocks), just destroy the projectile
    if (event.other.collisionGroup === CollisionGroup.Static) this.destroy();

    // Other collision handling is done by the target entities (Player/Enemy)
  };

  override destroy() {
    this.collider.collided.unsubscribe(this.onCollision);

    destroy(this.mesh);
    destroy(this.light);

    super.destroy();
  }
}
