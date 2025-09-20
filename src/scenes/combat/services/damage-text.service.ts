import { Service } from "@engine";
import { gsap } from "gsap";
import { Scene } from "three";
import { CSS3DObject, CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";
import { CombatEventsService, type DamageEvent } from "./combat-events.service";

// TODO: I think it's very inefficient to create a new CSS3DRenderer, new Scene, and render all texts every frame.
// todo: we should use troika-3d-text: https://github.com/protectwise/troika/tree/main/packages/troika-three-text
// we can then also have some nice .woff/.otf fonts :)
export class DamageTextService extends Service {
  private readonly css3DRenderer = new CSS3DRenderer();
  private readonly css3DScene = new Scene(); // Separate scene for CSS3D elements
  private readonly damageElements: { element: HTMLElement; object: CSS3DObject; timeline: gsap.core.Timeline }[] = [];

  private readonly combatEvents = this.require(CombatEventsService);

  override async init() {
    await super.init();

    // Setup CSS3D renderer
    this.css3DRenderer.setSize(window.innerWidth, window.innerHeight);
    this.css3DRenderer.domElement.style.position = "absolute";
    this.css3DRenderer.domElement.style.top = "0";
    this.css3DRenderer.domElement.style.pointerEvents = "none"; // Don't block mouse interactions
    this.css3DRenderer.domElement.style.zIndex = "1"; // Above 3D scene but below UI
    document.body.appendChild(this.css3DRenderer.domElement);

    // Handle window resize
    window.addEventListener("resize", this.onResize);

    // Subscribe to damage events
    this.on(this.combatEvents.damageDealt, this.showDamageText.bind(this));
  }

  private readonly onResize = () => {
    this.css3DRenderer.setSize(window.innerWidth, window.innerHeight);
  };

  private showDamageText({ damage, position }: DamageEvent) {
    // Create HTML element for damage text
    const element = document.createElement("div");
    element.innerHTML = `-${damage}`;
    element.style.cssText = `
      color: #ff6b6b;
      font-size: 16px;
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
      pointer-events: none;
      user-select: none;
      font-family: 'Arial', sans-serif;
      white-space: nowrap;
      text-align: center;
    `;

    // Create CSS3D object
    const object = new CSS3DObject(element);
    object.scale.setScalar(0.01); // Start small

    // Position the text above the entity (add height offset)
    object.position.copy(position);
    object.position.y += 1.5; // Position above entity

    // Add slight random offset to prevent overlap
    object.position.x += (Math.random() - 0.5) * 0.3;
    object.position.z += (Math.random() - 0.5) * 0.3;

    // Make the object always face the camera (billboard effect), but only on the Y axis
    if (this.scene) {
      object.lookAt(this.scene.camera.position);
      object.rotation.x = 0;
      object.rotation.z = 0;
    }

    this.css3DScene.add(object); // Create animation with GSAP
    const timeline = gsap.timeline();
    const animationData = {
      y: position.y + 1.5, // Start above the entity
      scale: 0.1,
      opacity: 1,
    };

    timeline
      .to(animationData, {
        duration: 0.15,
        y: position.y + 2.5,
        scale: 0.05,
        ease: "power2.out",
        onUpdate: () => {
          object.position.y = animationData.y;
          object.scale.setScalar(animationData.scale);
          element.style.opacity = animationData.opacity.toString();
          // Maintain billboard effect during animation
          if (this.scene) {
            object.lookAt(this.scene.camera.position);
          }
        },
      })
      .to(
        animationData,
        {
          duration: 0.3,
          y: position.y + 3.5,
          scale: 0.1,
          opacity: 0,
          ease: "power1.in",
          onUpdate: () => {
            object.position.y = animationData.y;
            object.scale.setScalar(animationData.scale);
            element.style.opacity = animationData.opacity.toString();
            // Maintain billboard effect during animation
            if (this.scene) {
              object.lookAt(this.scene.camera.position);
            }
          },
        },
        0.15,
      )
      .call(() => {
        // Cleanup
        this.css3DScene.remove(object);
        const index = this.damageElements.findIndex((item) => item.object === object);
        if (index !== -1) {
          this.damageElements.splice(index, 1);
        }
        element.remove();
      });

    this.damageElements.push({ element, object, timeline });
  }

  override update(dt: number) {
    super.update(dt);

    // Render CSS3D elements if scene is available
    if (this.scene) {
      this.css3DRenderer.render(this.css3DScene, this.scene.camera);
    }
  }

  override destroy() {
    // Clean up all damage elements and timelines
    for (const { element, object, timeline } of this.damageElements) {
      timeline.kill();
      this.css3DScene.remove(object);
      element.remove();
    }
    this.damageElements.length = 0;

    // Remove event listener
    window.removeEventListener("resize", this.onResize);

    // Remove CSS3D renderer from DOM
    if (this.css3DRenderer.domElement.parentNode) {
      this.css3DRenderer.domElement.parentNode.removeChild(this.css3DRenderer.domElement);
    }

    super.destroy();
  }
}
