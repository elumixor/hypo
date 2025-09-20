import type { SceneConfig } from "./scene-config.types";

/**
 * Scene configuration loader and manager
 */
export class SceneConfigService {
  private readonly configCache = new Map<string, SceneConfig>();

  /**
   * Load a scene configuration by name
   */
  async loadConfig(configName: string): Promise<SceneConfig> {
    // Check cache first
    if (this.configCache.has(configName)) {
      return this.configCache.get(configName)!;
    }

    // Load configuration - for now we support the default one
    let config: SceneConfig;
    
    switch (configName) {
      case "default-combat":
        const { defaultCombatSceneConfig } = await import("./default-combat-scene.config");
        config = defaultCombatSceneConfig;
        break;
      default:
        throw new Error(`Unknown scene configuration: ${configName}`);
    }

    // Cache the configuration
    this.configCache.set(configName, config);
    return config;
  }

  /**
   * Get a cached configuration without loading
   */
  getCachedConfig(configName: string): SceneConfig | undefined {
    return this.configCache.get(configName);
  }

  /**
   * Preload configurations for faster access
   */
  async preloadConfigs(configNames: string[]): Promise<void> {
    await Promise.all(configNames.map(name => this.loadConfig(name)));
  }

  /**
   * Clear the configuration cache
   */
  clearCache(): void {
    this.configCache.clear();
  }
}

// Export a singleton instance
export const sceneConfigService = new SceneConfigService();