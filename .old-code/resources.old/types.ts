export interface ResourceEntry<T = string> {
  filename: T;
  loaded?: boolean;
}

export interface LoadingProgress {
  percentage: number;
  loaded: number;
  total: number;
}

export type RemoveExtension<T extends string> = T extends `${infer Name}.${string}` ? Name : T;

export type ExtensionToType = {
  ".glb": any;
  ".gltf": any;
  ".png": any;
  ".jpg": any;
  ".jpeg": any;
  ".webp": any;
  ".mp3": any;
  ".wav": any;
  ".ogg": any;
};

export type GetResourceType<T extends string> = T extends `${string}${infer Ext}`
  ? Ext extends keyof ExtensionToType
    ? ExtensionToType[Ext]
    : any
  : any;

export type GetResourceObject<T> = T extends Record<string, ResourceEntry<infer U>>
  ? { [K in keyof T]: GetResourceType<T[K]["filename"]> }
  : Record<string, never>;
