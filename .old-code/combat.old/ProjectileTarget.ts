import type * as THREE from "three";

/**
 * Interface for player-like entities that can be hit by projectiles
 */
export interface ProjectileTarget {
  mesh: THREE.Mesh;
  shieldActive: boolean;
}
