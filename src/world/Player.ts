import * as THREE from "three";
import type { Keyboard } from "../input/Keyboard";

export class Player {
  readonly mesh: THREE.Mesh;
  speed = 4;
  // dash state
  private readonly dashSpeed = 10;
  private dashTime = 0;
  private readonly dashDuration = 0.18; // seconds
  private readonly dashCooldown = 0.5;
  private dashCooldownTimer = 0;
  // shield
  private readonly shieldMesh?: THREE.Mesh;
  shieldActive = false;
  constructor(
    readonly keyboard: Keyboard,
    readonly yaw: number,
  ) {
    const geo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const mat = new THREE.MeshStandardMaterial({ color: "#4ec9ff", roughness: 0.4 });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.set(0, 0.4, 0);
    // create shield but keep hidden
    const sgeo = new THREE.SphereGeometry(1.1, 16, 12);
    const smat = new THREE.MeshStandardMaterial({ color: "#6cf", transparent: true, opacity: 0.25, depthWrite: false });
    this.shieldMesh = new THREE.Mesh(sgeo, smat);
    this.shieldMesh.visible = false;
    this.mesh.add(this.shieldMesh);
  }
  update(dt: number) {
    const forward = new THREE.Vector3(-Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    const right = new THREE.Vector3(-forward.z, 0, forward.x);
    const move = new THREE.Vector3();
    const k = this.keyboard;
    if (k.has("w") || k.has("arrowup")) move.add(forward);
    if (k.has("s") || k.has("arrowdown")) move.sub(forward);
    if (k.has("a") || k.has("arrowleft")) move.sub(right);
    if (k.has("d") || k.has("arrowright")) move.add(right);
    // update dash timers
    if (this.dashTime > 0) this.dashTime -= dt;
    if (this.dashCooldownTimer > 0) this.dashCooldownTimer -= dt;
    const curSpeed = this.dashTime > 0 ? this.dashSpeed : this.speed;
    if (move.lengthSq() > 0) this.mesh.position.add(move.normalize().multiplyScalar(curSpeed * dt));
  }

  startDash() {
    if (this.dashCooldownTimer > 0) return false;
    this.dashTime = this.dashDuration;
    this.dashCooldownTimer = this.dashCooldown;
    return true;
  }

  setShield(active: boolean) {
    this.shieldActive = active;
    if (this.shieldMesh) this.shieldMesh.visible = active;
  }
}
