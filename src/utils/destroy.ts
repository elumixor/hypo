import { type Material, Mesh, type Object3D } from "three";

export function destroy(obj: Object3D) {
  obj.removeFromParent();

  // Clean up the model
  obj.traverse((child) => {
    if (!(child instanceof Mesh)) return;

    child.geometry?.dispose();

    if (child.material) {
      if (Array.isArray(child.material)) for (const mat of child.material) mat.dispose();
      else (child.material as Material).dispose();
    }
  });
}
