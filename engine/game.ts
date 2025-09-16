import { EventEmitter } from "@elumixor/event-emitter";
import type { Constructor } from "@elumixor/frontils";
import { Container, WebGLRenderer as PixiRenderer } from "pixi.js";
import { PerspectiveCamera, WebGLRenderer as ThreeRenderer, Scene as ThreeScene } from "three";
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

  // Renderers
  readonly threeRenderer = new ThreeRenderer({ antialias: true, stencil: true });
  readonly pixiRenderer = new PixiRenderer();

  // Camera for ThreeJS rendering
  readonly camera = new PerspectiveCamera(75, this.domRoot.clientWidth / this.domRoot.clientHeight, 0.1, 1000);

  // Root elements for 2D and 3D contents
  readonly uiRoot = new Container();
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

  /** Start the game - initialize rendering contexts, initialize services start update loop */
  async start() {
    // Set up ThreeJS + PixiJS integration: https://pixijs.com/8.x/guides/third-party/mixing-three-and-pixi

    // Initialize ThreeJS renderer
    this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
    this.domRoot.appendChild(this.threeRenderer.domElement);

    // Initialize PixiJS renderer with shared context
    await this.pixiRenderer.init({
      context: this.threeRenderer.getContext() as WebGL2RenderingContext,
      width: window.innerWidth,
      height: window.innerHeight,
      clearBeforeRender: false, // Don't clear the canvas as ThreeJS will handle that
    });

    // Set up render loop
    const animate = (dt: number) => {
      requestAnimationFrame(animate);
      this.update(dt); // Approximate 60 FPS
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
    // Render ThreeJS scene (if camera is available)
    this.threeRenderer.resetState();
    this.threeRenderer.render(this.sceneRoot, this.camera);

    // Render PixiJS scene
    this.pixiRenderer.resetState();
    this.pixiRenderer.render({ container: this.uiRoot });

    // Update all the services and the current scene
    for (const service of this.services) service.update(dt);
    this._currentScene?.update(dt);
  }

  private resize() {
    const width = this.domRoot.clientWidth;
    const height = this.domRoot.clientHeight;

    this.threeRenderer.setSize(width, height);
    this.pixiRenderer.resize(width, height);

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
