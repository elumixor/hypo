import { Behavior } from "@engine";
import { TransformBehavior } from "behaviors/transform.behavior";
import { Enemy } from "../entities/enemy";
import { Projectile } from "../entities/projectile";

export class PlayerAutoAttackBehavior extends Behavior {
  private transform!: TransformBehavior;
  private lastAttackTime = 0;
  private readonly attackCooldown = 300; // 1 second between attacks

  override async init() {
    await super.init();

    this.transform = this.entity.getBehavior(TransformBehavior);
  }

  override update(dt: number) {
    super.update(dt);

    this.lastAttackTime += dt;

    // Check if we can attack
    if (this.lastAttackTime >= this.attackCooldown) {
      const closestEnemy = this.findClosestEnemy();

      if (closestEnemy) {
        this.attack(closestEnemy);
        this.lastAttackTime = 0;
      }
    }
  }

  private findClosestEnemy(): Enemy | null {
    let closestEnemy: Enemy | null = null;
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
    const projectile = new Projectile(
      this.transform.group.position.clone(),
      targetTransform.group.position.clone(),
      true, // This is a player projectile
    );

    this.entity.scene.addEntity(projectile);
  }
}
