import { Behavior, TransformBehavior } from "@engine";
import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import { destroy } from "utils";
import type { CombatInputMappingContext } from "../combat-input-mapping.context";

export class PlayerShieldBehavior extends Behavior {
  private transform!: TransformBehavior;
  private shieldMesh!: Mesh;
  private isShielding = false;

  override async init() {
    await super.init();

    this.transform = this.getBehavior(TransformBehavior);

    // Create shield mesh
    const geometry = new SphereGeometry(2, 8, 6);
    const material = new MeshBasicMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });

    this.shieldMesh = new Mesh(geometry, material);
    this.shieldMesh.visible = false;
    this.transform.group.add(this.shieldMesh);

    // Listen to shield input events
    this.input.shield.on.subscribe(() => this.activateShield());
    this.input.shield.off.subscribe(() => this.deactivateShield());
  }

  override get input() {
    return super.input as CombatInputMappingContext;
  }

  override update(dt: number) {
    super.update(dt);

    // Rotate shield slightly for visual effect
    if (this.isShielding) {
      this.shieldMesh.rotation.y += dt * 0.005;
    }
  }

  private activateShield = () => {
    this.isShielding = true;
    this.shieldMesh.visible = true;
  };

  private deactivateShield = () => {
    this.isShielding = false;
    this.shieldMesh.visible = false;
  };

  get shielding() {
    return this.isShielding;
  }

  override destroy() {
    // Unsubscribe from shield events
    this.input.shield.on.unsubscribe(this.activateShield);
    this.input.shield.off.unsubscribe(this.deactivateShield);
    
    destroy(this.shieldMesh);
    super.destroy();
  }
}
