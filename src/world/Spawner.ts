import * as THREE from 'three';
import { Enemy } from './Enemy';

export class Spawner {
  enemies: Enemy[] = [];
  constructor(readonly scene: THREE.Scene) {}
  spawn(count: number) { for (let i=0;i<count;i++) this.addOne(); }
  addOne() { const e = Enemy.create(); this.scene.add(e.mesh); this.enemies.push(e); }
  remove(e: Enemy) {
    this.scene.remove(e.mesh); e.mesh.geometry.dispose(); (e.mesh.material as THREE.Material).dispose();
    this.enemies.splice(this.enemies.indexOf(e),1);
  }
  ensureWave(size: number) { if (!this.enemies.length) this.spawn(size); }
}
