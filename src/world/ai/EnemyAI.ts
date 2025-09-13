import * as THREE from "three";
import type { Game } from "../../core/Game";
import type { Enemy } from "../Enemy";

export enum EnemyType {
  RANGE = "range",
  MELEE = "melee",
  NUKER = "nuker",
  CHARGER = "charger",
}

export enum AIState {
  IDLE = "idle",
  APPROACH = "approach",
  CIRCLE = "circle",
  ATTACK = "attack",
  DASH = "dash",
  CHARGE_PREPARE = "charge_prepare",
  CHARGE_EXECUTE = "charge_execute",
  TRAMPLE = "trample",
  RETREAT = "retreat",
  COOLDOWN = "cooldown",
}

export abstract class EnemyAI {
  protected state = AIState.IDLE;
  protected stateTimer = 0;
  protected cooldownTimer = 0;
  protected lastAttackTime = 0;
  protected targetPosition = new THREE.Vector3();
  protected moveSpeed = 1.5;

  constructor(
    public readonly enemy: Enemy,
    public readonly type: EnemyType,
    public readonly game: Game,
  ) {}

  abstract update(dt: number): void;

  protected switchState(newState: AIState, duration = 0) {
    this.state = newState;
    this.stateTimer = duration;
  }

  protected updateTimers(dt: number) {
    this.stateTimer = Math.max(0, this.stateTimer - dt);
    this.cooldownTimer = Math.max(0, this.cooldownTimer - dt);
  }

  protected getPlayerPosition(): THREE.Vector3 {
    return this.game.player.mesh.position;
  }

  protected getDistanceToPlayer(): number {
    return this.enemy.mesh.position.distanceTo(this.getPlayerPosition());
  }

  protected getDirectionToPlayer(): THREE.Vector3 {
    return this.getPlayerPosition().clone().sub(this.enemy.mesh.position).normalize();
  }

  protected moveTowards(target: THREE.Vector3, speed: number, dt: number) {
    const direction = target.clone().sub(this.enemy.mesh.position);
    direction.y = 0;
    if (direction.lengthSq() > 0.001) {
      direction.normalize();
      this.enemy.mesh.position.addScaledVector(direction, speed * dt);
    }
  }

  protected maintainSeparation(dt: number) {
    const separation = 0.6;
    const separationForce = new THREE.Vector3();

    for (const otherEnemy of this.game.spawner.enemies) {
      if (otherEnemy === this.enemy || otherEnemy.dead) continue;

      const distance = this.enemy.mesh.position.distanceTo(otherEnemy.mesh.position);
      if (distance < separation && distance > 0.001) {
        const direction = this.enemy.mesh.position.clone().sub(otherEnemy.mesh.position).setY(0).normalize();
        separationForce.add(direction.multiplyScalar((separation - distance) * 0.5));
      }
    }

    this.enemy.mesh.position.add(separationForce.multiplyScalar(dt));
  }

  protected fireProjectile() {
    const direction = this.getDirectionToPlayer();
    this.game.projectiles.add(
      this.enemy.mesh.position.clone().add(new THREE.Vector3(0, 0.4, 0)),
      direction,
      false,
      this.game.scene,
    );
    this.lastAttackTime = performance.now();
  }
}
