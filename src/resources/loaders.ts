import type { Texture } from "pixi.js";
import { Assets } from "pixi.js";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 * Base class for resource loaders
 */
abstract class BaseLoader<T> {
  abstract load(path: string): Promise<T>;
}

/**
 * Loader for 3D models (GLTF/GLB)
 */
export class ModelLoader extends BaseLoader<GLTF> {
  private readonly loader = new GLTFLoader();

  async load(path: string): Promise<GLTF> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        (gltf) => resolve(gltf),
        undefined,
        (error) => reject(error),
      );
    });
  }
}

/**
 * Loader for 2D textures using Pixi.js Assets
 */
export class TextureLoader extends BaseLoader<Texture> {
  async load(path: string): Promise<Texture> {
    return await Assets.load(path);
  }
}

/**
 * Factory for creating loaders based on resource type
 */
const loaders = {
  model: new ModelLoader(),
  texture: new TextureLoader(),
} as const;

export function getLoader<T extends keyof typeof loaders>(type: T): (typeof loaders)[T] {
  return loaders[type];
}
