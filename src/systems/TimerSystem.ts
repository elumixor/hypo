import { EventEmitter } from "@elumixor/frontils";
import { gsap } from "gsap";
import { BaseService } from "../services/BaseService";

export interface TimerData {
  deltaTime: number;
  totalTime: number;
  timeScale: number;
}

export interface FixedTimerData {
  deltaTime: number;
  totalTime: number;
}

/**
 * Advanced timer system using GSAP's ticker
 * Provides both scaled (game time affected by slow motion) and fixed (real time) timers
 */
export class TimerSystem extends BaseService {
  private _timeScale = 1;
  private _scaledTime = 0;
  private _fixedTime = 0;
  private _lastTime = 0;
  private _isRunning = false;

  // Events
  readonly onScaledTick = new EventEmitter<TimerData>();
  readonly onFixedTick = new EventEmitter<FixedTimerData>();
  readonly onTimeScaleChanged = new EventEmitter<number>();

  constructor() {
    super();
    this.setupGSAPTicker();
    this.start();
  }

  protected override onDestroy() {
    this.stop();
    gsap.ticker.remove(this.tick);
  }

  /**
   * Get current time scale (1 = normal, 0.5 = half speed, 2 = double speed)
   */
  get timeScale(): number {
    return this._timeScale;
  }

  /**
   * Set time scale for slow motion / time dilation effects
   */
  set timeScale(scale: number) {
    if (scale < 0) throw new Error("Time scale cannot be negative");

    const oldScale = this._timeScale;
    this._timeScale = scale;

    if (oldScale !== scale) {
      this.onTimeScaleChanged.emit(scale);
      log("Timer", `Time scale changed: ${oldScale} -> ${scale}`);
    }
  }

  /**
   * Get scaled game time (affected by time scale)
   */
  get scaledTime(): number {
    return this._scaledTime;
  }

  /**
   * Get fixed real time (not affected by time scale)
   */
  get fixedTime(): number {
    return this._fixedTime;
  }

  /**
   * Check if timer is running
   */
  get isRunning(): boolean {
    return this._isRunning;
  }

  /**
   * Start the timer system
   */
  start() {
    if (this._isRunning) return;

    this._isRunning = true;
    this._lastTime = gsap.ticker.time;
    gsap.ticker.add(this.tick);
    log("Timer", "Timer system started");
  }

  /**
   * Stop the timer system
   */
  stop() {
    if (!this._isRunning) return;

    this._isRunning = false;
    gsap.ticker.remove(this.tick);
    log("Timer", "Timer system stopped");
  }

  /**
   * Pause the timer system (keeps ticker running but stops time progression)
   */
  pause() {
    this._timeScale = 0;
    log("Timer", "Timer system paused");
  }

  /**
   * Resume the timer system with normal time scale
   */
  resume() {
    this._timeScale = 1;
    log("Timer", "Timer system resumed");
  }

  /**
   * Create a slow motion effect that automatically returns to normal
   */
  slowMotion(scale: number, duration: number) {
    const originalScale = this._timeScale;
    this.timeScale = scale;

    // Use GSAP to smoothly return to original time scale
    gsap.to(this, {
      duration: duration / 1000, // Convert to seconds for GSAP
      timeScale: originalScale,
      ease: "power2.out",
      onComplete: () => {
        log("Timer", `Slow motion effect completed, returned to scale ${originalScale}`);
      },
    });

    log("Timer", `Slow motion started: scale=${scale}, duration=${duration}ms`);
  }

  /**
   * Create a time freeze effect
   */
  freeze(duration: number) {
    const originalScale = this._timeScale;
    this.timeScale = 0;

    gsap.delayedCall(duration / 1000, () => {
      this.timeScale = originalScale;
      log("Timer", `Time freeze ended, returned to scale ${originalScale}`);
    });

    log("Timer", `Time freeze started for ${duration}ms`);
  }

  /**
   * Reset all timers to zero
   */
  reset() {
    this._scaledTime = 0;
    this._fixedTime = 0;
    this._lastTime = gsap.ticker.time;
    log("Timer", "Timers reset");
  }

  /**
   * Get timer statistics
   */
  getStats(): {
    scaledTime: number;
    fixedTime: number;
    timeScale: number;
    isRunning: boolean;
  } {
    return {
      scaledTime: this._scaledTime,
      fixedTime: this._fixedTime,
      timeScale: this._timeScale,
      isRunning: this._isRunning,
    };
  }

  private setupGSAPTicker() {
    // Configure GSAP ticker for optimal performance
    gsap.ticker.fps(60); // Target 60 FPS
    gsap.ticker.lagSmoothing(500, 33); // Handle lag spikes gracefully
  }

  private readonly tick = () => {
    if (!this._isRunning) return;

    const currentTime = gsap.ticker.time;
    const fixedDelta = currentTime - this._lastTime;
    const scaledDelta = fixedDelta * this._timeScale;

    this._fixedTime += fixedDelta;
    this._scaledTime += scaledDelta;
    this._lastTime = currentTime;

    // Emit events for systems that need timing
    this.onFixedTick.emit({
      deltaTime: fixedDelta,
      totalTime: this._fixedTime,
    });

    this.onScaledTick.emit({
      deltaTime: scaledDelta,
      totalTime: this._scaledTime,
      timeScale: this._timeScale,
    });
  };
}
