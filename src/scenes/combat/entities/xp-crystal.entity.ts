import { ColliderBehavior, type CollisionEvent, cast, Entity, TransformBehavior, ticker } from "@engine";
import { BoxGeometry, Mesh, MeshStandardMaterial, PointLight } from "three";
import { destroy } from "utils";
import { ProgressionService } from "../../../services/progression.service";
import { CollisionGroup } from "../collision-group";
import { Player } from "./player";

export class XPCrystalEntity extends Entity {
  private readonly transform = this.addBehavior(new TransformBehavior());
  private readonly collider = this.addBehavior(new ColliderBehavior(CollisionGroup.PickUps, 5)); // Larger radius for easier pickup

  private readonly mesh: Mesh;
  // Add point light for crystal glow
  private readonly light = new PointLight(0x0066ff, 15.0, 50);
  private readonly xpValue: number;

  constructor(xpValue = 10) {
    super();
    this.xpValue = xpValue;

    // Create small blue cube
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({
      emissive: 0x0055ff,
    });
    this.mesh = new Mesh(geometry, material);
  }

  override async init() {
    await super.init();

    this.transform.group.position.y = 5; // Slightly above ground
    // Add mesh and light to the transform group
    this.transform.group.add(this.mesh, this.light);

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
    destroy(this.light);
    super.destroy();
  }
}
