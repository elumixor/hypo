import { Application, Container, Text } from "pixi.js";
import * as THREE from "three";

void (async () => {
  const root = document.body;

  // Three.js setup
  const threeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  threeRenderer.setPixelRatio(devicePixelRatio);
  threeRenderer.setSize(innerWidth, innerHeight);
  threeRenderer.domElement.style.display = "block";
  root.prepend(threeRenderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#050507");

  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
  camera.position.set(3, 3.5, 4.5);
  camera.lookAt(0, 0.6, 0);

  // Player (single cube)
  const playerGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const playerMat = new THREE.MeshStandardMaterial({ color: "#4ec9ff", roughness: 0.4 });
  const player = new THREE.Mesh(playerGeo, playerMat);
  player.position.set(0, 0.4, 0);
  scene.add(player);

  const ground = new THREE.Mesh(
    new THREE.CylinderGeometry(5, 5, 0.2, 40),
    new THREE.MeshStandardMaterial({ color: "#111318", roughness: 0.9 }),
  );
  ground.position.y = -0.1;
  scene.add(ground);

  const light = new THREE.DirectionalLight("#ffffff", 2.2);
  light.position.set(4, 6, 3);
  scene.add(light);
  scene.add(new THREE.AmbientLight("#404040", 0.6));

  // PIXI overlay
  const pixiApp = new Application();
  await pixiApp.init({ backgroundAlpha: 0, antialias: true, resizeTo: window });
  pixiApp.canvas.style.position = "fixed";
  pixiApp.canvas.style.top = "0";
  pixiApp.canvas.style.left = "0";
  pixiApp.canvas.style.pointerEvents = "none";
  root.append(pixiApp.canvas);

  const ui = new Container();
  pixiApp.stage.addChild(ui);

  const infoText = new Text({
    text: "",
    style: { fill: "#fff", fontSize: 14, letterSpacing: 1 },
  });
  infoText.x = 12;
  infoText.y = 10;
  ui.addChild(infoText);

  // Game state
  type Enemy = { m: THREE.Mesh; hp: number; tShoot: number };
  type Projectile = { m: THREE.Mesh; v: THREE.Vector3; fromPlayer: boolean };

  const enemies: Enemy[] = [];
  const projectiles: Projectile[] = [];

  const enemyGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
  const enemyMat = new THREE.MeshStandardMaterial({ color: "#ff2b2b" });

  const projGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const projMatPlayer = new THREE.MeshStandardMaterial({ color: "#ffe14e", emissive: "#8d6f00" });
  const projMatEnemy = new THREE.MeshStandardMaterial({ color: "#ff7b72", emissive: "#6e1212" });

  const spawnEnemy = () => {
    const a = Math.random() * Math.PI * 2;
    const r = 3 + Math.random() * 3;
    const m = new THREE.Mesh(enemyGeo, enemyMat.clone());
    m.position.set(Math.cos(a) * r, 0.35, Math.sin(a) * r);
    scene.add(m);
    enemies.push({ m, hp: 3, tShoot: performance.now() + 800 + Math.random() * 800 });
  };
  for (let i = 0; i < 5; i++) spawnEnemy();

  const shoot = (from: THREE.Vector3, dir: THREE.Vector3, fromPlayer: boolean) => {
    const m = new THREE.Mesh(projGeo, fromPlayer ? projMatPlayer : projMatEnemy);
    m.position.copy(from);
    scene.add(m);
    projectiles.push({ m, v: dir.clone().normalize().multiplyScalar(6), fromPlayer });
  };

  let hp = 10;
  let tAccum = 0;
  let autoShootTimer = 0;

  const tmpV = new THREE.Vector3();
  const getClosestEnemy = () => {
    let best: Enemy | undefined; let bestD = Infinity;
    for (const e of enemies) {
      const d = e.m.position.distanceTo(player.position);
      if (d < bestD) { bestD = d; best = e; }
    }
    return best;
  };

  // Input (WASD + pointer drag rotate camera around player)
  const keys = new Set<string>();
  addEventListener('keydown', (e: KeyboardEvent) => keys.add(e.key.toLowerCase()));
  addEventListener('keyup', (e: KeyboardEvent) => keys.delete(e.key.toLowerCase()));

  let drag = false; let px = 0; let py = 0; let yaw = 0; let pitch = 0.6;
  addEventListener('pointerdown', (e: PointerEvent) => { drag = true; px = e.clientX; py = e.clientY; });
  addEventListener('pointerup', () => drag = false);
  addEventListener('pointermove', (e: PointerEvent) => {
    if (!drag) return;
    const dx = e.clientX - px; const dy = e.clientY - py; px = e.clientX; py = e.clientY;
    yaw -= dx * 0.005; pitch -= dy * 0.005; pitch = Math.min(1.2, Math.max(0.2, pitch));
  });

  const updateCamera = () => {
    const dist = 6;
    camera.position.set(
      player.position.x + Math.cos(yaw) * dist,
      player.position.y + 3.5 * pitch,
      player.position.z + Math.sin(yaw) * dist,
    );
    camera.lookAt(player.position.x, player.position.y + 0.4, player.position.z);
  };
  updateCamera();

  // Movement
  const moveVec = new THREE.Vector3();
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  // const up = new THREE.Vector3(0,1,0); // reserved for future vertical logic
  const speed = 4;

  const stepPlayer = (dt: number) => {
    forward.set(Math.cos(yaw), 0, Math.sin(yaw));
    right.set(forward.z, 0, -forward.x);
    moveVec.set(0,0,0);
    if (keys.has('w') || keys.has('arrowup')) moveVec.add(forward);
    if (keys.has('s') || keys.has('arrowdown')) moveVec.sub(forward);
    if (keys.has('a') || keys.has('arrowleft')) moveVec.sub(right);
    if (keys.has('d') || keys.has('arrowright')) moveVec.add(right);
    if (moveVec.lengthSq() > 0) moveVec.normalize().multiplyScalar(speed * dt);
    player.position.add(moveVec);
  };

  const removeEnemy = (e: Enemy) => {
    scene.remove(e.m); e.m.geometry.dispose(); (e.m.material as THREE.Material).dispose();
    enemies.splice(enemies.indexOf(e),1);
  };

  const removeProjectile = (p: Projectile) => {
    scene.remove(p.m); p.m.geometry.dispose(); (p.m.material as THREE.Material).dispose();
    projectiles.splice(projectiles.indexOf(p),1);
  };

  const stepEnemies = (dt: number, now: number) => {
    for (const e of enemies) {
      tmpV.copy(player.position).sub(e.m.position); tmpV.y = 0; const d = tmpV.length();
      if (d > 0.001) {
        tmpV.normalize(); e.m.position.addScaledVector(tmpV, dt * 1.2);
      }
      if (now > e.tShoot) {
        shoot(e.m.position.clone(), tmpV.set(player.position.x - e.m.position.x, 0, player.position.z - e.m.position.z), false);
        e.tShoot = now + 900 + Math.random() * 600;
      }
    }
    // Respawn if all dead
    if (!enemies.length) for (let i=0;i<5;i++) spawnEnemy();
  };

  const stepProjectiles = (dt: number) => {
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const p = projectiles[i];
      if (!p) continue;
      p.m.position.addScaledVector(p.v, dt);
      if (p.m.position.length() > 30) { removeProjectile(p); continue; }
      if (p.fromPlayer) {
        for (const e of enemies) {
          if (p.m.position.distanceTo(e.m.position) < 0.6) {
            e.hp -= 1; removeProjectile(p);
            if (e.hp <= 0) removeEnemy(e);
            break;
          }
        }
      } else if (p.m.position.distanceTo(player.position) < 0.6) {
        hp -= 1; removeProjectile(p);
      }
    }
  };

  const autoShoot = (dt: number) => {
    autoShootTimer -= dt;
    if (autoShootTimer <= 0) {
      const target = getClosestEnemy();
      if (target) {
        tmpV.copy(target.m.position).sub(player.position); tmpV.y = 0;
        if (tmpV.lengthSq() > 0.001) shoot(player.position.clone().add(new THREE.Vector3(0,0.4,0)), tmpV, true);
        autoShootTimer = 0.5; // fire cadence
      }
    }
  };

  const updateUI = (fps: number) => {
    infoText.text = `HP: ${hp}  Enemies: ${enemies.length}  Proj: ${projectiles.length}  FPS:${fps.toFixed(0)}`;
  };

  let last = performance.now(); let fpsTimer = 0; let frames = 0; let fps = 0;
  const update = (t: number) => {
    const dt = (t - last) / 1000; last = t; frames++; fpsTimer += dt; tAccum += dt;
    stepPlayer(dt);
    stepEnemies(dt, t);
    stepProjectiles(dt);
    autoShoot(dt);
    updateCamera();
    threeRenderer.render(scene, camera);
    if (fpsTimer >= 0.5) { fps = frames / fpsTimer; frames = 0; fpsTimer = 0; updateUI(fps); }
    if (hp <= 0) { infoText.text = 'You Died - Respawning'; hp = 10; player.position.set(0,0.4,0); }
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);

  // Resize handling
  addEventListener("resize", () => {
    threeRenderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  });

  console.log("HYPO gameplay loop active");
})();
