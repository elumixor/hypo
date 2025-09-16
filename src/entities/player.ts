import "../utils/globals";
import { Mesh, MeshStandardMaterial, SphereGeometry, type Vector3 } from "three";
import { Entity } from "@engine";
import { HealthBehavior } from "../behaviors/health-behavior";
import { MovementBehavior } from "../behaviors/movement-behavior";

export interface PlayerConfig {
  health: number;
  movementSpeed: number;
  dashSpeed?: number;
}

export class Player extends Entity {
  readonly mesh: Mesh;
  private readonly healthBehavior: HealthBehavior;
  private readonly movementBehavior: MovementBehavior;

  constructor(config: PlayerConfig) {
    super(); // No ID parameter needed

    // Create THREE.js mesh for player
    const geometry = new SphereGeometry(0.3, 16, 12);
    const material = new MeshStandardMaterial({ color: 0x4ec9ff });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set(0, 0.4, 0);

    this.healthBehavior = new HealthBehavior(config.health);
    this.movementBehavior = new MovementBehavior({
      speed: config.movementSpeed,
      dashSpeed: config.dashSpeed,
    });

    this.addBehavior(this.healthBehavior);
    this.addBehavior(this.movementBehavior);
  }

  override async init(): Promise<void> {
    await super.init();
    log("[Player] Player entity initialized");
    
    // Add player mesh to 3D scene
    this.scene.sceneRoot.add(this.mesh);
  }

  override destroy(): void {
    super.destroy();
    
    // Remove player mesh from 3D scene
    this.scene.sceneRoot.remove(this.mesh);
    
    // Clean up Three.js resources
    this.mesh.geometry.dispose();
    if (Array.isArray(this.mesh.material)) {
      for (const material of this.mesh.material) material.dispose();
    } else {
      this.mesh.material.dispose();
    }
  }

  // Convenience methods for accessing player-specific functionality
  get health(): number {
    return this.healthBehavior.currentHealth;
  }

  get position(): Vector3 {
    return this.mesh.position;
  }

  takeDamage(amount: number): void {
    // This will trigger the HealthBehavior's damage handling
    // In a more complex system, this might go through the CombatService
    log(`[Player] Taking ${amount} damage`);
  }

  dash(): boolean {
    return this.movementBehavior.dash();
  }

  move(direction: { x: number; y: number; z: number }, dt: number): void {
    this.movementBehavior.move(direction, dt);

    // Update THREE.js mesh position based on movement
    const speed = this.movementBehavior.currentSpeed;
    const distance = speed * dt;

    // Normalize direction
    const length = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2);
    if (length === 0) return;

    const normalizedDirection = {
      x: direction.x / length,
      y: direction.y / length,
      z: direction.z / length,
    };

    // Update mesh position
    this.mesh.position.x += normalizedDirection.x * distance;
    this.mesh.position.y += normalizedDirection.y * distance;
    this.mesh.position.z += normalizedDirection.z * distance;
  }

  get canDash(): boolean {
    return this.movementBehavior.canDash;
  }
}
