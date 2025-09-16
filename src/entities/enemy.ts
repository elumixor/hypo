import "../utils/globals";
import { Mesh, MeshStandardMaterial, SphereGeometry, type Vector3 } from "three";
import { Entity } from "../../engine/entity";
import { AIBehavior } from "../behaviors/ai-behavior";
import { HealthBehavior } from "../behaviors/health-behavior";
import { MovementBehavior } from "../behaviors/movement-behavior";
import { ThreeService } from "../services/three-service";

export interface EnemyConfig {
  health?: number;
  movementSpeed?: number;
  aggroRange?: number;
  attackRange?: number;
  attackCooldown?: number;
}

export class Enemy extends Entity {
  readonly mesh: Mesh;
  private readonly healthBehavior: HealthBehavior;

  constructor(config: EnemyConfig = {}) {
    super(); // No ID parameter needed

    // Create THREE.js mesh for enemy
    const geometry = new SphereGeometry(0.25, 16, 12);
    const material = new MeshStandardMaterial({ color: 0xff4444 });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set((Math.random() - 0.5) * 10, 0.3, (Math.random() - 0.5) * 10);

    // Add behaviors with default configs
    this.healthBehavior = new HealthBehavior(config.health ?? 100);
    this.addBehavior(this.healthBehavior);
    this.addBehavior(
      new MovementBehavior({
        speed: config.movementSpeed ?? 2,
      }),
    );
    this.addBehavior(
      new AIBehavior({
        aggroRange: config.aggroRange ?? 10,
        attackRange: config.attackRange ?? 2,
        attackCooldown: config.attackCooldown ?? 1.5,
        movementSpeed: config.movementSpeed ?? 2,
      }),
    );
  }

  override init(): void {
    log("[Enemy] Enemy initialized");
  }

  override onEnterScene(): void {
    log("[Enemy] Enemy entered scene");

    // Add enemy mesh to THREE.js scene
    const threeService = this.getService(ThreeService);
    threeService.scene.add(this.mesh);
  }

  override onExitScene(): void {
    // Remove enemy mesh from THREE.js scene
    const threeService = this.getService(ThreeService);
    threeService.scene.remove(this.mesh);
  }

  override destroy(): void {
    this.mesh.geometry.dispose();
    if (Array.isArray(this.mesh.material)) {
      for (const material of this.mesh.material) material.dispose();
    } else {
      this.mesh.material.dispose();
    }
  }

  get position(): Vector3 {
    return this.mesh.position;
  }

  get health(): number {
    return this.healthBehavior.currentHealth;
  }

  takeDamage(amount: number): boolean {
    this.healthBehavior.takeDamage(amount);
    return this.healthBehavior.currentHealth <= 0;
  }
}
