import { describe, expect, it } from "bun:test";
import { Pool } from "./pool";

// Simple test object
class TestObject {
  value = 0;

  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  reset() {
    this.value = 0;
  }
}

describe("Pool", () => {
  it("should create objects when pool is empty", () => {
    const pool = new Pool<TestObject>(
      () => new TestObject(42),
      (obj) => obj.reset(),
      2,
    );

    const obj = pool.get();
    expect(obj.value).toBe(42);
  });

  it("should reuse objects from pool", () => {
    const pool = new Pool<TestObject>(
      () => new TestObject(42),
      (obj) => obj.reset(),
      2,
    );

    const obj1 = pool.get();
    obj1.value = 100;

    pool.release(obj1);

    const obj2 = pool.get();
    expect(obj2).toBe(obj1); // Same object reference
    expect(obj2.value).toBe(0); // Reset was called
  });

  it("should track pool statistics correctly", () => {
    const pool = new Pool<TestObject>(
      () => new TestObject(),
      (obj) => obj.reset(),
      3,
    );

    let stats = pool.getStats();
    expect(stats.available).toBe(3);
    expect(stats.active).toBe(0);
    expect(stats.total).toBe(3);

    const obj1 = pool.get();
    pool.get(); // Get second object

    stats = pool.getStats();
    expect(stats.available).toBe(1);
    expect(stats.active).toBe(2);
    expect(stats.total).toBe(3);

    pool.release(obj1);

    stats = pool.getStats();
    expect(stats.available).toBe(2);
    expect(stats.active).toBe(1);
    expect(stats.total).toBe(3);
  });

  it("should handle releasing objects not from pool gracefully", () => {
    const pool = new Pool<TestObject>(
      () => new TestObject(),
      (obj) => obj.reset(),
      1,
    );

    const outsideObj = new TestObject();

    // Should not throw and should log warning
    expect(() => pool.release(outsideObj)).not.toThrow();
  });

  it("should clear pool correctly", () => {
    const pool = new Pool<TestObject>(
      () => new TestObject(),
      (obj) => obj.reset(),
      2,
    );

    pool.get(); // Get an object to have something active
    pool.clear();

    const stats = pool.getStats();
    expect(stats.available).toBe(0);
    expect(stats.active).toBe(0);
    expect(stats.total).toBe(0);
  });
});
