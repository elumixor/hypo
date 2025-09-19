import { Widget } from "@engine";
import type { ResizeData } from "@engine/core/game";
import { Button } from "ui/button";
import type { CombatScene } from "../combat.scene";

export class EffectsControlWidget extends Widget {
  private readonly toggleBloomButton = new Button("Toggle Bloom");
  private readonly toggleCAButton = new Button("Toggle CA");
  private readonly toggleDOFButton = new Button("Toggle DOF");
  private readonly increaseBloomButton = new Button("Bloom +");
  private readonly decreaseBloomButton = new Button("Bloom -");

  private bloomIntensity = 1.5;

  override async init() {
    await super.init();

    const scene = this.scene as CombatScene;

    // Position buttons in top-right corner
    this.toggleBloomButton.position.set(0, 0);
    this.toggleCAButton.position.set(0, 50);
    this.toggleDOFButton.position.set(0, 100);
    this.increaseBloomButton.position.set(0, 150);
    this.decreaseBloomButton.position.set(0, 200);

    // Add buttons to widget
    this.container.addChild(
      this.toggleBloomButton,
      this.toggleCAButton,
      this.toggleDOFButton,
      this.increaseBloomButton,
      this.decreaseBloomButton
    );

    // Set up event handlers
    this.toggleBloomButton.clicked.subscribe(() => scene.toggleBloom());
    this.toggleCAButton.clicked.subscribe(() => scene.toggleChromaticAberration());
    this.toggleDOFButton.clicked.subscribe(() => scene.toggleDepthOfField());

    this.increaseBloomButton.clicked.subscribe(() => {
      this.bloomIntensity = Math.min(3.0, this.bloomIntensity + 0.2);
      scene.setBloomIntensity(this.bloomIntensity);
    });

    this.decreaseBloomButton.clicked.subscribe(() => {
      this.bloomIntensity = Math.max(0.1, this.bloomIntensity - 0.2);
      scene.setBloomIntensity(this.bloomIntensity);
    });

    // Subscribe to resize events to position the widget
    this.game.resized.subscribe(this.resize);
    
    // Initial positioning
    this.resize({
      width: window.innerWidth,
      height: window.innerHeight,
      aspect: window.innerWidth / window.innerHeight,
    });
  }

  private readonly resize = ({ width, height }: ResizeData) => {
    // Position at top-right with 15px margin
    this.container.position.set(width / 2 - 120, -height / 2 + 15);
  };

  override destroy() {
    // Clean up resize subscription
    this.game.resized.unsubscribe(this.resize);
    super.destroy();
  }
}