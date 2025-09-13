import * as THREE from 'three';
import { Keyboard } from '../input/Keyboard';
import { Player } from '../world/Player';
import { Spawner } from '../world/Spawner';
import { Projectiles } from '../combat/Projectiles';
import { Hud } from '../ui/Hud';
import { Loop } from './Loop';
import type { Enemy } from '../world/Enemy';

export class Game {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, 0.1, 100);
  readonly renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  readonly keyboard = new Keyboard();
  readonly player = new Player(this.keyboard, Math.PI*0.25);
  readonly spawner = new Spawner(this.scene);
  readonly projectiles = new Projectiles();
  readonly loop = new Loop();
  hud!: Hud;
  yaw = Math.PI*0.25; pitch = 0.7; dist = 6;
  hp = 10; autoShootTimer = 0; tmp = new THREE.Vector3(); tAccum = 0;
  constructor(readonly root: HTMLElement) {}
  async init() {
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.domElement.style.display='block';
    this.root.prepend(this.renderer.domElement);
    this.scene.background = new THREE.Color('#050507');
    this.camera.position.set(3,3.5,4.5); this.camera.lookAt(0,0.6,0);

    // world pieces
    const ground = new THREE.Mesh(new THREE.CylinderGeometry(5,5,0.2,40), new THREE.MeshStandardMaterial({ color:'#111318', roughness:0.9 }));
    ground.position.y = -0.1; this.scene.add(ground);
    const light = new THREE.DirectionalLight('#ffffff',2.2); light.position.set(4,6,3); this.scene.add(light); this.scene.add(new THREE.AmbientLight('#404040',0.6));

    // add player
    this.scene.add(this.player.mesh);
    this.spawner.spawn(5);

    // pixi hud
    const hudApp = new (await import('pixi.js')).Application();
    await hudApp.init({ backgroundAlpha:0, antialias:true, resizeTo: window });
    hudApp.canvas.style.position='fixed'; hudApp.canvas.style.top='0'; hudApp.canvas.style.left='0'; hudApp.canvas.style.pointerEvents='none';
    this.root.append(hudApp.canvas);
    this.hud = new Hud(hudApp);

    addEventListener('resize', ()=> this.onResize());
    this.loop.add((dt,t)=> this.update(dt,t));
    this.loop.start();
  }
  onResize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth/innerHeight; this.camera.updateProjectionMatrix();
  }
  update(dt: number, t: number) {
    this.player.update(dt);
    this.stepEnemies(dt,t);
    this.projectiles.update(dt, this.scene, this.player, this.spawner.enemies, ()=>{ this.hp -=1; }, e=> this.removeEnemy(e));
    this.autoShoot(dt);
    this.updateCamera();
    this.renderer.render(this.scene, this.camera);
    this.updateHud();
    if (this.hp<=0) this.respawn();
  }
  updateCamera() {
    const p = this.player.mesh.position;
    this.camera.position.set(
      p.x + Math.cos(this.yaw)*this.dist,
      p.y + 3.5*this.pitch,
      p.z + Math.sin(this.yaw)*this.dist
    );
    this.camera.lookAt(p.x, p.y+0.4, p.z);
  }
  stepEnemies(dt: number, t: number) {
    for (const e of this.spawner.enemies) {
      this.tmp.copy(this.player.mesh.position).sub(e.mesh.position); this.tmp.y=0; const d = this.tmp.length();
      if (d>0.001) { this.tmp.normalize(); e.mesh.position.addScaledVector(this.tmp, dt*1.2); }
      if (t>e.tShoot) {
        this.projectiles.add(e.mesh.position.clone(), this.tmp.set(this.player.mesh.position.x - e.mesh.position.x, 0, this.player.mesh.position.z - e.mesh.position.z), false, this.scene);
        e.tShoot = t + 900 + Math.random()*600;
      }
    }
    this.spawner.ensureWave(5);
  }
  removeEnemy(e: Enemy) { this.spawner.remove(e); }
  autoShoot(dt: number) {
    this.autoShootTimer -= dt;
    if (this.autoShootTimer<=0) {
      const target = this.closestEnemy();
      if (target) {
        this.tmp.copy(target.mesh.position).sub(this.player.mesh.position); this.tmp.y=0;
        if (this.tmp.lengthSq()>0.001) this.projectiles.add(this.player.mesh.position.clone().add(new THREE.Vector3(0,0.4,0)), this.tmp, true, this.scene);
        this.autoShootTimer = 0.5;
      }
    }
  }
  closestEnemy() {
    let best: Enemy | undefined; let bestD = Infinity;
    for (const e of this.spawner.enemies) { const d = e.mesh.position.distanceTo(this.player.mesh.position); if (d<bestD) { bestD=d; best=e; } }
    return best;
  }
  updateHud() { this.hud.setStatus(`HP:${this.hp} Enemies:${this.spawner.enemies.length} Proj:${this.projectiles.list.length} FPS:${this.loop.fps.toFixed(0)}`); }
  respawn() { this.hud.setStatus('You Died - Respawning'); this.hp=10; this.player.mesh.position.set(0,0.4,0); }
}
