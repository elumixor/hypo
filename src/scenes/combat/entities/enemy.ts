import { delay, Entity, ticker } from "@engine";
import { TransformBehavior } from "behaviors/transform-behavior";
import gsap from "gsap";
import { resources } from "resources";
import type { Object3D } from "three";
import { Vector3 } from "three";
import { destroy } from "utils";
import { Player } from "./player";
import { Projectile } from "./projectile";

export class Enemy extends Entity {
  private model!: Object3D;
  private transform!: TransformBehavior;

  // Enemy AI properties
  private readonly speed = 10;
  private readonly radius = 15; // Distance from player
  private playerTransform!: TransformBehavior;

  constructor() {
    super();

    this.addBehavior(new TransformBehavior());
  }

  override async init() {
    await super.init();

    this.transform = this.getBehavior(TransformBehavior);

    // Find player in the scene
    const player = this.scene.entities.find((entity) => entity instanceof Player);
    if (player) this.playerTransform = player.getBehavior(TransformBehavior);

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
    while (true) {
      // Set initial target position
      await this.moveTowardsTarget(this.getNextTargetPosition());
      await this.shoot();
    }
  }

  override update() {
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
      duration: 0.5,
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
    // Create 4 projectiles with intervals: 0.2, 0.2, 0.5 seconds
    for (const time of [0, 0.2, 0.2, 0.5]) {
      await delay(time);
      const projectile = new Projectile(
        this.transform.group.position.clone(),
        this.playerTransform.group.position.clone(),
      );
      this.scene.addEntity(projectile);
    }
  }

  override destroy() {
    destroy(this.model);

    super.destroy();
  }
}
