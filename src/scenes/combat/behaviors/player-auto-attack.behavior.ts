import { Behavior, TransformBehavior } from "@engine";
import { Enemy } from "../entities/enemy";
import { ProjectilePoolService } from "../services/projectile-pool.service";

export class PlayerAutoAttackBehavior extends Behavior {
  private readonly attackCooldown = 0.3;
  private lastAttackTime = 0;
  private readonly projectilePool = this.require(ProjectilePoolService);

  override update(dt: number) {
    super.update(dt);

    this.lastAttackTime += dt / 1000;

    // Check if we can attack
    if (this.lastAttackTime <= this.attackCooldown) return;

    const closestEnemy = this.findClosestEnemy();
    if (closestEnemy) {
      this.attack(closestEnemy);
      this.lastAttackTime = 0;
    }
  }

  private findClosestEnemy() {
    let closestEnemy: Enemy | undefined;
    let closestDistance = Infinity;

    // Iterate over all enemies in the scene
    for (const enemy of this.entity.scene.getEntities(Enemy)) {
      const enemyTransform = enemy.getBehavior(TransformBehavior);
      const distance = this.transform.group.position.distanceTo(enemyTransform.group.position);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestEnemy = enemy;
      }
    }

    return closestEnemy;
  }

  private attack(target: Enemy) {
    const targetTransform = target.getBehavior(TransformBehavior);

    // Create projectile from player position to enemy position
    const projectile = this.projectilePool.getProjectile(
      this.transform.position.clone(),
      targetTransform.position.clone(),
      true, // This is a player projectile
    );

    this.entity.scene.addEntity(projectile);
  }
}
