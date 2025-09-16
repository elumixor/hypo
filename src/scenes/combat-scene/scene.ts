import { AmbientLight, CylinderGeometry, DirectionalLight, Mesh, MeshStandardMaterial } from "three";
import { Scene } from "../../../engine/scene";
import { Enemy } from "../../entities/enemy";
import { Player } from "../../entities/player";
import { CombatService } from "../../services/combat-service";
import { HealthService } from "../../services/health-service";
import { InputService } from "../../services/input-service";
import { ProgressionService } from "../../services/progression-service";
import { ThreeService } from "../../services/three-service";
import { TimeService } from "../../services/time-service";
import { HUD } from "../../ui/global/hud";

export class CombatScene extends Scene {
  private player!: Player;

  constructor() {
    super("combat");
  }

  protected override init(): void {
    super.init();

    // Add services
    this.addService(new ThreeService());
    this.addService(new InputService());
    this.addService(new CombatService());
    this.addService(new ProgressionService());
    this.addService(new HealthService(100)); // Player max health
    this.addService(new TimeService());

    // Add UI
    this.addWidget(new HUD());

    this.setupWorld();
    this.setupEntities();
  }

  private setupWorld(): void {
    const threeService = this.getService(ThreeService);

    // Create ground
    const ground = new Mesh(
      new CylinderGeometry(20, 20, 0.2, 40),
      new MeshStandardMaterial({ color: 0x2d2d2d, roughness: 0.9 }),
    );
    ground.position.y = -0.1;
    threeService.scene.add(ground);

    // Add lighting
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(4, 6, 3);
    threeService.scene.add(directionalLight);

    const ambientLight = new AmbientLight(0x404040, 0.4);
    threeService.scene.add(ambientLight);
  }

  private setupEntities(): void {
    // Add player
    this.player = new Player({
      health: 100,
      movementSpeed: 4,
      dashSpeed: 8,
    });
    this.addEntity(this.player);

    // Add enemies
    for (let i = 0; i < 3; i++) {
      this.addEntity(
        new Enemy({
          health: 50,
          movementSpeed: 2,
          aggroRange: 8,
        }),
      );
    }
  }

  protected override update(dt: number): void {
    super.update(dt);

    // Handle input and player movement
    this.handlePlayerInput(dt);

    // Render the scene
    const threeService = this.getService(ThreeService);
    threeService.render();
  }

  private handlePlayerInput(dt: number): void {
    const input = this.getService(InputService);

    // Calculate movement direction
    let moveX = 0;
    let moveZ = 0;

    if (input.moveForward) moveZ -= 1;
    if (input.moveBackward) moveZ += 1;
    if (input.moveLeft) moveX -= 1;
    if (input.moveRight) moveX += 1;

    // Move player if any movement input
    if (moveX !== 0 || moveZ !== 0) {
      this.player.move({ x: moveX, y: 0, z: moveZ }, dt);
    }

    // Handle dash
    if (input.dash && this.player.canDash) {
      this.player.dash();
    }
  }
}
