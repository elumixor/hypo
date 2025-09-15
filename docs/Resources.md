# Resource Management System

> **Type-safe asset loading and retrieval system for the HYPO game**

## Overview

This document describes the comprehensive resource management system implemented for the HYPO game project. The system provides type-safe loading and retrieval of game assets with a fluent API, supporting both 3D models and 2D textures.

## Architecture

### File Structure

```
public/assets/                 # Public assets (Vite accessible)
├── models/
│   ├── Drone.glb             # Player/enemy model
│   ├── helios.glb            # Helios character model
│   ├── portal-round.glb      # Round portal model
│   └── rocks.glb             # Environment rocks model
└── textures/
    ├── kira.png              # Kira character texture
    ├── helios.jpg            # Helios character texture
    ├── lucy.jpg              # Lucy character texture
    ├── darius-concept.png    # Darius concept art
    ├── iris-concept.png      # Iris concept art
    └── kai-concept.png       # Kai concept art

src/
├── assets/
│   └── gameResources.ts      # Pre-configured game resources
└── resources/
    ├── index.ts              # Main exports
    ├── Resources.ts          # Core resource management class
    ├── loaders.ts            # Asset loaders for different file types
    └── types.ts              # TypeScript type definitions

scripts/                      # Development tools
└── asset-viewer-server.ts    # Single-command asset grid viewer
```

## Quick Start

### Basic Usage

```typescript
import { Resources } from "../resources";

// Create resources with fluent API
const resources = new Resources()
  .add("Drone.glb") // Automatically typed as 3D model (GLTF)
  .add("kira.png"); // Automatically typed as 2D texture

// Load all resources
await resources.loadAll((progress) => {
  console.log(`Loading: ${progress.percentage}%`);
});

// Use resources with full type safety
const droneModel = resources.get("Drone"); // Type: GLTF
const kiraTexture = resources.get("kira"); // Type: Texture

// Use in Three.js
scene.add(droneModel.scene);

// Use in Pixi.js
const sprite = new PIXI.Sprite(kiraTexture);
```

### Pre-configured Game Resources

```typescript
import { gameResources, initializeResources } from "../assets/gameResources";

// Initialize all game resources
await initializeResources((progress) => {
  console.log(`${progress.current}: ${progress.percentage}%`);
});

// Use resources immediately
const drone = gameResources.get("Drone");
const texture = gameResources.get("kira");
```

## Features

### Type Safety

The system provides complete type safety through TypeScript's type system:

- **File Extension Mapping**: Automatically maps file extensions to resource types
- **Return Type Inference**: `resources.get()` returns the correct type based on filename
- **Compile-time Validation**: TypeScript validates resource names at compile time

### Fluent API

Chain resource additions for a clean, readable syntax:

```typescript
const resources = new Resources()
  .add("model1.glb")
  .add("texture1.png")
  .add("model2.gltf")
  .add("texture2.jpg");
```

### Progress Tracking

Monitor loading progress with detailed callbacks:

```typescript
await resources.loadAll((progress) => {
  console.log(`Progress: ${progress.percentage}%`);
  console.log(`Files: ${progress.loaded}/${progress.total}`);
  if (progress.current) {
    console.log(`Currently loading: ${progress.current}`);
  }
});
```

### Error Handling

Graceful fallback system for missing or failed resources:

```typescript
// Player.ts - automatically falls back to box geometry if model fails
private createPlayerMesh(): THREE.Mesh {
  try {
    const droneModel = gameResources.get("Drone");
    // Use loaded model...
  } catch (error) {
    console.warn("Using fallback geometry:", error);
    // Return simple box mesh
  }
}
```

## Supported File Types

| Extension | Type      | Loader          | Three.js | Pixi.js |
| --------- | --------- | --------------- | -------- | ------- |
| `.glb`    | `model`   | `GLTFLoader`    | ✅       | ❌      |
| `.gltf`   | `model`   | `GLTFLoader`    | ✅       | ❌      |
| `.png`    | `texture` | `Assets.load()` | ⚠️       | ✅      |
| `.jpg`    | `texture` | `Assets.load()` | ⚠️       | ✅      |
| `.jpeg`   | `texture` | `Assets.load()` | ⚠️       | ✅      |
| `.webp`   | `texture` | `Assets.load()` | ⚠️       | ✅      |

> ⚠️ Textures loaded via Pixi.js can be converted for Three.js use if needed.

## Integration Examples

### Player Class Integration

```typescript
// Player.ts
import { gameResources } from "../assets/gameResources";

export class Player {
  private createPlayerMesh(): THREE.Mesh {
    try {
      const droneModel = gameResources.get("Drone");
      const playerModel = droneModel.scene.clone();

      // Extract geometry from loaded model
      let meshFromModel: THREE.Mesh | undefined;
      playerModel.traverse((child) => {
        if (child instanceof THREE.Mesh && !meshFromModel) {
          meshFromModel = child;
        }
      });

      if (meshFromModel) {
        const geometry = meshFromModel.geometry.clone();
        const material = new THREE.MeshStandardMaterial({
          color: "#4ec9ff", // Player blue
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(0.5, 0.5, 0.5);
        return mesh;
      }
    } catch (error) {
      // Fallback to simple geometry
      const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const material = new THREE.MeshStandardMaterial({
        color: "#4ec9ff",
      });
      return new THREE.Mesh(geometry, material);
    }
  }
}
```

### Enemy Class Integration

```typescript
// Enemy.ts
import { gameResources } from "../assets/gameResources";

export class Enemy {
  private createEnemyMesh(config: EnemyConfig): THREE.Mesh {
    try {
      const droneModel = gameResources.get("Drone");
      // Similar implementation but with enemy colors/scaling
      const material = new THREE.MeshStandardMaterial({
        color: config.color ?? "#ff2b2b", // Enemy red
      });
      // ... rest of implementation
    } catch (error) {
      // Fallback implementation
    }
  }
}
```

## Advanced Configuration

### Custom Base Path

```typescript
const resources = new Resources("/custom/asset/path")
  .add("model.glb")
  .add("texture.png");
```

### Resource Information

```typescript
console.log("Resource names:", resources.names);
console.log("Loading progress:", resources.progress);
console.log("All loaded:", resources.isLoaded);
```

### Adding New File Types

To add support for new file types, extend the type definitions:

```typescript
// types.ts
export interface ExtensionToType {
  ".glb": "model";
  ".gltf": "model";
  ".png": "texture";
  ".jpg": "texture";
  ".jpeg": "texture";
  ".webp": "texture";
  ".ogg": "audio"; // New audio type
  ".mp3": "audio"; // New audio type
}

export interface TypeToResource {
  model: GLTF;
  texture: Texture;
  audio: AudioBuffer; // New audio resource
}
```

Then add the corresponding loader:

```typescript
// loaders.ts
export class AudioLoader extends BaseLoader<AudioBuffer> {
  async load(path: string): Promise<AudioBuffer> {
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new AudioContext();
    return await audioContext.decodeAudioData(arrayBuffer);
  }
}

const loaders = {
  model: new ModelLoader(),
  texture: new TextureLoader(),
  audio: new AudioLoader(), // Add new loader
} as const;
```

## Testing and Development Tools

### Asset Inspection Tool

Run the standalone asset viewer (no Vite needed) to quickly preview all models & textures:

```bash
bun run asset-viewer
```

Features:

- Auto-scans `public/assets` on each reload
- Grid thumbnails (textures show dimensions, models auto-centered & rotated)
- Uses local `three` via import map, falls back to CDN if unavailable

## Debugging

Enable detailed logging by checking the browser console for:

- `✅ Player using Drone.glb model geometry`
- `✅ Enemy using Drone.glb model geometry`
- `⚠️ Could not load Drone model, using fallback`
- Resource loading progress messages

## Performance Considerations

- **Lazy Loading**: Resources are only loaded when `loadAll()` is called
- **Memory Management**: Loaded resources are cached for reuse
- **Asset Optimization**: Use optimized GLB files and compressed textures
- **Progress Feedback**: Provide user feedback during loading

## Contributing

When adding new resources:

1. Place files in appropriate `assets/` subdirectories
2. Add to `gameResources.ts` configuration
3. Update type definitions if needed
4. Test with fallback behavior
5. Document usage examples

---

This resource management system provides a solid foundation for asset management in the HYPO game, with room for future expansion and optimization.
