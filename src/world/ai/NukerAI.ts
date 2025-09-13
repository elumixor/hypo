import * as THREE from "three";
import { ProjectileType } from "../../combat/Projectiles";
import type { Game } from "../../core/Game";
import type { Enemy } from "../Enemy";
import { AIState, EnemyAI, EnemyType } from "./EnemyAI";

export class NukerAI extends EnemyAI {
  private readonly aoeRange = 6.0; // Max range for AOE attack
  private readonly trampleRange = 2.0; // Range at which to switch to trample
  private readonly aoeAttackCooldown = 3.5; // Time between AOE attacks
  private readonly trampleCooldown = 2.5; // Time between trample attacks
  private readonly optimalDistance = 4.0; // Preferred distance for AOE attacks
  private readonly indicatorDuration = 1.5; // Time to show ground indicator
  private aoeIndicator: THREE.Mesh | null = null;
  private readonly targetGroundPos = new THREE.Vector3();

  constructor(enemy: Enemy, game: Game) {
    super(enemy, EnemyType.NUKER, game);
    this.moveSpeed = 0.8; // Slower than other enemies
  }

  update(dt: number): void {
    this.updateTimers(dt);

    const distToPlayer = this.getDistanceToPlayer();
    const playerPos = this.getPlayerPosition();

    switch (this.state) {
      case AIState.IDLE:
        if (distToPlayer < this.aoeRange && this.cooldownTimer <= 0) {
          if (distToPlayer <= this.trampleRange) {
            this.switchState(AIState.TRAMPLE, this.indicatorDuration);
            this.createTrampleIndicator();
          } else {
            this.switchState(AIState.APPROACH);
          }
        }
        break;

      case AIState.APPROACH:
        if (distToPlayer <= this.trampleRange) {
          // Too close, switch to trample attack
          this.switchState(AIState.TRAMPLE, this.indicatorDuration);
          this.createTrampleIndicator();
        } else if (distToPlayer > this.aoeRange) {
          // Too far, move closer
          this.moveTowards(playerPos, this.moveSpeed, dt);
        } else if (distToPlayer <= this.optimalDistance && distToPlayer > this.trampleRange) {
          // Good distance for AOE attack
          this.switchState(AIState.ATTACK, this.indicatorDuration);
          this.targetGroundPos.copy(playerPos); // Predict where player will be
          this.createAOEIndicator(this.targetGroundPos);
        } else {
          // Adjust position
          this.moveTowards(playerPos, this.moveSpeed, dt);
        }
        break;

      case AIState.ATTACK:
        // AOE ballistic attack
        if (this.stateTimer <= 0) {
          // Fire the AOE projectile
          this.fireAOEProjectile(this.targetGroundPos);
          this.removeAOEIndicator();
          this.switchState(AIState.COOLDOWN, this.aoeAttackCooldown);
          this.cooldownTimer = this.aoeAttackCooldown;
        }
        break;

      case AIState.TRAMPLE:
        // Trample ground attack
        if (this.stateTimer <= 0) {
          // Execute trample damage
          this.executeTrampleAttack();
          this.removeTrampleIndicator();
          this.switchState(AIState.COOLDOWN, this.trampleCooldown);
          this.cooldownTimer = this.trampleCooldown;
        }
        break;

      case AIState.COOLDOWN:
        // Retreat slightly and wait
        if (distToPlayer < this.optimalDistance * 0.7) {
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

  private createAOEIndicator(targetPos: THREE.Vector3) {
    if (this.aoeIndicator) this.removeAOEIndicator();

    const geometry = new THREE.RingGeometry(0.1, 1.5, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff4444,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });

    this.aoeIndicator = new THREE.Mesh(geometry, material);
    this.aoeIndicator.position.set(targetPos.x, 0.01, targetPos.z);
    this.aoeIndicator.rotation.x = -Math.PI / 2;
    this.game.scene.add(this.aoeIndicator);
  }

  private removeAOEIndicator() {
    if (this.aoeIndicator) {
      this.game.scene.remove(this.aoeIndicator);
      this.aoeIndicator.geometry.dispose();
      (this.aoeIndicator.material as THREE.Material).dispose();
      this.aoeIndicator = null;
    }
  }

  private createTrampleIndicator() {
    if (this.aoeIndicator) this.removeAOEIndicator();

    const geometry = new THREE.RingGeometry(0.1, this.trampleRange, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff8844,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });

    this.aoeIndicator = new THREE.Mesh(geometry, material);
    this.aoeIndicator.position.copy(this.enemy.mesh.position);
    this.aoeIndicator.position.y = 0.01;
    this.aoeIndicator.rotation.x = -Math.PI / 2;
    this.game.scene.add(this.aoeIndicator);
  }

  private removeTrampleIndicator() {
    this.removeAOEIndicator(); // Same cleanup
  }

  private fireAOEProjectile(targetPos: THREE.Vector3) {
    // Fire AOE projectile that can damage other enemies
    const direction = targetPos.clone().sub(this.enemy.mesh.position).normalize();
    this.game.projectiles.add(
      this.enemy.mesh.position.clone().add(new THREE.Vector3(0, 0.4, 0)),
      direction,
      false,
      this.game.scene,
      ProjectileType.AOE,
      2, // Higher damage
      true, // Can hit other enemies
    );
  }

  private executeTrampleAttack() {
    // Damage everything in range (including other enemies)
    const tramplePos = this.enemy.mesh.position;

    // Check damage to player
    if (tramplePos.distanceTo(this.getPlayerPosition()) <= this.trampleRange) {
      this.game.damagePlayer(2); // Heavy trample damage
      console.log("Nuker trample hit player!");
    }

    // Check damage to other enemies
    for (const otherEnemy of this.game.spawner.enemies) {
      if (otherEnemy === this.enemy || otherEnemy.dead) continue;

      if (tramplePos.distanceTo(otherEnemy.mesh.position) <= this.trampleRange) {
        this.game.damageEnemy(otherEnemy, 2);
        console.log("Nuker trample hit other enemy!");
      }
    }

    // Visual effect (make nuker briefly glow)
    const material = this.enemy.mesh.material as THREE.MeshStandardMaterial;
    material.emissive.setHex(0x882200);
    setTimeout(() => {
      material.emissive.setHex(0x000000);
    }, 200);
  }
}
