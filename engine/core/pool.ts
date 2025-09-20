/**
 * Object pool for efficient reuse of expensive objects.
 * Reduces garbage collection pressure by reusing objects instead of creating new ones.
 */
export class Pool<T> {
  private readonly pool: T[] = [];
  private readonly activeObjects = new Set<T>();

  constructor(
    private readonly createFn: () => T,
    private readonly resetFn: (obj: T) => void,
    initialSize = 10,
  ) {
    // Pre-populate the pool with initial objects
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.createFn());
    }
  }

  /**
   * Get an object from the pool. If none available, creates a new one.
   */
  get(): T {
    let obj = this.pool.pop();

    if (!obj) {
      obj = this.createFn();
    }

    this.activeObjects.add(obj);
    return obj;
  }

  /**
   * Return an object to the pool for reuse.
   */
  release(obj: T): void {
    if (!this.activeObjects.has(obj)) {
      console.warn("Attempting to release object that was not obtained from this pool");
      return;
    }

    this.activeObjects.delete(obj);
    this.resetFn(obj);
    this.pool.push(obj);
  }

  /**
   * Get current pool statistics
   */
  getStats() {
    return {
      available: this.pool.length,
      active: this.activeObjects.size,
      total: this.pool.length + this.activeObjects.size,
    };
  }

  /**
   * Clear the pool and release all references
   */
  clear(): void {
    this.pool.length = 0;
    this.activeObjects.clear();
  }
}
