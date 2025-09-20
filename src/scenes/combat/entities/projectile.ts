import { ColliderBehavior, Entity } from "@engine";
import { CollisionGroup } from "collision-group";
import { Mesh, MeshLambertMaterial, SphereGeometry, Vector3 } from "three";

export class Projectile extends Entity {
  private static readonly geometry = new SphereGeometry(0.5, 8, 8);
  private static readonly material = new MeshLambertMaterial({ emissive: 0xff5500 });

  private readonly mesh = new Mesh(Projectile.geometry, Projectile.material);
  private readonly direction = new Vector3();
  private readonly targetPosition = new Vector3();
  private readonly speed = 3;
  private readonly maxLifetime = 5000; // 5 seconds
  private readonly collider;
  private lifetime = 0;

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

    this.position.copy(this.startPosition);

    // Add to transform group
    this.addChild(this.mesh);

    // Calculate direction towards target
    this.direction.copy(this.targetPosition).sub(this.transform.group.position).normalize();

    // Listen for collisions
    this.on(this.collider.collided, ({ other }) => {
      // If hit static object (rocks), just destroy the projectile
      if (other.collisionGroup === CollisionGroup.Static) this.destroy();
    });
  }

  override update(dt: number) {
    super.update(dt);

    this.lifetime += dt;

    // Move towards target
    const moveAmount = this.speed * dt * 0.01;
    this.position.add(this.direction.clone().multiplyScalar(moveAmount));

    // Destroy after max lifetime
    if (this.lifetime >= this.maxLifetime) this.destroy();
  }
}
