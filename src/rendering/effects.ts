import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  ChromaticAberrationEffect,
  DepthOfFieldEffect,
} from "postprocessing";
import * as THREE from "three";

export interface EffectsConfig {
  bloom?: {
    enabled: boolean;
    intensity?: number;
    radius?: number;
  };
  chromaticAberration?: {
    enabled: boolean;
    offset?: THREE.Vector2;
  };
  depthOfField?: {
    enabled: boolean;
    focusDistance?: number;
    focalLength?: number;
    bokehScale?: number;
  };
}

export class Effects {
  private composer: EffectComposer;
  private passes: EffectPass[] = [];
  private config: EffectsConfig;

  constructor(
    scene: THREE.Scene,
    private camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
    config: EffectsConfig = {}
  ) {
    this.config = { ...config };
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, this.camera));
    this.setupEffects(config);
  }

  private setupEffects(config: EffectsConfig) {
    const effects = [];

    if (config.bloom?.enabled) {
      effects.push(
        new BloomEffect({
          intensity: config.bloom.intensity ?? 1.2,
          radius: config.bloom.radius ?? 0.4,
        })
      );
    }

    if (config.chromaticAberration?.enabled) {
      effects.push(
        new ChromaticAberrationEffect({
          offset: config.chromaticAberration.offset ?? new THREE.Vector2(0.001, 0.001),
          radialModulation: false,
          modulationOffset: 0.15,
        })
      );
    }

    if (config.depthOfField?.enabled) {
      effects.push(
        new DepthOfFieldEffect(this.camera, {
          focusDistance: config.depthOfField.focusDistance ?? 0.02,
          focalLength: config.depthOfField.focalLength ?? 0.02,
          bokehScale: config.depthOfField.bokehScale ?? 2.0,
        })
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

  getComposer() {
    return this.composer;
  }

  // Runtime configuration methods
  updateConfig(newConfig: EffectsConfig) {
    // Remove existing effect passes
    for (const pass of this.passes) {
      this.composer.removePass(pass);
    }
    this.passes = [];

    // Update config and recreate effects
    this.config = { ...this.config, ...newConfig };
    this.setupEffects(this.config);
  }

  enableEffect(effectName: keyof EffectsConfig, enabled: boolean) {
    if (this.config[effectName]) {
      this.config[effectName]!.enabled = enabled;
      this.updateConfig(this.config);
    }
  }

  setBloomIntensity(intensity: number) {
    if (this.config.bloom) {
      this.config.bloom.intensity = intensity;
      this.updateConfig(this.config);
    }
  }

  setChromaticAberrationOffset(offset: THREE.Vector2) {
    if (this.config.chromaticAberration) {
      this.config.chromaticAberration.offset = offset;
      this.updateConfig(this.config);
    }
  }

  setDepthOfFieldFocus(focusDistance: number, focalLength?: number) {
    if (this.config.depthOfField) {
      this.config.depthOfField.focusDistance = focusDistance;
      if (focalLength !== undefined) {
        this.config.depthOfField.focalLength = focalLength;
      }
      this.updateConfig(this.config);
    }
  }

  getConfig(): EffectsConfig {
    return { ...this.config };
  }

  destroy() {
    for (const pass of this.passes) {
      this.composer.removePass(pass);
    }
    this.passes = [];
    this.composer.dispose();
  }
}