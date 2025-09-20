import { Pool, Service } from "@engine";
import { Vector3 } from "three";
import { Projectile } from "../entities/projectile";

/**
 * Service that manages a pool of projectile objects for improved performance.
 * Reduces garbage collection by reusing projectile instances.
 */
export class ProjectilePoolService extends Service {
  private readonly pool: Pool<Projectile>;

  constructor() {
    super();

    this.pool = new Pool<Projectile>(
      () => new Projectile(new Vector3(), new Vector3(), false, 10),
      (projectile: Projectile) => this.resetProjectile(projectile),
      20, // Initial pool size - should be enough for most combat scenarios
    );
  }

  /**
   * Get a projectile from the pool and configure it for use
   */
  getProjectile(startPosition: Vector3, targetPosition: Vector3, isPlayerProjectile = false, damage = 10): Projectile {
    const projectile = this.pool.get();

    // Configure the projectile for its new use
    projectile.configure(startPosition, targetPosition, isPlayerProjectile, damage);

    return projectile;
  }

  /**
   * Return a projectile to the pool for reuse
   */
  releaseProjectile(projectile: Projectile): void {
    this.pool.release(projectile);
  }

  /**
   * Reset a projectile to its default state for reuse
   */
  private resetProjectile(projectile: Projectile): void {
    projectile.reset();
  }

  /**
   * Get pool statistics for debugging/monitoring
   */
  getPoolStats() {
    return this.pool.getStats();
  }

  override destroy(): void {
    this.pool.clear();
    super.destroy();
  }
}
