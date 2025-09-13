/**
 * Base class for all game services
 * Services are initialized immediately in constructor
 */
export abstract class BaseService {
  constructor() {
    log("Service", `${this.constructor.name} initialized`);
  }

  /**
   * Clean up the service
   * Called when the game is destroyed or reset
   */
  destroy() {
    this.onDestroy();
    log("Service", `${this.constructor.name} destroyed`);
  }

  /**
   * Override this method to implement service cleanup
   */
  protected onDestroy() {
    // Override in subclass
  }
}
