import { Entity, ticker } from "@engine";
import { Mesh, MeshStandardMaterial, SphereGeometry, Vector3 } from "three";

/**
 * A floating light sphere that provides ambient lighting and gentle movement
 */
export class FloatingLightSphere extends Entity {
  private static readonly geometry = new SphereGeometry(1.5, 16, 12);

  private readonly mesh: Mesh;
  private readonly floatOffset = new Vector3();

  constructor(
    color: number,
    intensity: number,
    private readonly floatSpeed = 0.001,
    private readonly floatAmplitude = 2,
  ) {
    super();

    // Create glowing sphere geometry
    this.mesh = new Mesh(
      FloatingLightSphere.geometry,
      new MeshStandardMaterial({ emissive: color, emissiveIntensity: intensity }),
    );

    // Random initial float offset for variety
    this.floatOffset.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
  }

  override async init() {
    await super.init();

    // Add mesh and light to transform group
    this.transform.group.add(this.mesh);
  }

  override update(dt: number) {
    super.update(dt);

    // Add gentle floating animation
    const time = ticker.lastTime * this.floatSpeed;
    const floatY = Math.sin(time + this.floatOffset.x) * this.floatAmplitude;
    const floatX = Math.cos(time * 0.7 + this.floatOffset.y) * (this.floatAmplitude * 0.5);
    const floatZ = Math.sin(time * 0.5 + this.floatOffset.z) * (this.floatAmplitude * 0.3);

    this.mesh.position.set(floatX, floatY, floatZ);
  }

  override destroy() {
    (this.mesh.material as MeshStandardMaterial).dispose();

    super.destroy();
  }
}
