import { EventEmitter } from "@elumixor/frontils";
import { Service } from "@engine";

export interface TimeData {
  deltaTime: number;
  totalTime: number;
}

export class TimeService extends Service {
  readonly onScaledTick = new EventEmitter<TimeData>();
  readonly onFixedTick = new EventEmitter<TimeData>();
  readonly onTimeScaleChanged = new EventEmitter<{ timeScale: number }>();

  private timeScale = 1.0;
  private totalTime = 0;
  private isRunning = false;

  get currentTimeScale(): number {
    return this.timeScale;
  }

  get totalGameTime(): number {
    return this.totalTime;
  }

  override async init(): Promise<void> {
    await super.init();
    this.start();
  }

  override destroy(): void {
    this.stop();
    super.destroy();
  }

  start(): void {
    this.isRunning = true;
  }

  stop(): void {
    this.isRunning = false;
  }

  override update(dt: number): void {
    super.update(dt);

    if (!this.isRunning) return;

    const scaledDt = dt * this.timeScale;
    this.totalTime += scaledDt;

    // Emit scaled time (affected by slow motion, etc.)
    this.onScaledTick.emit({
      deltaTime: scaledDt,
      totalTime: this.totalTime,
    });

    // Emit fixed time (real time, unaffected by time scale)
    this.onFixedTick.emit({
      deltaTime: dt,
      totalTime: this.totalTime / this.timeScale,
    });
  }

  setTimeScale(scale: number): void {
    this.timeScale = Math.max(0, scale);
    this.onTimeScaleChanged.emit({ timeScale: this.timeScale });
  }

  slowMotion(scale: number, duration: number): void {
    const originalScale = this.timeScale;
    this.setTimeScale(scale);

    // Restore original time scale after duration (using real time)
    setTimeout(() => {
      this.setTimeScale(originalScale);
    }, duration);
  }

  // Utility methods for common time operations
  pause(): void {
    this.setTimeScale(0);
  }

  resume(): void {
    this.setTimeScale(1);
  }
}
