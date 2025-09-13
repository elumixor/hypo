import * as THREE from 'three';

export class Enemy {
  hp = 3;
  tShoot = performance.now() + 800 + Math.random()*800;
  constructor(readonly mesh: THREE.Mesh) {}
  static create() {
    const geo = new THREE.BoxGeometry(0.7,0.7,0.7);
    const mat = new THREE.MeshStandardMaterial({ color:'#ff2b2b' });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(Math.cos(Math.random()*Math.PI*2)* (3+Math.random()*3),0.35,Math.sin(Math.random()*Math.PI*2)*(3+Math.random()*3));
    return new Enemy(m);
  }
}
