import type { Texture } from "pixi.js";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";

/**
 * Supported resource types based on file extensions
 */
export type ResourceType = "model" | "texture";

/**
 * Map file extensions to resource types
 */
export interface ExtensionToType {
  ".glb": "model";
  ".gltf": "model";
  ".png": "texture";
  ".jpg": "texture";
  ".jpeg": "texture";
  ".webp": "texture";
}

/**
 * Map resource types to their loaded objects
 */
export interface TypeToResource {
  model: GLTF;
  texture: Texture;
}

/**
 * Extract file extension from filename
 */
export type GetExtension<T extends string> = T extends `${string}${infer Ext}`
  ? Ext extends keyof ExtensionToType
    ? Ext
    : never
  : never;

/**
 * Get resource type from filename
 */
export type GetResourceType<T extends string> = GetExtension<T> extends keyof ExtensionToType
  ? ExtensionToType[GetExtension<T>]
  : never;

/**
 * Get the loaded resource object type from filename
 */
export type GetResourceObject<T extends string> = GetResourceType<T> extends keyof TypeToResource
  ? TypeToResource[GetResourceType<T>]
  : never;

/**
 * Extract filename without extension
 */
export type RemoveExtension<T extends string> = T extends `${infer Name}.${string}` ? Name : T;

/**
 * Resource entry with metadata
 */
export interface ResourceEntry<T extends string = string> {
  name: RemoveExtension<T>;
  filename: T;
  type: GetResourceType<T>;
  path: string;
  loaded: boolean;
  resource?: GetResourceObject<T>;
}

/**
 * Loading progress information
 */
export interface LoadingProgress {
  total: number;
  loaded: number;
  current?: string;
  percentage: number;
}
