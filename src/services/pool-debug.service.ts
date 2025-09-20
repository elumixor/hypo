import { Service } from "@engine";
import { ProjectilePoolService } from "../scenes/combat/services/projectile-pool.service";

/**
 * Service for debugging pool usage statistics
 */
export class PoolDebugService extends Service {
  private readonly logInterval = 5000; // Log every 5 seconds
  private lastLogTime = 0;

  override update(dt: number): void {
    super.update(dt);

    this.lastLogTime += dt;

    if (this.lastLogTime >= this.logInterval) {
      this.logPoolStats();
      this.lastLogTime = 0;
    }
  }

  private logPoolStats(): void {
    // Find projectile pool service in current scene
    const scene = this.game.currentScene;
    const projectilePool = scene?.services.find((s) => s instanceof ProjectilePoolService) as ProjectilePoolService;

    if (projectilePool) {
      const stats = projectilePool.getPoolStats();
      this.log(`Projectile Pool Stats: Available: ${stats.available}, Active: ${stats.active}, Total: ${stats.total}`);
    }
  }
}
