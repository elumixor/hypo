import { Entity, TransformBehavior, ticker } from "@engine";
import { Mesh, MeshStandardMaterial, PointLight, SphereGeometry, Vector3 } from "three";
import { destroy } from "utils";

/**
 * A floating light sphere that provides ambient lighting and gentle movement
 */
export class FloatingLightSphere extends Entity {
  private readonly transform = this.addBehavior(new TransformBehavior());
  private readonly mesh: Mesh;
  private readonly light: PointLight;
  private readonly floatOffset: Vector3 = new Vector3();

  constructor(
    color = 0xffddaa,
    intensity = 1.2,
    distance = 25,
    private readonly floatSpeed = 0.001,
    private readonly floatAmplitude = 2,
  ) {
    super();

    // Create glowing sphere geometry
    const geometry = new SphereGeometry(1.5, 16, 12);
    const material = new MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.9,
    });

    this.mesh = new Mesh(geometry, material);

    // Create point light
    this.light = new PointLight(color, intensity, distance);
    this.light.position.set(0, 0, 0);

    // Random initial float offset for variety
    this.floatOffset.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
  }

  override async init() {
    await super.init();

    // Add mesh and light to transform group
    this.transform.group.add(this.mesh);
    this.transform.group.add(this.light);
  }

  /**
   * Set the position of this floating light
   */
  setPosition(x: number, y: number, z: number) {
    this.transform.group.position.set(x, y, z);
  }

  override update(dt: number) {
    super.update(dt);

    // Add gentle floating animation
    const time = ticker.lastTime * this.floatSpeed;
    const floatY = Math.sin(time + this.floatOffset.x) * this.floatAmplitude;
    const floatX = Math.cos(time * 0.7 + this.floatOffset.y) * (this.floatAmplitude * 0.5);
    const floatZ = Math.sin(time * 0.5 + this.floatOffset.z) * (this.floatAmplitude * 0.3);

    this.mesh.position.set(floatX, floatY, floatZ);
    this.light.position.copy(this.mesh.position);

    // Gentle pulsing light intensity
    const pulse = 0.8 + Math.sin(time * 2) * 0.2;
    this.light.intensity = this.light.intensity * 0.9 + pulse * 0.1;
  }

  override destroy() {
    super.destroy();
    destroy(this.mesh);
    destroy(this.light);
  }
}
