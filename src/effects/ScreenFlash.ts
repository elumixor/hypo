import * as THREE from "three";

export class ScreenFlash {
  private mesh: THREE.Mesh;
  private material: THREE.MeshBasicMaterial;
  private duration = 0;
  private elapsed = 0;
  private maxOpacity = 0;

  constructor(private scene: THREE.Scene, private camera: THREE.Camera) {
    const geometry = new THREE.PlaneGeometry(2, 2);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
    });
    
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.z = -0.5; // In front of camera
    this.mesh.visible = false;
    
    // Add to camera so it moves with it
    this.camera.add(this.mesh);
  }

  flash(color: THREE.Color, opacity: number, duration: number) {
    this.material.color.copy(color);
    this.maxOpacity = opacity;
    this.duration = duration;
    this.elapsed = 0;
    this.mesh.visible = true;
  }

  update(dt: number) {
    if (this.duration <= 0) {
      this.mesh.visible = false;
      return;
    }

    this.elapsed += dt;
    
    if (this.elapsed >= this.duration) {
      this.duration = 0;
      this.mesh.visible = false;
      this.material.opacity = 0;
      return;
    }

    // Fade out over time
    const progress = this.elapsed / this.duration;
    this.material.opacity = this.maxOpacity * (1 - progress);
  }

  dispose() {
    this.camera.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.material.dispose();
  }
}