import * as THREE from 'three';
import type { Keyboard } from '../input/Keyboard';

export class Player {
  readonly mesh: THREE.Mesh;
  speed = 4;
  constructor(readonly keyboard: Keyboard, readonly yaw: number) {
    const geo = new THREE.BoxGeometry(0.8,0.8,0.8);
    const mat = new THREE.MeshStandardMaterial({ color:'#4ec9ff', roughness:0.4 });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.set(0,0.4,0);
  }
  update(dt: number) {
    const forward = new THREE.Vector3(-Math.cos(this.yaw),0,-Math.sin(this.yaw));
    const right = new THREE.Vector3(-forward.z,0,forward.x);
    const move = new THREE.Vector3();
    const k = this.keyboard;
    if (k.has('w')||k.has('arrowup')) move.add(forward);
    if (k.has('s')||k.has('arrowdown')) move.sub(forward);
    if (k.has('a')||k.has('arrowleft')) move.sub(right);
    if (k.has('d')||k.has('arrowright')) move.add(right);
    if (move.lengthSq()>0) this.mesh.position.add(move.normalize().multiplyScalar(this.speed*dt));
  }
}
