import type { Vector3 } from "three";
import type { ColliderBehavior } from "./collider.behavior";

/**
 * 2D spatial grid for efficient collision detection.
 * Uses only X and Z coordinates, ignoring the Y axis.
 */
export class SpatialGrid {
  private readonly grid: Map<string, Set<ColliderBehavior>> = new Map();
  private readonly cellSize: number;

  constructor(cellSize = 10) {
    this.cellSize = cellSize;
  }

  /**
   * Get all cell keys that a collider with given position and radius might occupy
   */
  private getCellKeysForCollider(position: Vector3, radius: number): string[] {
    const keys: string[] = [];
    const x = position.x;
    const z = position.z;

    // Calculate the bounds of cells this collider might occupy
    const minX = x - radius;
    const maxX = x + radius;
    const minZ = z - radius;
    const maxZ = z + radius;

    const minCellX = Math.floor(minX / this.cellSize);
    const maxCellX = Math.floor(maxX / this.cellSize);
    const minCellZ = Math.floor(minZ / this.cellSize);
    const maxCellZ = Math.floor(maxZ / this.cellSize);

    for (let cellX = minCellX; cellX <= maxCellX; cellX++) {
      for (let cellZ = minCellZ; cellZ <= maxCellZ; cellZ++) {
        keys.push(`${cellX},${cellZ}`);
      }
    }

    return keys;
  }

  /**
   * Insert a collider into the spatial grid
   */
  insert(collider: ColliderBehavior): void {
    const position = collider.transform.position;
    const radius = collider.radius * collider.transformScale;
    const cellKeys = this.getCellKeysForCollider(position, radius);

    for (const key of cellKeys) {
      if (!this.grid.has(key)) {
        this.grid.set(key, new Set());
      }
      this.grid.get(key)?.add(collider);
    }
  }

  /**
   * Remove a collider from the spatial grid
   */
  remove(collider: ColliderBehavior): void {
    for (const [_, colliders] of this.grid) {
      colliders.delete(collider);
    }
  }

  /**
   * Get potential collision candidates for a given collider
   */
  query(collider: ColliderBehavior): Set<ColliderBehavior> {
    const position = collider.transform.position;
    const radius = collider.radius * collider.transformScale;
    const cellKeys = this.getCellKeysForCollider(position, radius);
    const candidates = new Set<ColliderBehavior>();

    for (const key of cellKeys) {
      const colliders = this.grid.get(key);
      if (colliders) {
        for (const candidate of colliders) {
          if (candidate !== collider) {
            candidates.add(candidate);
          }
        }
      }
    }

    return candidates;
  }

  /**
   * Clear the entire grid
   */
  clear(): void {
    this.grid.clear();
  }

  /**
   * Get debug information about the grid
   */
  getDebugInfo(): { totalCells: number; totalColliders: number } {
    const totalCells = this.grid.size;
    let totalColliders = 0;

    for (const [_, colliders] of this.grid) {
      totalColliders += colliders.size;
    }

    return { totalCells, totalColliders };
  }
}
