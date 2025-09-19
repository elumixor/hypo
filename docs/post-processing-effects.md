# Post-Processing Effects

## Overview

The HYPO game now includes a post-processing effects system built with the `postprocessing` library. This system provides:

- **Bloom Effect**: Adds glowing highlights to bright areas
- **Chromatic Aberration**: Simulates lens distortion with color fringing
- **Depth of Field**: Blurs objects based on distance from focus point
- **Runtime Toggle/Configuration**: All effects can be toggled and configured at runtime

## Architecture

### Effects Class (`src/rendering/effects.ts`)

The `Effects` class wraps the postprocessing library's EffectComposer and provides:

- Configurable effects through `EffectsConfig` interface
- Runtime toggle/reconfiguration methods
- Proper cleanup and disposal
- Integration with the game's resize system

### Scene Integration (`engine/core/scene.ts`)

- Scenes can optionally enable effects by calling `configureEffects()` in their constructor
- Effects are automatically initialized during scene init
- Game class automatically uses effects rendering when available

### Combat Scene Implementation

The `CombatScene` enables effects by default with:
- Bloom effect (intensity: 1.5)
- Chromatic aberration (subtle color fringing)
- Depth of field and motion blur (disabled by default, can be enabled at runtime)

## Usage

### Configuring Effects in a Scene

```typescript
class MyScene extends Scene {
  constructor() {
    super();
    
    this.configureEffects({
      bloom: {
        enabled: true,
        intensity: 1.5,
        radius: 0.4
      },
      chromaticAberration: {
        enabled: true,
        offset: new Vector2(0.001, 0.001)
      },
      depthOfField: {
        enabled: false,
        focusDistance: 0.02,
        focalLength: 0.02,
        bokehScale: 2.0
      }
    });
  }
}
```

### Runtime Control

```typescript
// Toggle effects
scene.toggleBloom();
scene.toggleChromaticAberration();
scene.toggleDepthOfField();

// Configure effect parameters
scene.setBloomIntensity(2.0);

// Direct access to effects instance
const effects = scene.getEffects();
if (effects) {
  effects.enableEffect('bloom', false);
  effects.updateConfig(newConfig);
}
```

## Development UI

In development mode, the combat scene includes an `EffectsControlWidget` with buttons to:
- Toggle Bloom
- Toggle Chromatic Aberration (CA)
- Toggle Depth of Field (DOF)
- Increase/Decrease Bloom intensity

## Technical Details

- Uses postprocessing library's EffectComposer for render passes
- Effects are only applied when explicitly configured by scenes
- Proper disposal prevents memory leaks
- Integrates with game's resize system
- Type-safe configuration interface
- Minimal performance impact when effects are disabled

## Future Enhancements

Additional effects can be easily added by:
1. Extending the `EffectsConfig` interface
2. Adding setup logic in `setupEffects()`
3. Adding corresponding runtime control methods