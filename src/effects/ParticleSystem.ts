import * as THREE from "three";

export interface ParticleOptions {
  count?: number;
  life?: number;
  speed?: number;
  size?: number;
  color?: THREE.Color;
  spread?: number;
  gravity?: number;
}

export class Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;

  constructor(position: THREE.Vector3, velocity: THREE.Vector3, life: number, size: number) {
    this.position = position.clone();
    this.velocity = velocity.clone();
    this.life = life;
    this.maxLife = life;
    this.size = size;
  }

  update(dt: number, gravity = -9.8) {
    this.life -= dt;
    this.velocity.y += gravity * dt;
    this.position.addScaledVector(this.velocity, dt);
    return this.life > 0;
  }

  getAlpha(): number {
    return Math.max(0, this.life / this.maxLife);
  }
}

export class ParticleSystem {
  private readonly particles: Particle[] = [];
  private readonly geometry: THREE.BufferGeometry;
  private readonly material: THREE.PointsMaterial;
  private readonly points: THREE.Points;
  private readonly positions: Float32Array;
  private readonly colors: Float32Array;
  private readonly sizes: Float32Array;

  constructor(
    private readonly scene: THREE.Scene,
    maxParticles = 1000,
  ) {
    this.positions = new Float32Array(maxParticles * 3);
    this.colors = new Float32Array(maxParticles * 3);
    this.sizes = new Float32Array(maxParticles);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute("color", new THREE.BufferAttribute(this.colors, 3));
    this.geometry.setAttribute("size", new THREE.BufferAttribute(this.sizes, 1));

    this.material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      alphaTest: 0.1,
      depthWrite: false,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  emit(origin: THREE.Vector3, options: ParticleOptions = {}) {
    const { count = 10, life = 1.0, speed = 5.0, size = 0.1, spread = Math.PI / 3 } = options;

    for (let i = 0; i < count; i++) {
      // Random direction within spread cone
      const angle = Math.random() * Math.PI * 2;
      const elevation = Math.random() * spread - spread / 2 + Math.PI / 2;

      const velocity = new THREE.Vector3(
        Math.cos(angle) * Math.cos(elevation) * speed,
        Math.sin(elevation) * speed,
        Math.sin(angle) * Math.cos(elevation) * speed,
      );

      // Add some randomness to velocity
      velocity.multiplyScalar(0.5 + Math.random() * 0.5);

      const particle = new Particle(
        origin.clone(),
        velocity,
        life * (0.5 + Math.random() * 0.5),
        size * (0.5 + Math.random() * 0.5),
      );

      this.particles.push(particle);
    }
  }

  update(dt: number) {
    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      if (particle && !particle.update(dt)) {
        this.particles.splice(i, 1);
      }
    }

    // Update geometry
    this.updateGeometry();
  }

  private updateGeometry() {
    const particleCount = Math.min(this.particles.length, this.positions.length / 3);

    for (let i = 0; i < particleCount; i++) {
      const particle = this.particles[i];
      if (!particle) continue;

      const index = i * 3;

      this.positions[index] = particle.position.x;
      this.positions[index + 1] = particle.position.y;
      this.positions[index + 2] = particle.position.z;

      const alpha = particle.getAlpha();
      this.colors[index] = alpha;
      this.colors[index + 1] = alpha;
      this.colors[index + 2] = alpha;

      this.sizes[i] = particle.size * alpha;
    }

    // Clear unused positions
    for (let i = particleCount * 3; i < this.positions.length; i++) {
      this.positions[i] = 0;
    }
    for (let i = particleCount; i < this.sizes.length; i++) {
      this.sizes[i] = 0;
    }

    const positionAttribute = this.geometry.getAttribute("position");
    const colorAttribute = this.geometry.getAttribute("color");
    const sizeAttribute = this.geometry.getAttribute("size");

    if (positionAttribute) positionAttribute.needsUpdate = true;
    if (colorAttribute) colorAttribute.needsUpdate = true;
    if (sizeAttribute) sizeAttribute.needsUpdate = true;
    this.geometry.setDrawRange(0, particleCount);
  }

  dispose() {
    this.scene.remove(this.points);
    this.geometry.dispose();
    this.material.dispose();
  }
}
