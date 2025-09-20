import { Service } from "@engine";
import { gsap } from "gsap";
import { Text } from "troika-three-text";
import { CombatEventsService, type DamageEvent } from "./combat-events.service";

// Reworked to use troika-3d-text for better performance and WebGL-rendered text
export class DamageTextService extends Service {
  private readonly damageTexts: { text: Text; timeline: gsap.core.Timeline }[] = [];
  private readonly combatEvents = this.require(CombatEventsService);

  // Enable tick updates
  protected override _enabled = true;

  override async init() {
    await super.init();

    // Subscribe to damage events
    this.on(this.combatEvents.damageDealt, this.showDamageText.bind(this));
  }

  private showDamageText({ damage, position }: DamageEvent) {
    // Create troika-3d-text Text object
    const text = new Text();

    // Configure text properties
    text.text = `-${damage}`;
    text.fontSize = 0.3;
    text.color = 0xff6b6b; // Red color for damage
    text.fontWeight = "bold";
    text.textAlign = "center";
    text.anchorX = "center";
    text.anchorY = "middle";

    // Position the text above the entity
    text.position.copy(position);
    text.position.y += 1.5;

    // Add slight random offset to prevent overlap
    text.position.x += (Math.random() - 0.5) * 0.3;
    text.position.z += (Math.random() - 0.5) * 0.3;

    // Make the text always face the camera (billboard effect)
    if (this.scene) {
      text.lookAt(this.scene.camera.position);
      text.rotation.x = 0;
      text.rotation.z = 0;
    }

    // Update the text rendering
    text.sync();

    // Add to scene
    if (this.scene) {
      this.scene.sceneRoot.add(text);
    }

    // Create animation with GSAP
    const timeline = gsap.timeline();
    const animationData = {
      y: position.y + 1.5,
      scale: 1,
      opacity: 1,
    };

    timeline
      .to(animationData, {
        duration: 0.15,
        y: position.y + 2.5,
        scale: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          text.position.y = animationData.y;
          text.scale.setScalar(animationData.scale);
          // For troika text, we can set fillOpacity for transparency
          text.fillOpacity = animationData.opacity;

          // Maintain billboard effect during animation
          if (this.scene) {
            text.lookAt(this.scene.camera.position);
            text.rotation.x = 0;
            text.rotation.z = 0;
          }

          text.sync();
        },
      })
      .to(
        animationData,
        {
          duration: 0.3,
          y: position.y + 3.5,
          scale: 0.8,
          opacity: 0,
          ease: "power1.in",
          onUpdate: () => {
            text.position.y = animationData.y;
            text.scale.setScalar(animationData.scale);
            text.fillOpacity = animationData.opacity;

            // Maintain billboard effect during animation
            if (this.scene) {
              text.lookAt(this.scene.camera.position);
              text.rotation.x = 0;
              text.rotation.z = 0;
            }

            text.sync();
          },
        },
        0.15,
      )
      .call(() => {
        // Cleanup
        if (this.scene) {
          this.scene.sceneRoot.remove(text);
        }
        text.dispose();
        const index = this.damageTexts.findIndex((item) => item.text === text);
        if (index !== -1) {
          this.damageTexts.splice(index, 1);
        }
      });

    this.damageTexts.push({ text, timeline });
  }

  override update(dt: number) {
    super.update(dt);
    // Text objects are now part of the main scene, no separate rendering needed
  }

  override destroy() {
    // Clean up all damage text objects and timelines
    for (const { text, timeline } of this.damageTexts) {
      timeline.kill();
      if (this.scene) {
        this.scene.sceneRoot.remove(text);
      }
      text.dispose();
    }
    this.damageTexts.length = 0;

    super.destroy();
  }
}
