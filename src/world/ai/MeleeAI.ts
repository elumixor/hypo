import * as THREE from "three";
import type { Game } from "../../core/Game";
import type { Enemy } from "../Enemy";
import { AIState, EnemyAI, EnemyType } from "./EnemyAI";

export class MeleeAI extends EnemyAI {
  private readonly attackRange = 1.2; // Close combat range
  private readonly dashDistance = 3.0;
  private readonly dashSpeed = 6.0;
  private readonly attackCooldown = 2.0; // Time between attack sequences
  private attackCombo = 0; // Current attack in combo (0-2)
  private readonly maxCombo = 3; // Number of attacks in sequence
  private readonly dashStartPos = new THREE.Vector3();

  constructor(enemy: Enemy, game: Game) {
    super(enemy, EnemyType.MELEE, game);
    this.moveSpeed = 2.0; // Faster than range enemies
  }

  update(dt: number): void {
    this.updateTimers(dt);

    const distToPlayer = this.getDistanceToPlayer();
    const playerPos = this.getPlayerPosition();

    switch (this.state) {
      case AIState.IDLE:
        if (distToPlayer < 5.0 && this.cooldownTimer <= 0) {
          this.switchState(AIState.APPROACH);
        }
        break;

      case AIState.APPROACH:
        if (distToPlayer <= this.attackRange) {
          // Close enough to start dash attack
          this.switchState(AIState.DASH, 0.3); // 0.3 second dash preparation
          this.dashStartPos.copy(this.enemy.mesh.position);
          this.attackCombo = 0;
        } else if (distToPlayer > 6.0) {
          // Player too far, return to idle
          this.switchState(AIState.IDLE);
        } else {
          // Move towards player
          this.moveTowards(playerPos, this.moveSpeed, dt);
        }
        break;

      case AIState.DASH:
        if (this.stateTimer > 0) {
          // Preparation phase - slight pause before dash
          // Make enemy slightly glow or change color to indicate incoming attack
          const material = this.enemy.mesh.material as THREE.MeshStandardMaterial;
          material.emissive.setHex(0x440000); // Red glow
        } else {
          // Execute dash towards player
          const dashTarget = playerPos.clone();
          const dashDirection = dashTarget.clone().sub(this.dashStartPos).normalize();

          // Dash past the player slightly
          const extendedTarget = dashTarget.add(dashDirection.multiplyScalar(0.5));
          this.moveTowards(extendedTarget, this.dashSpeed, dt);

          // Check if we hit the player (damage will be handled by projectile system later)
          if (distToPlayer <= this.attackRange) {
            this.switchState(AIState.ATTACK, 0.2); // Brief attack animation
            // Deal damage to player
            this.game.damagePlayer(1);
          }

          // If dash is complete, check for combo
          if (this.enemy.mesh.position.distanceTo(this.dashStartPos) >= this.dashDistance) {
            this.attackCombo++;
            if (this.attackCombo < this.maxCombo && distToPlayer <= this.attackRange * 2) {
              // Continue combo
              this.switchState(AIState.DASH, 0.2); // Shorter prep for combo
              this.dashStartPos.copy(this.enemy.mesh.position);
            } else {
              // Combo finished, cooldown
              this.switchState(AIState.COOLDOWN, this.attackCooldown);
              this.cooldownTimer = this.attackCooldown;
            }
          }
        }
        break;

      case AIState.ATTACK: {
        // Brief attack animation state
        if (this.stateTimer <= 0) {
          // Continue combo or go to cooldown
          if (this.attackCombo < this.maxCombo && distToPlayer <= this.attackRange * 2) {
            this.switchState(AIState.DASH, 0.2);
            this.dashStartPos.copy(this.enemy.mesh.position);
          } else {
            this.switchState(AIState.COOLDOWN, this.attackCooldown);
            this.cooldownTimer = this.attackCooldown;
          }
        }
        // Reset emissive color
        const material = this.enemy.mesh.material as THREE.MeshStandardMaterial;
        material.emissive.setHex(0x000000);
        break;
      }

      case AIState.COOLDOWN:
        // Move away from player slightly
        if (distToPlayer < this.attackRange * 1.5) {
          const retreatDirection = this.enemy.mesh.position.clone().sub(playerPos).normalize();
          const retreatTarget = this.enemy.mesh.position.clone().add(retreatDirection.multiplyScalar(1));
          this.moveTowards(retreatTarget, this.moveSpeed * 0.5, dt);
        }

        if (this.stateTimer <= 0) {
          this.switchState(AIState.IDLE);
        }
        break;
    }

    // Always maintain separation from other enemies
    this.maintainSeparation(dt);
  }
}
