import { ColliderBehavior, Entity, ticker } from "@engine";
import { CollisionGroup } from "collision-group";
import { CharacterProgressionService } from "services/character-progression.service";
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

export class XPCrystal extends Entity {
  private static readonly geometry = new BoxGeometry();
  private static readonly material = new MeshStandardMaterial({ emissive: 0x66aaff });

  private readonly collider = this.addBehavior(new ColliderBehavior(CollisionGroup.PickUps));
  private readonly characterProgressionService = this.require(CharacterProgressionService);

  private readonly mesh = new Mesh(XPCrystal.geometry, XPCrystal.material);

  constructor(private readonly xpValue: number) {
    super();

    this.addChild(this.mesh);

    this.on(this.collider.collided, this.onCollided.bind(this));
  }

  private onCollided() {
    this.characterProgressionService.addXP(this.xpValue);
    this.destroy();
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
}
