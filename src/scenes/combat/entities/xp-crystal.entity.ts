import { ColliderBehavior, type CollisionEvent, cast, Entity, TransformBehavior, ticker } from "@engine";
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import { destroy } from "utils";
import { ProgressionService } from "../../../services/progression.service";
import { CollisionGroup } from "../collision-group";
import { Player } from "./player";

export class XPCrystalEntity extends Entity {
  private readonly transform = this.addBehavior(new TransformBehavior());
  private readonly collider = this.addBehavior(new ColliderBehavior(CollisionGroup.PickUps, 5)); // Larger radius for easier pickup

  private readonly mesh: Mesh;
  private readonly xpValue: number;

  constructor(xpValue = 10) {
    super();
    this.xpValue = xpValue;

    // Create small blue cube
    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshStandardMaterial({
      color: 0x0066ff,
      emissive: 0x002244,
      metalness: 0.8,
      roughness: 0.2,
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.castShadow = true;
  }

  override async init() {
    await super.init();

    this.transform.group.position.y = 5; // Slightly above ground
    // Add mesh to the transform group
    this.transform.group.add(this.mesh);

    // Listen for collision with player
    this.collider.collided.subscribe(this.onCollision);
  }

  override update(dt: number) {
    super.update(dt);

    // Rotate the crystal for visual effect
    this.mesh.rotation.x += dt * 0.003;
    this.mesh.rotation.y += dt * 0.005;
    this.mesh.rotation.z += dt * 0.002;

    // Add slight hover animation
    this.mesh.position.y = Math.sin(ticker.lastTime * 0.008) * 0.1;
  }

  private readonly onCollision = (event: CollisionEvent) => {
    console.log("XP Crystal collided with", event.other.entity);
    // Check if collided with player
    const player = cast(Player, event.other.entity);
    if (!player) return;

    // Grant XP to player through progression service
    const progressionService = this.getService(ProgressionService);
    progressionService.addXP(this.xpValue);

    // Destroy this crystal
    this.destroy();
  };

  override destroy() {
    this.collider.collided.unsubscribe(this.onCollision);
    destroy(this.mesh);
    super.destroy();
  }
}
