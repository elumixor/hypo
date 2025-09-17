import { Entity } from "@engine";
import { TransformBehavior } from "behaviors/transform-behavior";
import { Mesh, MeshLambertMaterial, SphereGeometry, Vector3 } from "three";
import { destroy } from "utils";

export class Projectile extends Entity {
  private readonly speed = 5;
  private mesh!: Mesh;
  private direction = new Vector3();
  private targetPosition = new Vector3();
  private lifetime = 0;
  private readonly maxLifetime = 5000; // 5 seconds
  private transform!: TransformBehavior;

  constructor(
    private startPosition: Vector3,
    targetPosition: Vector3,
  ) {
    super();

    this.addBehavior(new TransformBehavior());
    this.targetPosition.copy(targetPosition);
  }

  override async init() {
    await super.init();

    console.log("Projectile fired!");

    this.transform = this.getBehavior(TransformBehavior);
    this.transform.group.position.copy(this.startPosition);

    // Create red sphere geometry
    const geometry = new SphereGeometry(0.2, 8, 8);
    const material = new MeshLambertMaterial({ color: 0xff0000 }); // Red color

    this.mesh = new Mesh(geometry, material);

    // Add to transform group
    this.transform.group.add(this.mesh);

    // Calculate direction towards target
    this.direction.copy(this.targetPosition).sub(this.transform.group.position).normalize();
  }

  override update(dt: number) {
    super.update(dt);

    this.lifetime += dt;

    // Move towards target
    const moveAmount = this.speed * dt * 0.01;
    this.transform.group.position.add(this.direction.clone().multiplyScalar(moveAmount));

    // Destroy after max lifetime
    if (this.lifetime >= this.maxLifetime) {
      this.scene.removeEntity(this);
    }
  }

  override destroy() {
    super.destroy();

    destroy(this.mesh);
  }
}
