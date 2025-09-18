import { Behavior, ColliderBehavior, type CollisionEvent, cast, TransformBehavior } from "@engine";
import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import { destroy } from "utils";
import { CollisionGroup } from "../collision-group";
import type { CombatInputMappingContext } from "../combat-input-mapping.context";
import { Projectile } from "../entities/projectile";
import { EnergyBehavior } from "./energy.behavior";

export class ShieldBehavior extends Behavior {
  // Parameters
  private readonly activeDrain = 10; // Energy per second while the shield is active
  private readonly damageToEnergy = 0.5; // How much energy is drained per point of damage absorbed
  private readonly shieldRadius = 5; // Radius of the shield sphere

  // Our behaviors
  private readonly shieldCollider = new ColliderBehavior(CollisionGroup.Player, this.shieldRadius);

  // Required behaviors
  private transform!: TransformBehavior;
  private energy!: EnergyBehavior;

  // Objects
  // Semi transparent blue sphere
  private readonly shieldMesh = new Mesh(
    new SphereGeometry(this.shieldRadius, 16, 16),
    new MeshBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.3 }),
  );

  override get enabled() {
    return super.enabled;
  }

  // Enable or disable the the mesh on the shield activation
  override set enabled(value: boolean) {
    super.enabled = value;

    this.shieldCollider.enabled = value;

    if (value) this.transform.group.add(this.shieldMesh);
    else this.shieldMesh.removeFromParent();
  }

  override async init() {
    await super.init();

    // Add the shield collider behavior to the entity
    this.entity.addBehavior(this.shieldCollider);

    this.transform = this.getBehavior(TransformBehavior);
    this.energy = this.getBehavior(EnergyBehavior);

    // Start disabled
    this.enabled = false;

    // Initialize the collider manually as it is added dynamically
    await this.shieldCollider.init();

    // Listen to collision events
    this.shieldCollider.collided.subscribe(this.onShieldCollision);

    // Listen to input
    const { shield } = this.input as CombatInputMappingContext;
    shield.on.subscribe(this.onShieldActivated);
    shield.off.subscribe(this.onShieldDeactivated);
  }

  override update(dt: number) {
    super.update(dt);

    // When active, drain energy over time
    this.energy.energy -= this.activeDrain * (dt / 1000);

    // If we run out of energy, disable the shield
    if (this.energy.energy <= 0) this.enabled = false;
  }

  private readonly onShieldCollision = ({ other }: CollisionEvent) => {
    const projectile = cast(Projectile, other.entity);
    const damage = projectile.damage;

    // Drain additional energy on collision
    const damageAsEnergy = this.damageToEnergy * damage;

    const currentEnergy = this.energy.energy;
    this.energy.energy -= damageAsEnergy;

    const damageLeft = Math.max(0, damageAsEnergy - currentEnergy);
    if (damageLeft > 0) {
      projectile.damage = damageLeft; // Reduce projectile damage by absorbed amount
      this.enabled = false; // Disable shield if we run out of energy
    } else projectile.destroy(); // Remove the projectile if fully absorbed
  };

  private readonly onShieldActivated = () => {
    this.enabled = true;
  };

  private readonly onShieldDeactivated = () => {
    this.enabled = false;
  };

  override destroy() {
    // Clean up events
    this.shieldCollider.collided.unsubscribe(this.onShieldCollision);
    const { shield } = this.input as CombatInputMappingContext;
    shield.on.unsubscribe(this.onShieldActivated);
    shield.off.unsubscribe(this.onShieldDeactivated);

    destroy(this.shieldMesh);

    super.destroy();
  }
}
