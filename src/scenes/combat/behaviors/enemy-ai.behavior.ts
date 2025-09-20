/**
 * Enemy AI Behavior - replaces the old GSAP-based AI with a reactive behavior tree system
 */

import { Behavior } from "@engine";
import { Vector3 } from "three";
import { type BTNode, BTSelector, BTSequence } from "../../../../engine/ai/behavior-tree";
import {
  CanShootCondition,
  type EnemyAIContext,
  InRangeCondition,
  MoveToTargetAction,
  PickNewTargetAction,
  RotateToPlayerAction,
  ShootSequenceAction,
  ShouldUpdateTargetCondition,
  StrafeAroundPlayerAction,
} from "../../../../engine/ai/enemy-behaviors";
import { Player } from "../entities/player";
import { HealthBehavior } from "./health.behavior";

export class EnemyAIBehavior extends Behavior {
  private readonly aiContext: EnemyAIContext;
  private readonly behaviorTree: BTNode;

  constructor() {
    super();

    // Initialize AI context with default values
    this.aiContext = {
      enemy: {
        position: new Vector3(),
        rotation: { y: 0 },
        transform: { position: new Vector3(), rotation: { y: 0 } },
        speed: 10,
        shootRange: 12,
        health: { isAlive: true },
        shoot: async () => {
          // Placeholder - will be replaced in init()
        },
        scene: { getEntity: <T>(_type: new () => T) => null as unknown as T },
      },
      player: {
        position: new Vector3(),
      },
      currentTarget: null,
      lastMoveUpdate: 0,
      isMoving: false,
      isShooting: false,
      shootCooldown: 0,
      preShootDelay: 500, // 0.5 seconds
      postShootDelay: 300, // 0.3 seconds
      moveUpdateInterval: 2500, // 2.5 seconds
      strafeSpeed: 3,
      rotationSpeed: 5,
    };

    // Build the behavior tree
    this.behaviorTree = this.createBehaviorTree();
  }

  override async init() {
    await super.init();

    // Get player reference
    const player = this.scene.getEntity(Player);

    // Get health behavior
    const healthBehavior = this.entity.getBehavior(HealthBehavior);

    // Setup AI context with actual entity references
    this.aiContext.enemy = {
      position: this.entity.position,
      rotation: this.entity.rotation,
      transform: this.entity.transform,
      speed: 10,
      shootRange: 12,
      health: healthBehavior,
      shoot: async () => {
        // Call the enemy's shoot method if it exists
        // biome-ignore lint/suspicious/noExplicitAny: Entity type casting needed for method access
        if ("shoot" in this.entity && typeof (this.entity as any).shoot === "function") {
          // biome-ignore lint/suspicious/noExplicitAny: Entity type casting needed for method call
          await (this.entity as any).shoot();
        }
      },
      scene: this.scene,
    };

    this.aiContext.player = {
      position: player.position,
    };
  }

  override update(dt: number) {
    super.update(dt);

    // Only run AI if enemy is alive
    if (!this.aiContext.enemy.health.isAlive) return;

    // Execute the behavior tree
    this.behaviorTree.execute(dt);
  }

  private createBehaviorTree(): BTNode {
    // Main AI behavior tree structure:
    // Selector (choose one behavior)
    //   ├── Sequence (shooting behavior when in range)
    //   │   ├── InRangeCondition
    //   │   ├── RotateToPlayerAction
    //   │   ├── Selector (choose shooting or strafing)
    //   │   │   ├── Sequence (shoot if can shoot)
    //   │   │   │   ├── CanShootCondition
    //   │   │   │   ├── ShootSequenceAction
    //   │   │   │   └── PickNewTargetAction (after shooting)
    //   │   │   └── StrafeAroundPlayerAction (if can't shoot)
    //   │   └── WaitAction
    //   └── Sequence (movement behavior when not in range)
    //       ├── Selector (target management)
    //       │   ├── Sequence (update target if needed)
    //       │   │   ├── ShouldUpdateTargetCondition
    //       │   │   └── PickNewTargetAction
    //       │   └── MoveToTargetAction
    //       └── MoveToTargetAction

    const shootingBehavior = new BTSequence()
      .addChild(new InRangeCondition(this.aiContext))
      .addChild(new RotateToPlayerAction(this.aiContext))
      .addChild(
        new BTSelector()
          .addChild(
            new BTSequence()
              .addChild(new CanShootCondition(this.aiContext))
              .addChild(new ShootSequenceAction(this.aiContext))
              .addChild(new PickNewTargetAction(this.aiContext)),
          )
          .addChild(new StrafeAroundPlayerAction(this.aiContext)),
      );

    const movementBehavior = new BTSequence().addChild(
      new BTSelector()
        .addChild(
          new BTSequence()
            .addChild(new ShouldUpdateTargetCondition(this.aiContext))
            .addChild(new PickNewTargetAction(this.aiContext)),
        )
        .addChild(new MoveToTargetAction(this.aiContext)),
    );

    // Main behavior tree - choose between shooting and movement
    return new BTSelector().addChild(shootingBehavior).addChild(movementBehavior);
  }

  override destroy() {
    super.destroy();
    this.behaviorTree.reset();
  }
}
