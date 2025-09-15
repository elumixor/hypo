export abstract class Service {
  protected onInit(): void {}
  
  protected onEnterScene(): void {}
  
  protected onUpdate(_dt: number): void {}
  
  protected onExitScene(): void {}
  
  protected onDestroy(): void {}

  init(): void {
    this.onInit();
  }

  enterScene(): void {
    this.onEnterScene();
  }

  update(dt: number): void {
    this.onUpdate(dt);
  }

  exitScene(): void {
    this.onExitScene();
  }

  destroy(): void {
    this.onDestroy();
  }
}