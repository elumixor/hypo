import { EventEmitter } from "@elumixor/frontils";
import * as THREE from "three";
import { Component } from "./Component";

export interface ShieldConfig {
  radius: number;
  color?: string;
  opacity?: number;
  emissiveColor?: string;
}

/**
 * Component for handling shield mechanics (blocking projectiles, visual effects)
 */
export class ShieldComponent extends Component {
  private readonly _radius: number;
  private readonly _color: string;
  private readonly _opacity: number;
  private readonly _emissiveColor: string;

  private _isActive = false;
  private _shieldMesh?: THREE.Mesh;

  // Events
  readonly onShieldActivated = new EventEmitter();
  readonly onShieldDeactivated = new EventEmitter();
  readonly onShieldBlocked = new EventEmitter<{ damage: number; position: THREE.Vector3 }>();

  constructor(config: ShieldConfig) {
    super();
    this._radius = config.radius;
    this._color = config.color ?? "#6cf";
    this._opacity = config.opacity ?? 0.25;
    this._emissiveColor = config.emissiveColor ?? "#58b";
  }

  /**
   * Get shield radius
   */
  get radius(): number {
    return this._radius;
  }

  /**
   * Check if shield is active
   */
  get isActive(): boolean {
    return this._isActive;
  }

  /**
   * Activate the shield
   */
  activate() {
    if (this._isActive || !this.enabled) return;

    this._isActive = true;
    if (this._shieldMesh) {
      this._shieldMesh.visible = true;
    }

    this.onShieldActivated.emit();
    log("Shield", "Activated");
  }

  /**
   * Deactivate the shield
   */
  deactivate() {
    if (!this._isActive) return;

    this._isActive = false;
    if (this._shieldMesh) {
      this._shieldMesh.visible = false;
    }

    this.onShieldDeactivated.emit();
    log("Shield", "Deactivated");
  }

  /**
   * Toggle shield state
   */
  toggle() {
    if (this._isActive) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  /**
   * Check if a point is within the shield radius
   */
  isPointInShield(point: THREE.Vector3): boolean {
    if (!this._isActive || !this.entity) return false;

    return point.distanceTo(this.entity.position) <= this._radius;
  }

  /**
   * Handle a projectile collision with the shield
   */
  blockProjectile(projectilePosition: THREE.Vector3): boolean {
    if (!this.isPointInShield(projectilePosition)) return false;

    this.onShieldBlocked.emit({ damage: 0, position: projectilePosition.clone() });

    // Could add visual effects here (sparks, etc.)
    this.createBlockEffect(projectilePosition);

    return true;
  }

  protected override onAttach() {
    this.createShieldMesh();
  }

  protected override onDetach() {
    this.destroyShieldMesh();
  }

  protected override onDestroy() {
    this.destroyShieldMesh();
  }

  private createShieldMesh() {
    if (!this.entity || this._shieldMesh) return;

    const geometry = new THREE.SphereGeometry(this._radius, 16, 12);
    const material = new THREE.MeshStandardMaterial({
      color: this._color,
      transparent: true,
      opacity: this._opacity,
      depthWrite: false,
      emissive: this._emissiveColor,
      emissiveIntensity: 0.1,
    });

    this._shieldMesh = new THREE.Mesh(geometry, material);
    this._shieldMesh.visible = this._isActive;

    this.entity.add(this._shieldMesh);
  }

  private destroyShieldMesh() {
    if (!this._shieldMesh || !this.entity) return;

    this.entity.remove(this._shieldMesh);

    // Dispose of geometry and material
    this._shieldMesh.geometry.dispose();
    const material = this._shieldMesh.material as THREE.Material;
    material.dispose();

    this._shieldMesh = undefined;
  }

  private createBlockEffect(position: THREE.Vector3) {
    // Create a temporary visual effect at the block position
    // This is a simple example - could be much more elaborate
    if (!this.entity?.parent) return;

    const effectGeometry = new THREE.SphereGeometry(0.1, 8, 6);
    const effectMaterial = new THREE.MeshBasicMaterial({
      color: "#fff",
      transparent: true,
    });

    const effectMesh = new THREE.Mesh(effectGeometry, effectMaterial);
    effectMesh.position.copy(position);

    this.entity.parent.add(effectMesh);

    // Animate the effect (could use GSAP here for more complex animations)
    let opacity = 1;
    let scale = 0.1;

    const animate = () => {
      opacity -= 0.05;
      scale += 0.02;

      effectMaterial.opacity = opacity;
      effectMesh.scale.setScalar(scale);

      if (opacity <= 0) {
        this.entity?.parent?.remove(effectMesh);
        effectGeometry.dispose();
        effectMaterial.dispose();
      } else {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }
}
