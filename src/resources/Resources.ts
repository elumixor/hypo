import { getLoader } from "./loaders";
import type {
  ExtensionToType,
  GetResourceObject,
  GetResourceType,
  LoadingProgress,
  RemoveExtension,
  ResourceEntry,
} from "./types";

/**
 * Type-safe resource management system with fluent API
 */
export class Resources<TResources extends Record<string, ResourceEntry> = Record<string, never>> {
  constructor(
    private readonly basePath = "/hypo/assets",
    private readonly resources: TResources = {} as TResources,
  ) {}

  /**
   * Add a resource to be loaded
   * @param filename The filename with extension (e.g., 'Drone.glb', 'iris.png')
   * @returns A new Resources instance with the added resource
   */
  add<T extends string>(
    filename: T,
  ): Resources<
    TResources & {
      [K in RemoveExtension<T>]: ResourceEntry<T>;
    }
  > {
    const name = this.getNameFromFilename(filename) as RemoveExtension<T>;
    const type = this.getTypeFromFilename(filename) as GetResourceType<T>;
    const path = this.getResourcePath(filename, type);

    const newEntry: ResourceEntry<T> = {
      name,
      filename,
      type,
      path,
      loaded: false,
    };

    const newResources = {
      ...this.resources,
      [name]: newEntry,
    } as TResources & {
      [K in RemoveExtension<T>]: ResourceEntry<T>;
    };

    return new Resources(this.basePath, newResources);
  }

  /**
   * Get a loaded resource by name (without extension)
   * @param name The resource name (e.g., 'Drone', 'iris')
   * @returns The loaded resource object
   */
  get<K extends keyof TResources>(
    name: K,
  ): TResources[K] extends ResourceEntry<infer T> ? GetResourceObject<T> : never {
    const entry = this.resources[name];

    if (!entry) {
      throw new Error(`Resource '${String(name)}' not found. Did you add it to the resources?`);
    }

    if (!entry.loaded || !entry.resource) {
      throw new Error(`Resource '${String(name)}' not loaded yet. Call loadAll() first.`);
    }

    return entry.resource as TResources[K] extends ResourceEntry<infer T> ? GetResourceObject<T> : never;
  }

  /**
   * Load all added resources
   * @param onProgress Optional progress callback
   */
  async loadAll(onProgress?: (progress: LoadingProgress) => void): Promise<void> {
    const entries = Object.values(this.resources) as ResourceEntry[];
    const total = entries.length;
    let loaded = 0;

    const updateProgress = (current?: string) => {
      const progress: LoadingProgress = {
        total,
        loaded,
        current,
        percentage: total > 0 ? (loaded / total) * 100 : 100,
      };
      onProgress?.(progress);
    };

    updateProgress();

    for (const entry of entries) {
      updateProgress(entry.filename);

      try {
        let resource: unknown;

        if (entry.type === "model") {
          const loader = getLoader("model");
          resource = await loader.load(entry.path);
        } else if (entry.type === "texture") {
          const loader = getLoader("texture");
          resource = await loader.load(entry.path);
        } else {
          throw new Error(`Unknown resource type: ${entry.type}`);
        }

        // Type-safe assignment using object spread
        Object.assign(entry, {
          resource,
          loaded: true,
        });

        loaded++;
        updateProgress();
      } catch (error) {
        throw new Error(`Failed to load resource '${entry.filename}': ${error}`);
      }
    }
  }

  /**
   * Check if all resources are loaded
   */
  get isLoaded(): boolean {
    return Object.values(this.resources).every((entry) => entry.loaded);
  }

  /**
   * Get loading progress information
   */
  get progress(): LoadingProgress {
    const entries = Object.values(this.resources);
    const total = entries.length;
    const loaded = entries.filter((entry) => entry.loaded).length;

    return {
      total,
      loaded,
      percentage: total > 0 ? (loaded / total) * 100 : 100,
    };
  }

  /**
   * Get list of all resource names
   */
  get names(): (keyof TResources)[] {
    return Object.keys(this.resources);
  }

  private getNameFromFilename<T extends string>(filename: T): RemoveExtension<T> {
    const dotIndex = filename.lastIndexOf(".");
    return (dotIndex > 0 ? filename.substring(0, dotIndex) : filename) as RemoveExtension<T>;
  }

  private getTypeFromFilename<T extends string>(filename: T): GetResourceType<T> {
    const extension = filename.substring(filename.lastIndexOf(".")) as keyof ExtensionToType;
    const extensionMap: ExtensionToType = {
      ".glb": "model",
      ".gltf": "model",
      ".png": "texture",
      ".jpg": "texture",
      ".jpeg": "texture",
      ".webp": "texture",
    };

    const type = extensionMap[extension];
    if (!type) {
      throw new Error(`Unsupported file extension: ${extension}`);
    }

    return type as GetResourceType<T>;
  }

  private getResourcePath(filename: string, type: string): string {
    const typeToFolder = {
      model: "models",
      texture: "textures",
    };

    const folder = typeToFolder[type as keyof typeof typeToFolder];
    if (!folder) {
      throw new Error(`No folder mapping for resource type: ${type}`);
    }

    return `${this.basePath}/${folder}/${filename}`;
  }
}
