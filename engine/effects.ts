import {
  BloomEffect,
  ChromaticAberrationEffect,
  DepthOfFieldEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";
import { type Camera, type Scene as ThreeScene, Vector2, type WebGLRenderer } from "three";

export interface EffectsConfig {
  bloom?: {
    enabled: boolean;
    intensity?: number;
    radius?: number;
    luminanceThreshold?: number;
    luminanceSmoothing?: number;
  };
  chromaticAberration?: {
    enabled: boolean;
    offset?: Vector2;
  };
  depthOfField?: {
    enabled: boolean;
    focusDistance?: number;
    focalLength?: number;
    bokehScale?: number;
  };
}

export class Effects {
  private readonly composer: EffectComposer;
  private readonly passes: EffectPass[] = [];

  constructor(
    scene: ThreeScene,
    private readonly camera: Camera,
    renderer: WebGLRenderer,
    config: EffectsConfig = {},
  ) {
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, this.camera));

    const effects = [];

    if (config.bloom?.enabled) {
      effects.push(
        new BloomEffect({
          luminanceThreshold: config.bloom.luminanceThreshold ?? 0.9,
          luminanceSmoothing: config.bloom.luminanceSmoothing ?? 0.025,
          intensity: config.bloom.intensity ?? 5,
          radius: config.bloom.radius ?? 2,
        }),
      );
    }

    if (config.chromaticAberration?.enabled) {
      effects.push(
        new ChromaticAberrationEffect({
          offset: config.chromaticAberration.offset ?? new Vector2(0.001, 0.001),
          radialModulation: false,
          modulationOffset: 0.15,
        }),
      );
    }

    if (config.depthOfField?.enabled) {
      effects.push(
        new DepthOfFieldEffect(this.camera, {
          focusDistance: config.depthOfField.focusDistance ?? 0.02,
          focalLength: config.depthOfField.focalLength ?? 0.02,
          bokehScale: config.depthOfField.bokehScale ?? 2.0,
        }),
      );
    }

    if (effects.length > 0) {
      const pass = new EffectPass(this.camera, ...effects);
      this.composer.addPass(pass);
      this.passes.push(pass);
    }
  }

  render(delta: number) {
    this.composer.render(delta);
  }

  resize(width: number, height: number) {
    this.composer.setSize(width, height);
  }

  destroy() {
    for (const pass of this.passes) this.composer.removePass(pass);
    this.composer.dispose();
  }
}
