/**
 * Enemy AI Behaviors
 *
 * Specific behavior tree nodes for enemy AI implementation
 */

import { Vector3 } from "three";
import { BTAction, BTCondition, NodeStatus } from "./behavior-tree";

/**
 * AI context containing shared state for enemy AI
 */
export interface EnemyAIContext {
  // Enemy entity reference
  enemy: {
    position: Vector3;
    rotation: { y: number };
    transform: { position: Vector3; rotation: { y: number } };
    speed: number;
    shootRange: number;
    health: { isAlive: boolean };
    shoot: () => Promise<void>;
    // biome-ignore lint/suspicious/noExplicitAny: Simplified type for scene interface
    scene: any;
  };

  // Player reference
  player: {
    position: Vector3;
  };

  // AI state variables
  currentTarget: Vector3 | null;
  lastMoveUpdate: number;
  isMoving: boolean;
  isShooting: boolean;
  shootCooldown: number;
  preShootDelay: number;
  postShootDelay: number;
  moveUpdateInterval: number;
  strafeSpeed: number;
  rotationSpeed: number;
}

/**
 * Condition: Check if enemy is in shooting range of player
 */
export class InRangeCondition extends BTCondition {
  constructor(private readonly context: EnemyAIContext) {
    super();
  }

  evaluate(): boolean {
    const distance = this.context.enemy.position.distanceTo(this.context.player.position);
    return distance <= this.context.enemy.shootRange;
  }
}

/**
 * Condition: Check if it's time to update movement target
 */
export class ShouldUpdateTargetCondition extends BTCondition {
  constructor(private readonly context: EnemyAIContext) {
    super();
  }

  evaluate(): boolean {
    const now = Date.now();
    return now - this.context.lastMoveUpdate >= this.context.moveUpdateInterval;
  }
}

/**
 * Condition: Check if enemy is currently moving
 */
export class IsMovingCondition extends BTCondition {
  constructor(private readonly context: EnemyAIContext) {
    super();
  }

  evaluate(): boolean {
    return this.context.isMoving;
  }
}

/**
 * Condition: Check if enemy is currently shooting
 */
export class IsShootingCondition extends BTCondition {
  constructor(private readonly context: EnemyAIContext) {
    super();
  }

  evaluate(): boolean {
    return this.context.isShooting;
  }
}

/**
 * Condition: Check if shoot cooldown has passed
 */
export class CanShootCondition extends BTCondition {
  constructor(private readonly context: EnemyAIContext) {
    super();
  }

  evaluate(): boolean {
    const now = Date.now();
    return now - this.context.shootCooldown >= 2000; // 2 second cooldown
  }
}

/**
 * Action: Pick a new target position around the player
 */
export class PickNewTargetAction extends BTAction {
  constructor(private readonly context: EnemyAIContext) {
    super();
  }

  perform(): NodeStatus {
    const player = this.context.player;

    // Pick random position around player
    const angle = Math.random() * Math.PI * 2;
    const distance = 8 + Math.random() * 12; // 8-20 units from player

    const x = player.position.x + Math.cos(angle) * distance;
    const z = player.position.z + Math.sin(angle) * distance;

    this.context.currentTarget = new Vector3(x, 5, z);
    this.context.lastMoveUpdate = Date.now();

    return NodeStatus.SUCCESS;
  }
}

/**
 * Action: Move towards current target position
 */
export class MoveToTargetAction extends BTAction {
  constructor(private readonly context: EnemyAIContext) {
    super();
  }

  perform(dt: number): NodeStatus {
    if (!this.context.currentTarget) {
      return NodeStatus.FAILURE;
    }

    const enemy = this.context.enemy;
    const target = this.context.currentTarget;
    const currentPos = enemy.position;

    // Calculate direction and distance
    const direction = target.clone().sub(currentPos);
    const distance = direction.length();

    // If close enough to target, consider it reached
    if (distance < 1.0) {
      this.context.isMoving = false;
      return NodeStatus.SUCCESS;
    }

    // Move towards target
    direction.normalize();
    const moveSpeed = this.context.enemy.speed * dt * 0.01;
    currentPos.add(direction.multiplyScalar(moveSpeed));

    this.context.isMoving = true;
    return NodeStatus.RUNNING;
  }
}

/**
 * Action: Rotate towards player smoothly
 */
export class RotateToPlayerAction extends BTAction {
  constructor(private readonly context: EnemyAIContext) {
    super();
  }

  perform(dt: number): NodeStatus {
    const enemy = this.context.enemy;
    const player = this.context.player;

    // Calculate desired rotation
    const direction = player.position.clone().sub(enemy.position);
    const targetRotation = Math.atan2(direction.x, direction.z);

    // Smooth rotation
    const currentRotation = enemy.rotation.y;
    const rotationDiff = targetRotation - currentRotation;

    // Normalize rotation difference to [-π, π]
    let normalizedDiff = rotationDiff;
    while (normalizedDiff > Math.PI) normalizedDiff -= Math.PI * 2;
    while (normalizedDiff < -Math.PI) normalizedDiff += Math.PI * 2;

    // Apply rotation
    const rotationSpeed = this.context.rotationSpeed * dt * 0.01;
    if (Math.abs(normalizedDiff) < rotationSpeed) {
      enemy.rotation.y = targetRotation;
      return NodeStatus.SUCCESS;
    } else {
      enemy.rotation.y += Math.sign(normalizedDiff) * rotationSpeed;
      return NodeStatus.RUNNING;
    }
  }
}

/**
 * Action: Strafe around player when close
 */
export class StrafeAroundPlayerAction extends BTAction {
  private strafeDirection = 1; // 1 or -1 for left/right

  constructor(private readonly context: EnemyAIContext) {
    super();
    // Randomly pick initial strafe direction
    this.strafeDirection = Math.random() > 0.5 ? 1 : -1;
  }

  perform(dt: number): NodeStatus {
    const enemy = this.context.enemy;
    const player = this.context.player;

    // Calculate perpendicular direction for strafing
    const toPlayer = player.position.clone().sub(enemy.position);
    toPlayer.y = 0;
    toPlayer.normalize();

    // Perpendicular vector for strafing
    const strafeDirection = new Vector3(-toPlayer.z, 0, toPlayer.x);
    strafeDirection.multiplyScalar(this.strafeDirection * this.context.strafeSpeed * dt * 0.01);

    // Apply strafe movement
    enemy.position.add(strafeDirection);

    // Occasionally change strafe direction
    if (Math.random() < dt * 0.001) {
      // Small chance per frame
      this.strafeDirection *= -1;
    }

    this.context.isMoving = true;
    return NodeStatus.RUNNING;
  }
}

/**
 * Action: Perform shooting sequence with delays
 */
export class ShootSequenceAction extends BTAction {
  private state: "pre-delay" | "shooting" | "post-delay" | "done" = "pre-delay";
  private stateStartTime = 0;

  constructor(private readonly context: EnemyAIContext) {
    super();
  }

  perform(_dt: number): NodeStatus {
    const now = Date.now();

    switch (this.state) {
      case "pre-delay":
        if (this.stateStartTime === 0) {
          this.stateStartTime = now;
          this.context.isShooting = true;
        }

        if (now - this.stateStartTime >= this.context.preShootDelay) {
          this.state = "shooting";
          this.stateStartTime = 0;
        }
        return NodeStatus.RUNNING;

      case "shooting":
        // Note: We can't await here, so we'll use a different approach
        // The actual shooting will be handled by a separate system
        this.context.shootCooldown = now;
        this.state = "post-delay";
        this.stateStartTime = now;

        // Trigger shooting (fire and forget)
        void this.context.enemy.shoot();
        return NodeStatus.RUNNING;

      case "post-delay":
        if (now - this.stateStartTime >= this.context.postShootDelay) {
          this.state = "done";
        }
        return NodeStatus.RUNNING;

      case "done":
        this.context.isShooting = false;
        this.reset();
        return NodeStatus.SUCCESS;
    }

    return NodeStatus.FAILURE;
  }

  override reset() {
    super.reset();
    this.state = "pre-delay";
    this.stateStartTime = 0;
  }
}

/**
 * Action: Wait/Idle for a specified duration
 */
export class WaitAction extends BTAction {
  private startTime = 0;

  constructor(private readonly duration: number) {
    super();
  }

  perform(): NodeStatus {
    if (this.startTime === 0) {
      this.startTime = Date.now();
    }

    if (Date.now() - this.startTime >= this.duration) {
      this.reset();
      return NodeStatus.SUCCESS;
    }

    return NodeStatus.RUNNING;
  }

  override reset() {
    super.reset();
    this.startTime = 0;
  }
}
