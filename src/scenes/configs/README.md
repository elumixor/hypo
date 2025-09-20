# Scene Configuration System

This directory contains the new scene configuration system for HYPO, which allows for declarative definition of game levels.

## Overview

The scene configuration system replaces hardcoded scene elements with a flexible, data-driven approach. Scenes are now defined in TypeScript configuration files that specify:

- **Ground**: Size, textures, positioning, and UV tiling
- **Lights**: Ambient, directional, and floating lights with full configuration
- **Obstacles**: Rocks and other static objects with positioning and scaling
- **Spawn Points**: Player, enemy, and portal placement
- **Environment**: Fog, skybox, and post-processing effects

## Key Files

- `scene-config.types.ts` - TypeScript interfaces defining the configuration schema
- `scene-config.service.ts` - Service for loading and caching configurations
- `default-combat-scene.config.ts` - Default combat arena configuration (80x80, 29+ obstacles)
- `index.ts` - Barrel exports for easy importing

## Usage

```typescript
import { sceneConfigService } from "./configs";

// Load a scene configuration
const config = await sceneConfigService.loadConfig("default-combat");

// Use SceneBuilder to construct the scene
const builder = new SceneBuilder(scene);
await builder.buildFromConfig(config);
```

## Default Combat Scene Improvements

The new default configuration creates a much larger and more detailed arena:

- **Ground**: Increased from 50x50 to 80x80 units
- **Obstacles**: 29 strategically placed rocks (vs. ~12 random ones)
- **Lights**: 6 floating light spheres with varied colors and behaviors
- **Spawn Points**: Configured player spawn, portal, and 6 enemy spawn locations
- **Bounds**: Extended world bounds to accommodate the larger arena

## Benefits

1. **Declarative**: Scene layouts are defined in data, not code
2. **Flexible**: Easy to create multiple scene variants
3. **Maintainable**: Changes don't require code modifications
4. **Extensible**: New object types can be added easily
5. **Reusable**: Configurations can be shared between different scenes

## Future Extensions

- Level editor integration
- Procedural generation using configuration templates
- Multiple biome/world configurations
- Dynamic obstacle and enemy configurations based on difficulty