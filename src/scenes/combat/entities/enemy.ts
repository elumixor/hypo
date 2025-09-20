import { EventEmitter } from "@elumixor/event-emitter";
import { ColliderBehavior, type CollisionEvent, delay, Entity, ticker } from "@engine";
import { gsap } from "gsap";
import { resources } from "resources";
import { type Object3D, Vector3 } from "three";
import { CollisionGroup } from "../../../collision-group";
import { HealthBehavior, type HealthEvent } from "../behaviors/health.behavior";
import { CombatEventsService } from "../services/combat-events.service";
import { ProjectilePoolService } from "../services/projectile-pool.service";
import { Player } from "./player";
import { Projectile } from "./projectile";

export class Enemy extends Entity {
  readonly died = new EventEmitter();

  // Add collision behavior
  private readonly collider = this.addBehavior(new ColliderBehavior(CollisionGroup.Enemy));
  private readonly health = this.addBehavior(new HealthBehavior(30)); // Enemy has 30 HP

  private readonly combatEvents = this.require(CombatEventsService);
  private readonly projectilePool = this.require(ProjectilePoolService);

  // Reference to a player, as a target (should be refactored later probably)
  private player!: Player;

  // Enemy AI properties
  private readonly speed = 10;
  private readonly radius = 15; // Distance from player
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

    void this.startLoop();
  }

  private async startLoop() {
    while (this.health.isAlive) {
      // Set initial target position
      await this.moveTowardsTarget(this.getNextTargetPosition());
      await this.shoot();
    }
  }

  override update(dt: number) {
    super.update(dt);

    // Add subtle hover animation to the model
    this.model.position.y = Math.sin(ticker.lastTime * 0.002) * 0.1;
  }

  private async moveTowardsTarget(targetPosition: Vector3) {
    const currentPos = this.transform.group.position;
    const direction = targetPosition.clone().sub(currentPos);
    const distance = direction.length();

    // Rotation tween
    gsap.to(this.rotation, {
      y: Math.atan2(direction.x, direction.z),
      duration: 0.3,
      ease: "power1.inOut",
    });

    // Await movement tween
    await gsap.to(currentPos, {
      x: targetPosition.x,
      z: targetPosition.z,
      duration: distance / this.speed,
      ease: "power1.inOut",
    });
  }

  private getNextTargetPosition() {
    const angle = Math.random() * Math.PI * 2; // Random angle
    const x = this.player.x + Math.cos(angle) * this.radius;
    const z = this.player.z + Math.sin(angle) * this.radius;

    return new Vector3(x, 5, z);
  }

  private async shoot() {
    // Create 3 projectiles with intervals: 0.2, 0.5 seconds
    for (const time of [0, 0.2, 0.5]) {
      await delay(time);
      if (!this.health.isAlive) return; // Stop shooting if dead

      const projectile = this.projectilePool.getProjectile(
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

    projectile.returnToPool();
  }

  private onHealthChanged({ isAlive }: HealthEvent) {
    if (isAlive) return;

    this.died.emit();
    this.destroy();
  }
}
