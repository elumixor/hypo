import { EventEmitter } from "@elumixor/event-emitter";
import { ColliderBehavior, type CollisionEvent, delay, Entity, ticker } from "@engine";
import { resources } from "resources";
import type { Object3D } from "three";
import { CollisionGroup } from "../../../collision-group";
import { EnemyAIBehavior } from "../behaviors/enemy-ai.behavior";
import { HealthBehavior, type HealthEvent } from "../behaviors/health.behavior";
import { CombatEventsService } from "../services/combat-events.service";
import { Player } from "./player";
import { Projectile } from "./projectile";

export class Enemy extends Entity {
  readonly died = new EventEmitter();

  // Add collision behavior
  private readonly collider = this.addBehavior(new ColliderBehavior(CollisionGroup.Enemy));
  private readonly health = this.addBehavior(new HealthBehavior(30)); // Enemy has 30 HP

  constructor() {
    super();
    // Add new AI behavior - automatically executes via behavior lifecycle
    this.addBehavior(new EnemyAIBehavior());
  }

  private readonly combatEvents = this.require(CombatEventsService);

  // Reference to a player, as a target (should be refactored later probably)
  private player!: Player;

  private model!: Object3D;

  override async init() {
    await super.init();

    // Find player in the scene
    this.player = this.scene.getEntity(Player);

    // Listen to collision events
    this.on(this.collider.collided, this.onCollision.bind(this));

    // Listen to health changes to emit death event
    this.on(this.health.healthChanged, this.onHealthChanged.bind(this));

    // Load the drone model for enemy (same as player for now)
    const { scene } = resources.get("models/drone");
    this.model = scene.children.first.clone();

    // Enable shadow casting for all meshes in the model
    this.model.traverse((child) => {
      if (child.type === "Mesh") child.castShadow = true;
    });

    // Add model to transform behavior's group
    this.addChild(this.model);
    this.y = 5;

    // AI is now handled by EnemyAIBehavior - no need for manual loop
  }

  override update(dt: number) {
    super.update(dt);

    // Add subtle hover animation to the model
    this.model.position.y = Math.sin(ticker.lastTime * 0.002) * 0.1;
  }

  // Keep shoot method for AI behavior to call
  async shoot() {
    // Create 3 projectiles with intervals: 0.2, 0.5 seconds
    for (const time of [0, 0.2, 0.5]) {
      await delay(time);
      if (!this.health.isAlive) return; // Stop shooting if dead

      const projectile = new Projectile(
        this.transform.position.clone(),
        this.player.position.clone(),
        false, // This is an enemy projectile
      );

      this.scene.addEntity(projectile);
    }
  }

  private onCollision(event: CollisionEvent) {
    const projectile = event.other.entity.as(Projectile);
    const damage = projectile.damage;
    this.health.health -= damage;

    // Emit damage event through the service
    this.combatEvents.dealDamage(this, damage, this.position);

    projectile.destroy();
  }

  private onHealthChanged({ isAlive }: HealthEvent) {
    if (isAlive) return;

    this.died.emit();
    this.destroy();
  }
}
