import * as THREE from "three";
import type { Game } from "../../core/Game";
import type { Enemy } from "../Enemy";
import { AIState, EnemyAI, EnemyType } from "./EnemyAI";

export class RangeAI extends EnemyAI {
  private readonly optimalDistance = 2.5; // Preferred distance from player
  private readonly attackRange = 4.0; // Max range to attack
  private readonly fireRate = 1.2; // Seconds between shots
  private circleDirection = 1; // 1 or -1 for clockwise/counterclockwise
  private circleAngle = 0;

  constructor(enemy: Enemy, game: Game) {
    super(enemy, EnemyType.RANGE, game);
    this.moveSpeed = 1.2;
    this.circleDirection = Math.random() > 0.5 ? 1 : -1;
    this.circleAngle = Math.random() * Math.PI * 2;
  }

  update(dt: number): void {
    this.updateTimers(dt);

    const distToPlayer = this.getDistanceToPlayer();
    const playerPos = this.getPlayerPosition();

    switch (this.state) {
      case AIState.IDLE:
        if (distToPlayer < this.attackRange) {
          this.switchState(AIState.APPROACH);
        }
        break;

      case AIState.APPROACH:
        if (distToPlayer > this.optimalDistance * 1.2) {
          // Too far, move closer
          this.moveTowards(playerPos, this.moveSpeed, dt);
        } else if (distToPlayer < this.optimalDistance * 0.8) {
          // Too close, retreat
          const retreatDirection = this.enemy.mesh.position.clone().sub(playerPos).normalize();
          const retreatTarget = this.enemy.mesh.position.clone().add(retreatDirection.multiplyScalar(2));
          this.moveTowards(retreatTarget, this.moveSpeed * 1.5, dt);
        } else {
          // At optimal distance, start circling
          this.switchState(AIState.CIRCLE);
        }

        // Try to attack while approaching
        if (this.cooldownTimer <= 0 && distToPlayer <= this.attackRange) {
          this.fireProjectile();
          this.cooldownTimer = this.fireRate;
        }
        break;

      case AIState.CIRCLE: {
        // Circle around the player at optimal distance
        this.circleAngle += this.circleDirection * dt * 0.8; // Circle speed

        const circleCenter = playerPos.clone();
        const circlePos = new THREE.Vector3(
          circleCenter.x + Math.cos(this.circleAngle) * this.optimalDistance,
          this.enemy.mesh.position.y,
          circleCenter.z + Math.sin(this.circleAngle) * this.optimalDistance,
        );

        this.moveTowards(circlePos, this.moveSpeed, dt);

        // Fire at player while circling
        if (this.cooldownTimer <= 0) {
          this.fireProjectile();
          this.cooldownTimer = this.fireRate;
        }

        // Adjust if player moves too far
        if (distToPlayer > this.attackRange) {
          this.switchState(AIState.APPROACH);
        }

        // Occasionally change circle direction for variety
        if (Math.random() < dt * 0.3) {
          this.circleDirection *= -1;
        }
        break;
      }
    }

    // Always maintain separation from other enemies
    this.maintainSeparation(dt);
  }
}
