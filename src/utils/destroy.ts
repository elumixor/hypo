/**
 * Utility functions for destroying resources and objects
 */

// biome-ignore lint/suspicious/noExplicitAny: Three.js objects don't have consistent typing
export function destroyThreeObject(object: any) {
  if (!object) return;

  if (object.geometry) object.geometry.dispose();
  if (object.material) {
    if (Array.isArray(object.material)) {
      for (const material of object.material) {
        material.dispose();
      }
    } else {
      object.material.dispose();
    }
  }

  if (object.parent) object.parent.remove(object);
}
