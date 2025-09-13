export type UpdateFn = (dt: number, t: number) => void;

export class Loop {
  private last = performance.now();
  private fpsTimer = 0;
  private frames = 0;
  fps = 0;
  updates: UpdateFn[] = [];
  start() {
    requestAnimationFrame(this.tick.bind(this));
  }
  add(fn: UpdateFn) {
    this.updates.push(fn);
  }
  private tick(time: number) {
    const dt = (time - this.last) / 1000;
    this.last = time;
    for (const u of this.updates) u(dt, time);
    this.fpsTimer += dt;
    this.frames++;
    if (this.fpsTimer >= 0.5) {
      this.fps = this.frames / this.fpsTimer;
      this.frames = 0;
      this.fpsTimer = 0;
    }
    requestAnimationFrame(this.tick.bind(this));
  }
}
