import { EventEmitter } from "@elumixor/event-emitter";
import type { Constructor } from "@elumixor/frontils";
import { Application } from "pixi.js";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  WebGLRenderer as ThreeRenderer,
  Scene as ThreeScene,
} from "three";
import type { Scene } from "./scene";
import type { Service } from "./service";

export interface ResizeData {
  width: number;
  height: number;
  aspect: number;
}

export abstract class Game {
  // HTML DOM root element for the renderer
  readonly domRoot = document.body;

  // Pixi and ThreeJS renderers
  readonly threeRenderer = new ThreeRenderer({ antialias: true, stencil: true });
  readonly pixiApp = new Application();

  // Canvas elements
  readonly threeCanvas = this.threeRenderer.domElement;
  readonly pixiCanvas = document.createElement("canvas");

  // Camera for ThreeJS rendering
  readonly camera = new PerspectiveCamera(75, this.domRoot.clientWidth / this.domRoot.clientHeight, 0.1, 1000);

  // Root elements for 2D and 3D contents
  readonly uiRoot = this.pixiApp.stage;
  readonly sceneRoot = new ThreeScene();

  // Event emitters
  readonly resized = new EventEmitter<ResizeData>();

  // Registered services
  private readonly services = [] as Service[];

  // Currently loaded scene
  private _currentScene?: Scene;

  /** Read-only access to the current scene */
  get currentScene() {
    return this._currentScene;
  }

  get pixiRenderer() {
    const { renderer } = this.pixiApp;
    if (!renderer) throw new Error("PixiJS renderer is not initialized yet");
    return renderer;
  }

  /** Start the game - initialize rendering contexts, initialize services start update loop */
  async start() {
    // Set up separate contexts for ThreeJS and PixiJS
    this.domRoot.style.width = `${window.innerWidth}px`;
    this.domRoot.style.height = `${window.innerHeight}px`;

    // Initialize ThreeJS renderer with its own context
    this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
    this.threeCanvas.style.position = "absolute";
    this.threeCanvas.style.top = "0";
    this.threeCanvas.style.left = "0";
    this.threeCanvas.style.zIndex = "1";
    this.domRoot.appendChild(this.threeCanvas);

    // Set up initial camera position
    this.camera.position.set(0, 50, 50);
    this.camera.lookAt(0, 0, 0);
    this.sceneRoot.add(this.camera);

    // Initialize PixiJS renderer with its own separate context
    await this.pixiApp.init({ backgroundAlpha: 0, resizeTo: this.domRoot, canvas: this.pixiCanvas });

    // Position Pixi canvas over Three.js canvas
    this.pixiCanvas.style.position = "absolute";
    this.pixiCanvas.style.top = "0";
    this.pixiCanvas.style.left = "0";
    this.pixiCanvas.style.zIndex = "2";
    this.domRoot.appendChild(this.pixiCanvas);

    // Set up render loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      requestAnimationFrame(animate);
      this.update(dt);
    };
    requestAnimationFrame(animate);

    // Listen to resize events
    window.addEventListener("resize", this.resize.bind(this));
    this.resize(); // Initial resize

    // Initialize all services
    for (const service of this.services) await service.init();

    // Scene is not loaded yet - should be set with loadScene(scene), that should be called after start()
  }

  addService(service: Service) {
    service.game = this;
    this.services.push(service);
  }

  getService<T extends Service>(serviceClass: Constructor<T>): T | undefined {
    return this.services.find((s) => s instanceof serviceClass) as T | undefined;
  }

  async loadScene(scene: Scene) {
    this._currentScene?.destroy();
    this._currentScene = scene;
    scene.game = this;
    await this._currentScene.init();
  }

  private update(dt: number) {
    // Render ThreeJS scene with its own context
    this.threeRenderer.render(this.sceneRoot, this.camera);

    // Update all the services and the current scene
    for (const service of this.services) service.update(dt);
    this._currentScene?.update(dt);
  }

  private resize() {
    this.domRoot.style.width = `${window.innerWidth}px`;
    this.domRoot.style.height = `${window.innerHeight}px`;

    const width = this.domRoot.clientWidth;
    const height = this.domRoot.clientHeight;

    // Resize both renderers
    this.threeRenderer.setSize(width, height);
    this.threeCanvas.width = width;
    this.threeCanvas.height = height;

    // Update camera for ThreeJS
    const aspect = width / height;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();

    // Place the uiRoot at the center of the screen
    this.uiRoot.position.set(width / 2, height / 2);

    // Emit resize event for interested services
    this.resized.emit({ width, height, aspect });
  }
}
