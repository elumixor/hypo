import { EventEmitter } from "@elumixor/event-emitter";
import { ColliderBehavior, delay, Entity, TransformBehavior, ticker } from "@engine";
import { HealthBehavior } from "behaviors/health.behavior";
import { gsap } from "gsap";
import { resources } from "resources";
import { type Object3D, Vector3 } from "three";
import { destroy } from "utils";
import { CollisionGroup } from "../collision-group";
import { Player } from "./player";
import { Projectile } from "./projectile";

export class Enemy extends Entity {
  readonly enemyDied = new EventEmitter();

  // Self behaviors
  private readonly transform = this.addBehavior(new TransformBehavior());
  private readonly collider = this.addBehavior(new ColliderBehavior(CollisionGroup.Enemy));
  private readonly health = this.addBehavior(new HealthBehavior(30)); // Enemy has 30 HP

  // Referenced behaviors
  private playerTransform!: TransformBehavior;

  // Enemy AI properties
  private readonly speed = 10;
  private readonly radius = 15; // Distance from player
  private model!: Object3D;

  override async init() {
    await super.init();

    // Find player in the scene
    this.playerTransform = this.scene.getEntity(Player).getBehavior(TransformBehavior);

    // Listen to health changes to emit death event
    this.health.healthChanged.subscribe((event) => {
      if (!event.isAlive) this.enemyDied.emit();
    });

    // Load the drone model for enemy (same as player for now)
    const { scene } = resources.get("models/drone");
    this.model = scene.children.first.clone();

    // Enable shadow casting for all meshes in the model
    this.model.traverse((child) => {
      if (child.type === "Mesh") child.castShadow = true;
    });

    // Add model to transform behavior's group
    this.transform.group.add(this.model);
    this.transform.group.position.y = 5;

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
    gsap.to(this.transform.group.rotation, {
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
    const playerPos = this.playerTransform.group.position;
    const angle = Math.random() * Math.PI * 2; // Random angle
    const x = playerPos.x + Math.cos(angle) * this.radius;
    const z = playerPos.z + Math.sin(angle) * this.radius;

    return new Vector3(x, 5, z);
  }

  private async shoot() {
    // Create 3 projectiles with intervals: 0.2, 0.5 seconds
    for (const time of [0, 0.2, 0.5]) {
      await delay(time);
      if (!this.health.isAlive) return; // Stop shooting if dead
      const projectile = new Projectile(
        this.transform.group.position.clone(),
        this.playerTransform.group.position.clone(),
        false, // This is an enemy projectile
      );
      this.scene.addEntity(projectile);
    }
  }

  override destroy() {
    destroy(this.model);

    super.destroy();
  }
}
