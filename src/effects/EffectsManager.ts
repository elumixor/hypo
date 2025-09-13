import * as THREE from "three";
import { CameraShake } from "./CameraShake";
import { ParticleSystem, type ParticleOptions } from "./ParticleSystem";
import { ScreenFlash } from "./ScreenFlash";

export class EffectsManager {
  private cameraShake: CameraShake;
  private particleSystem: ParticleSystem;
  private screenFlash: ScreenFlash;

  constructor(
    private scene: THREE.Scene,
    private camera: THREE.Camera
  ) {
    this.cameraShake = new CameraShake(camera);
    this.particleSystem = new ParticleSystem(scene);
    this.screenFlash = new ScreenFlash(scene, camera);
  }

  // Camera shake effects
  shakeCamera(intensity: number, duration: number) {
    this.cameraShake.shake(intensity, duration);
  }

  // Particle effects
  emitParticles(position: THREE.Vector3, options?: ParticleOptions) {
    this.particleSystem.emit(position, options);
  }

  // Screen flash effects
  flashScreen(color: THREE.Color, opacity: number, duration: number) {
    this.screenFlash.flash(color, opacity, duration);
  }

  // Preset effects for common gameplay events
  dashEffect(position: THREE.Vector3) {
    this.shakeCamera(0.1, 0.15);
    this.emitParticles(position, {
      count: 15,
      life: 0.8,
      speed: 8,
      size: 0.15,
      color: new THREE.Color(0.3, 0.8, 1.0),
      spread: Math.PI / 2,
    });
  }

  blockEffect(position: THREE.Vector3) {
    this.emitParticles(position, {
      count: 8,
      life: 0.6,
      speed: 4,
      size: 0.12,
      color: new THREE.Color(0.4, 0.7, 1.0),
      spread: Math.PI / 4,
    });
  }

  projectileImpactEffect(position: THREE.Vector3, fromPlayer = false) {
    this.emitParticles(position, {
      count: 12,
      life: 0.5,
      speed: 6,
      size: 0.1,
      color: fromPlayer ? new THREE.Color(1.0, 0.9, 0.3) : new THREE.Color(1.0, 0.3, 0.3),
      spread: Math.PI / 3,
    });
  }

  enemyHitEffect(position: THREE.Vector3) {
    this.emitParticles(position, {
      count: 10,
      life: 0.7,
      speed: 5,
      size: 0.08,
      color: new THREE.Color(1.0, 0.2, 0.2),
      spread: Math.PI / 4,
    });
  }

  playerHitEffect(position: THREE.Vector3) {
    this.shakeCamera(0.3, 0.25);
    this.flashScreen(new THREE.Color(1.0, 0.2, 0.2), 0.3, 0.2);
    this.emitParticles(position, {
      count: 20,
      life: 1.0,
      speed: 7,
      size: 0.12,
      color: new THREE.Color(1.0, 0.0, 0.0),
      spread: Math.PI / 2,
    });
  }

  xpCollectEffect(position: THREE.Vector3) {
    this.emitParticles(position, {
      count: 8,
      life: 0.8,
      speed: 3,
      size: 0.1,
      color: new THREE.Color(0.0, 1.0, 0.2),
      spread: Math.PI / 6,
    });
  }

  update(dt: number, cameraBasePosition?: THREE.Vector3) {
    this.cameraShake.update(dt);
    this.particleSystem.update(dt);
    this.screenFlash.update(dt);

    // Apply camera shake if active and base position provided
    if (this.cameraShake.isActive() && cameraBasePosition) {
      this.cameraShake.apply(cameraBasePosition);
    }
  }

  isShaking(): boolean {
    return this.cameraShake.isActive();
  }

  dispose() {
    this.particleSystem.dispose();
    this.screenFlash.dispose();
  }
}