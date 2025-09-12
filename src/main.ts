import { Application, Container, Text } from "pixi.js";
import * as THREE from "three";

const root = document.body;

// Three.js setup
const threeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
threeRenderer.setPixelRatio(devicePixelRatio);
threeRenderer.setSize(innerWidth, innerHeight);
threeRenderer.domElement.style.display = "block";
root.prepend(threeRenderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color("#050507");

const camera = new THREE.PerspectiveCamera(
	55,
	innerWidth / innerHeight,
	0.1,
	100,
);
camera.position.set(3, 3.5, 4.5);
camera.lookAt(0, 0.6, 0);

// Simple placeholder world: ground + rotating cube
const cubeGeo = new THREE.BoxGeometry();
const cubeMat = new THREE.MeshStandardMaterial({
	color: "#ff5666",
	roughness: 0.4,
	metalness: 0.1,
});
const cube = new THREE.Mesh(cubeGeo, cubeMat);
cube.position.y = 0.5;
scene.add(cube);

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

const title = new Text({
	text: "HYPO PROTOTYPE",
	style: { fill: "#fff", fontSize: 18, letterSpacing: 2 },
});
title.x = 12;
title.y = 10;
ui.addChild(title);

let last = performance.now();
const update = (t: number) => {
	const dt = (t - last) / 1000;
	last = t;
	cube.rotation.y += dt * 0.8;
	cube.rotation.x = Math.sin(t * 0.0005) * 0.4;
	threeRenderer.render(scene, camera);
	requestAnimationFrame(update);
};
requestAnimationFrame(update);

// Resize handling
addEventListener("resize", () => {
	threeRenderer.setSize(innerWidth, innerHeight);
	camera.aspect = innerWidth / innerHeight;
	camera.updateProjectionMatrix();
});

// Minimal touch prototype (one finger rotates cube)
let active = false;
let lx = 0;
let ly = 0;
addEventListener("pointerdown", (e: PointerEvent) => {
	active = true;
	lx = e.clientX;
	ly = e.clientY;
});
addEventListener("pointerup", () => {
	active = false;
});
addEventListener("pointermove", (e: PointerEvent) => {
	if (!active) return;
	const dx = e.clientX - lx;
	const dy = e.clientY - ly;
	lx = e.clientX;
	ly = e.clientY;
	cube.rotation.y += dx * 0.01;
	cube.rotation.x += dy * 0.01;
});

console.log("HYPO bootstrap complete");
