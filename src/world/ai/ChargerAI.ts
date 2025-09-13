import * as THREE from "three";
import type { Game } from "../../core/Game";
import type { Enemy } from "../Enemy";
import { AIState, EnemyAI, EnemyType } from "./EnemyAI";

export class ChargerAI extends EnemyAI {
  private readonly chargeRange = 8.0; // Max distance to start charge
  private readonly chargeSpeed = 8.0; // Very fast charge speed
  private readonly chargeCooldown = 4.0; // Time between charges
  private readonly preparationTime = 1.2; // Time to telegraph charge
  private readonly chargeDistance = 10.0; // How far to charge past target
  private readonly chargeDirection = new THREE.Vector3();
  private readonly chargeStartPos = new THREE.Vector3();
  private chargedDistance = 0;
  private readonly originalPosition = new THREE.Vector3();

  constructor(enemy: Enemy, game: Game) {
    super(enemy, EnemyType.CHARGER, game);
    this.moveSpeed = 0.5; // Very slow when not charging
    this.originalPosition.copy(enemy.mesh.position);
  }

  update(dt: number): void {
    this.updateTimers(dt);

    const distToPlayer = this.getDistanceToPlayer();

    switch (this.state) {
      case AIState.IDLE:
        // Stay mostly in place, only small movements
        if (this.enemy.mesh.position.distanceTo(this.originalPosition) > 1.0) {
          // Return to original position slowly
          this.moveTowards(this.originalPosition, this.moveSpeed * 0.3, dt);
        }

        if (distToPlayer <= this.chargeRange && this.cooldownTimer <= 0) {
          this.switchState(AIState.CHARGE_PREPARE, this.preparationTime);
          this.chargeStartPos.copy(this.enemy.mesh.position);

          // Calculate charge direction (lead the target slightly)
          const predictedPlayerPos = this.predictPlayerPosition();
          this.chargeDirection.copy(predictedPlayerPos).sub(this.chargeStartPos).normalize();
          this.chargedDistance = 0;
        }
        break;

      case AIState.CHARGE_PREPARE: {
        // Telegraph the charge - make enemy glow and face player
        const material = this.enemy.mesh.material as THREE.MeshStandardMaterial;
        const intensity = Math.sin((this.preparationTime - this.stateTimer) * 10) * 0.5 + 0.5;
        material.emissive.setRGB(intensity * 0.8, intensity * 0.2, 0);

        // Slightly adjust aim towards current player position
        if (this.stateTimer > 0.2) {
          // Only adjust early in preparation
          const currentPlayerPos = this.predictPlayerPosition();
          this.chargeDirection.copy(currentPlayerPos).sub(this.chargeStartPos).normalize();
        }

        if (this.stateTimer <= 0) {
          this.switchState(AIState.CHARGE_EXECUTE);
          material.emissive.setHex(0x000000); // Turn off glow
        }
        break;
      }

      case AIState.CHARGE_EXECUTE: {
        // Execute the charge at high speed
        const chargeMovement = this.chargeDirection.clone().multiplyScalar(this.chargeSpeed * dt);
        this.enemy.mesh.position.add(chargeMovement);
        this.chargedDistance += chargeMovement.length();

        // Check if we hit the player
        if (distToPlayer <= 0.8) {
          // Hit player - deal damage and continue charge slightly
          this.game.damagePlayer(2); // Charger deals more damage
          console.log("Charger hit player!");
        }

        // Check if we hit other enemies
        for (const otherEnemy of this.game.spawner.enemies) {
          if (otherEnemy === this.enemy || otherEnemy.dead) continue;

          const distToOther = this.enemy.mesh.position.distanceTo(otherEnemy.mesh.position);
          if (distToOther <= 0.8) {
            this.game.damageEnemy(otherEnemy, 2);
            console.log("Charger hit other enemy!");
          }
        }

        // Stop charging when we've gone far enough
        if (this.chargedDistance >= this.chargeDistance) {
          this.switchState(AIState.COOLDOWN, this.chargeCooldown);
          this.cooldownTimer = this.chargeCooldown;

          // Update original position to current position (don't always return to start)
          if (Math.random() < 0.3) {
            this.originalPosition.copy(this.enemy.mesh.position);
          }
        }
        break;
      }

      case AIState.COOLDOWN:
        // Slowly return to original position or stay put
        if (this.enemy.mesh.position.distanceTo(this.originalPosition) > 2.0) {
          this.moveTowards(this.originalPosition, this.moveSpeed * 0.7, dt);
        }

        if (this.stateTimer <= 0) {
          this.switchState(AIState.IDLE);
        }
        break;
    }

    // Don't maintain separation during charge execution
    if (this.state !== AIState.CHARGE_EXECUTE) {
      this.maintainSeparation(dt);
    }
  }

  private predictPlayerPosition(): THREE.Vector3 {
    // Simple prediction based on player movement
    const playerPos = this.getPlayerPosition();

    // Get player velocity by looking at recent positions (simplified)
    // For now, just return current position
    // TODO: Implement proper velocity prediction
    return playerPos.clone();
  }
}
