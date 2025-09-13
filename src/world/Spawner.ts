import type * as THREE from "three";
import { Enemy } from "./Enemy";

export class Spawner {
  enemies: Enemy[] = [];
  constructor(readonly scene: THREE.Scene) {}
  spawn(count: number) {
    for (let i = 0; i < count; i++) this.addOne();
  }
  addOne() {
    const e = Enemy.create();
    this.scene.add(e.mesh);
    this.enemies.push(e);
  }
  remove(e: Enemy) {
    e.kill();
    // remove from scene safely
    if (e.mesh.parent) this.scene.remove(e.mesh);
    const geom = e.mesh.geometry as THREE.BufferGeometry | undefined;
    const mat = e.mesh.material as THREE.Material | undefined;
    geom?.dispose?.();
    (mat as THREE.Material | undefined)?.dispose?.();
    const idx = this.enemies.indexOf(e);
    if (idx >= 0) this.enemies.splice(idx, 1);
  }
  ensureWave(size: number) {
    if (!this.enemies.length) this.spawn(size);
  }
}
