import * as THREE from "three";

export class CameraShake {
  private intensity = 0;
  private duration = 0;
  private elapsed = 0;
  private basePosition = new THREE.Vector3();
  private offset = new THREE.Vector3();

  constructor(private camera: THREE.Camera) {}

  shake(intensity: number, duration: number) {
    this.intensity = Math.max(this.intensity, intensity);
    this.duration = Math.max(this.duration, duration);
    this.elapsed = 0;
  }

  update(dt: number) {
    if (this.duration <= 0) return;

    this.elapsed += dt;
    
    if (this.elapsed >= this.duration) {
      this.duration = 0;
      this.intensity = 0;
      this.offset.set(0, 0, 0);
      return;
    }

    // Decay intensity over time
    const progress = this.elapsed / this.duration;
    const currentIntensity = this.intensity * (1 - progress);

    // Generate random shake offset
    this.offset.set(
      (Math.random() - 0.5) * currentIntensity,
      (Math.random() - 0.5) * currentIntensity,
      (Math.random() - 0.5) * currentIntensity * 0.5
    );
  }

  apply(basePosition: THREE.Vector3) {
    this.basePosition.copy(basePosition);
    this.camera.position.copy(basePosition).add(this.offset);
  }

  isActive(): boolean {
    return this.duration > 0;
  }
}