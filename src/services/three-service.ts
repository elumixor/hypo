import { Color, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Service } from "../../engine/service";

export class ThreeService extends Service {
  readonly scene = new Scene();
  readonly camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  readonly renderer = new WebGLRenderer({ antialias: true, alpha: true });

  constructor() {
    super();
    this.setupRenderer();
    this.setupCamera();
    this.setupScene();
    this.setupResizeHandler();
  }

  private setupRenderer(): void {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.style.display = "block";
    document.body.prepend(this.renderer.domElement);
  }

  private setupCamera(): void {
    this.camera.position.set(3, 13.5, 4.5);
    this.camera.lookAt(0, 0.6, 0);
  }

  private setupScene(): void {
    this.scene.background = new Color(0x1a1a2e);
  }

  private setupResizeHandler(): void {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  private onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  protected override onDestroy(): void {
    super.onDestroy();
    window.removeEventListener("resize", this.onResize.bind(this));
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
