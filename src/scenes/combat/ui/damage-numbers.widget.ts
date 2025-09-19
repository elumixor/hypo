import { Widget } from "@engine";
import { Text } from "pixi.js";
import { gsap } from "gsap";
import { Vector3 } from "three";
import { CombatEventsService, type DamageEvent } from "../../../services/combat-events.service";

export class DamageNumbersWidget extends Widget {
  private readonly damageTexts: Text[] = [];

  override async init() {
    await super.init();
    
    // Subscribe to damage events from the service
    const combatEvents = this.getService(CombatEventsService);
    combatEvents.damageDealt.subscribe(this.showDamageNumber);
  }

  private readonly showDamageNumber = ({ damage, position }: DamageEvent) => {
    // Temporarily disabled to debug other HUD elements
    console.log(`Damage: ${damage} at position:`, position);
    return;
    
    // Convert 3D world position to screen position
    const screenPos = this.worldToScreen(position);
    if (!screenPos) return; // Position is not visible
    
    // Create damage text
    const damageText = new Text(`-${damage}`, {
      fontSize: 24,
      fill: "#ff6b6b", // Red color for damage
      stroke: { color: "#000000", width: 3 },
      fontWeight: "bold",
    });
    
    damageText.anchor.set(0.5);
    damageText.position.set(screenPos.x, screenPos.y);
    damageText.alpha = 1;
    
    this.container.addChild(damageText);
    this.damageTexts.push(damageText);
    
    // Animate the damage number with GSAP
    const startY = damageText.position.y;
    const tl = gsap.timeline();
    tl.to(damageText.position, {
      duration: 0.2,
      y: startY - 30,
      ease: "power2.out"
    })
    .to(damageText.position, {
      duration: 0.5,
      y: startY - 60,
      ease: "power1.in"
    }, 0.2)
    .to(damageText, {
      duration: 0.5,
      alpha: 0,
      ease: "power1.in"
    }, 0.2)
    .call(() => {
      // Clean up
      if (damageText.parent) {
        this.container.removeChild(damageText);
      }
      const index = this.damageTexts.indexOf(damageText);
      if (index > -1) this.damageTexts.splice(index, 1);
      damageText.destroy();
    });
  };

  private worldToScreen(worldPos: Vector3): { x: number; y: number } | null {
    // Get the camera from the scene
    const camera = this.scene.camera;
    
    // Convert 3D world position to screen coordinates
    const screenPos = worldPos.clone().project(camera);
    
    // Check if the position is in front of the camera
    if (screenPos.z > 1) return null;
    
    // Get screen dimensions from the DOM
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Convert normalized device coordinates to screen coordinates
    const x = (screenPos.x * 0.5 + 0.5) * width - width / 2;
    const y = -(screenPos.y * 0.5 - 0.5) * height + height / 2;
    
    return { x, y };
  }

  override destroy() {
    // Clean up all damage texts
    for (const text of this.damageTexts) {
      text.destroy();
    }
    this.damageTexts.length = 0;
    
    super.destroy();
  }
}