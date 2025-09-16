import { Scene } from "@engine";
import { AmbientLight, DirectionalLight, Mesh, MeshLambertMaterial, PlaneGeometry } from "three";
import { destroy } from "utils";
import { Player } from "./entities/player";

export class CombatScene extends Scene {
  private readonly ambientLight: AmbientLight;
  private readonly directionalLight: DirectionalLight;
  private readonly groundMesh: Mesh;

  constructor() {
    super();

    // Add the ground plane
    // Create a large ground plane
    const geometry = new PlaneGeometry(50, 50);
    const material = new MeshLambertMaterial({
      color: 0xc2b280, // Desert sand color for ground
      transparent: false,
    });

    this.groundMesh = new Mesh(geometry, material);

    // Rotate the plane to be horizontal (by default it's vertical)
    this.groundMesh.rotation.x = -Math.PI / 2;
    this.groundMesh.position.y = 0;

    // Enable shadow receiving
    this.groundMesh.receiveShadow = true;
    this.sceneRoot.add(this.groundMesh);

    // Add ambient lighting for general illumination
    this.ambientLight = new AmbientLight(0x404040, 0.6); // Soft white light
    this.sceneRoot.add(this.ambientLight);

    // Add directional lighting for better depth and shadows
    this.directionalLight = new DirectionalLight(0xffffff, 1.0);
    this.directionalLight.position.set(10, 10, 5);
    this.directionalLight.castShadow = true;

    // Configure shadow properties for better quality
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    this.directionalLight.shadow.camera.near = 0.5;
    this.directionalLight.shadow.camera.far = 50;
    this.directionalLight.shadow.camera.left = -20;
    this.directionalLight.shadow.camera.right = 20;
    this.directionalLight.shadow.camera.top = 20;
    this.directionalLight.shadow.camera.bottom = -20;

    this.sceneRoot.add(this.directionalLight);

    // Add the player entity
    this.addEntity(new Player());
  }

  override destroy() {
    super.destroy();

    // Clean up lights
    this.sceneRoot.remove(this.ambientLight);
    this.sceneRoot.remove(this.directionalLight);
    this.directionalLight.dispose();

    // Clean up ground mesh
    destroy(this.groundMesh);
  }
}
