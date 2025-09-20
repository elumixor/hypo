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
  private collider: ColliderBehavior;
  private lifetime = 0;
  private readonly startPosition = new Vector3();

  // biome-ignore lint/style/useConsistentMemberAccessibility: We declare a field that is public and not readonly
  public damage = 10;

  constructor(startPosition: Vector3, targetPosition: Vector3, isPlayerProjectile = false, damage = 10) {
    super();

    this.collider = this.addBehavior(
      new ColliderBehavior(isPlayerProjectile ? CollisionGroup.PlayerProjectile : CollisionGroup.EnemyProjectile),
    );

    this.configure(startPosition, targetPosition, isPlayerProjectile, damage);
  }

  /**
   * Configure this projectile for use (called when getting from pool or creating new)
   */
  configure(startPosition: Vector3, targetPosition: Vector3, isPlayerProjectile: boolean, damage: number): void {
    this.startPosition.copy(startPosition);
    this.targetPosition.copy(targetPosition);
    this.damage = damage;
    this.lifetime = 0;

    // Remove existing collider and add new one with correct group
    if (this.collider) {
      this.removeBehavior(this.collider);
    }

    this.collider = this.addBehavior(
      new ColliderBehavior(isPlayerProjectile ? CollisionGroup.PlayerProjectile : CollisionGroup.EnemyProjectile),
    );
  }

  /**
   * Reset this projectile to initial state (called when returning to pool)
   */
  reset(): void {
    this.lifetime = 0;
    this.damage = 10;
    this.startPosition.set(0, 0, 0);
    this.targetPosition.set(0, 0, 0);
    this.direction.set(0, 0, 0);
    this.position.set(0, 0, 0);

    // Remove from scene if it's still there
    if (this.scene?.entities.includes(this)) {
      this.scene.removeEntity(this);
    }
  }

  /**
   * Return this projectile to the pool instead of destroying it
   */
  returnToPool(): void {
    // Use dynamic search to get the service
    const services = this.scene?.services;
    const poolService = services?.find((s) => s.constructor.name === "ProjectilePoolService") as unknown;

    if (poolService && typeof poolService === "object" && "releaseProjectile" in poolService) {
      (poolService as { releaseProjectile: (projectile: Projectile) => void }).releaseProjectile(this);
    } else {
      // Fallback to normal destroy if no pool service
      this.destroy();
    }
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
      // If hit static object (rocks), return to pool
      if (other.collisionGroup === CollisionGroup.Static) this.returnToPool();
    });
  }

  override update(dt: number) {
    super.update(dt);

    this.lifetime += dt;

    // Move towards target
    const moveAmount = this.speed * dt * 0.01;
    this.position.add(this.direction.clone().multiplyScalar(moveAmount));

    // Return to pool after max lifetime
    if (this.lifetime >= this.maxLifetime) this.returnToPool();
  }
}
