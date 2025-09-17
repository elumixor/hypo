import { Behavior, ColliderBehavior, TransformBehavior } from "@engine";
import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import { destroy } from "utils";
import { CollisionGroup } from "../collision-group";
import type { CombatInputMappingContext } from "../combat-input-mapping.context";

export class BlockBehavior extends Behavior {
  private readonly maxShield = 100;
  private readonly maxEnergy = 50;
  private readonly energyDrainRate = 10; // Energy per second while blocking
  private readonly shieldRegenRate = 20; // Shield per second when not blocking
  private readonly collisionEnergyDrain = 5; // Extra energy drain per collision
  private readonly shieldRadius = 3; // Radius of the shield sphere
  
  private currentShield = this.maxShield;
  private currentEnergy = this.maxEnergy;
  private isBlocking = false;
  private shieldMesh?: Mesh;
  private shieldCollider?: ColliderBehavior;
  private transform!: TransformBehavior;

  override get enabled() {
    return super.enabled;
  }

  override set enabled(value: boolean) {
    super.enabled = value;
    this.updateShieldVisibility();
    if (this.shieldCollider) {
      this.shieldCollider.enabled = value && this.isBlocking;
    }
  }

  override async init() {
    await super.init();
    this.transform = this.getBehavior(TransformBehavior);
    this.createShieldMesh();
    // Don't create shield collider yet - wait for proper initialization
  }

  private createShieldMesh() {
    // Create semi-transparent blue sphere
    const geometry = new SphereGeometry(this.shieldRadius, 16, 16);
    const material = new MeshBasicMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    });

    this.shieldMesh = new Mesh(geometry, material);
    this.shieldMesh.visible = false;
    this.transform.group.add(this.shieldMesh);
  }

  private createShieldCollider() {
    if (this.shieldCollider) return; // Already created
    
    this.shieldCollider = new ColliderBehavior(CollisionGroup.Player, this.shieldRadius);
    this.shieldCollider.enabled = false;
    
    // Manually set up the collider since it's added after initialization
    this.shieldCollider.entity = this.entity;
    
    // Add to behaviors list
    this.entity.behaviors.push(this.shieldCollider);
    
    // Initialize the collider manually
    void this.shieldCollider.init();
    
    // Listen to collision events
    this.shieldCollider.collided.subscribe(this.onShieldCollision);
  }

  private readonly onShieldCollision = () => {
    if (!this.isBlocking) return;
    
    // Drain additional energy on collision
    this.currentEnergy = Math.max(0, this.currentEnergy - this.collisionEnergyDrain);
    console.log(`Shield collision! Extra energy drain. Energy: ${this.currentEnergy.toFixed(1)}`);
  };

  private updateShieldVisibility() {
    if (!this.shieldMesh) return;
    
    const shouldShow = this.enabled && this.isBlocking;
    this.shieldMesh.visible = shouldShow;
    
    if (shouldShow && !this.shieldCollider) {
      // Create shield collider when first needed
      this.createShieldCollider();
    }
    
    if (this.shieldCollider) {
      this.shieldCollider.enabled = shouldShow;
    }
  }

  override get input() {
    return super.input as CombatInputMappingContext;
  }

  override update(dt: number) {
    super.update(dt);

    const blockInput = this.input.blockActive.value;
    
    // Check if we can block (need energy)
    const canBlock = this.currentEnergy > 0;
    const wasBlocking = this.isBlocking;
    this.isBlocking = blockInput && canBlock;

    // Update shield visibility if blocking state changed
    if (wasBlocking !== this.isBlocking) {
      this.updateShieldVisibility();
    }

    if (this.isBlocking) {
      // Drain energy while blocking
      this.currentEnergy = Math.max(0, this.currentEnergy - this.energyDrainRate * dt);
      
      console.log(`Blocking! Shield: ${this.currentShield.toFixed(1)}, Energy: ${this.currentEnergy.toFixed(1)}`);
    } else {
      // Regenerate shield when not blocking
      this.currentShield = Math.min(this.maxShield, this.currentShield + this.shieldRegenRate * dt);
    }

    // Always regenerate energy when not blocking (or at a slower rate when blocking)
    if (!this.isBlocking) {
      this.currentEnergy = Math.min(this.maxEnergy, this.currentEnergy + this.energyDrainRate * dt * 0.5); // Regen at half the drain rate
    }
  }

  get blockingActive() {
    return this.isBlocking;
  }

  get shieldPercent() {
    return this.currentShield / this.maxShield;
  }

  get energyPercent() {
    return this.currentEnergy / this.maxEnergy;
  }

  // Method to reduce shield when taking damage while blocking
  absorbDamage(damage: number): number {
    if (!this.isBlocking) return damage; // No blocking, take full damage

    const shieldDamage = Math.min(damage, this.currentShield);
    this.currentShield -= shieldDamage;
    const remainingDamage = damage - shieldDamage;

    console.log(`Absorbed ${shieldDamage} damage with shield. Remaining damage: ${remainingDamage}`);
    
    return remainingDamage;
  }

  override destroy() {
    if (this.shieldCollider) {
      this.shieldCollider.collided.unsubscribe(this.onShieldCollision);
    }
    
    if (this.shieldMesh) {
      destroy(this.shieldMesh);
    }
    
    super.destroy();
  }
}