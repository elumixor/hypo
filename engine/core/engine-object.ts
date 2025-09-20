import type { Awaitable, EventEmitter } from "@elumixor/event-emitter";
import type { Constructor, ISubscription } from "@elumixor/frontils";
import type { Behavior } from "./behavior";
import type { Entity } from "./entity";
import type { Service } from "./service";

export class EngineObject {
  private readonly requirements = [] as { id: symbol; requirement: Constructor<Behavior | Service> }[];
  private readonly disposables = [] as { destroy(): void }[];

  protected _enabled = true;
  get enabled() {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  get name() {
    return this.constructor.name;
  }

  async init() {
    this.resolveRequirements();
    return;
  }

  update(_dt: number) {
    return;
  }

  destroy() {
    this.enabled = false;

    for (const disposable of this.disposables) disposable.destroy();
  }

  /**
   * Require a behavior or service - it will get injected automatically on `init()`
   * @param obj Class of the required behavior or service
   * @returns The instance of the required behavior or service. Note: this is only valid after `init()` has been called!
   */
  protected require<T extends Behavior | Service>(obj: Constructor<T>): T {
    const id = Symbol();
    this.requirements.push({ id, requirement: obj });
    return id as unknown as T;
  }

  /** Subscribe to an event emitter and automatically unsubscribe on destroy */
  protected on<T>(eventEmitter: EventEmitter<T>, handler: (event: T) => Awaitable<unknown>) {
    const subscription = eventEmitter.subscribe(handler);

    this.addDisposable({
      destroy() {
        subscription.unsubscribe();
      },
    });
  }

  /**
   * Subscribe to an event emitter and automatically unsubscribe on destroy.
   * The handler is called immediately if the event has a current value.
   */
  protected onImmediate<T>(eventEmitter: EventEmitter<T>, handler: (event: T) => Awaitable<unknown>) {
    const subscription = eventEmitter.subscribeImmediate(handler);

    this.addDisposable({
      destroy() {
        subscription.unsubscribe();
      },
    });
  }

  /**
   * Cast the object to a different type.
   * @throws If the object is not of the requested type.
   */
  as<T extends object>(ctor: Constructor<T>): this & T {
    if (this instanceof ctor) return this;
    throw new Error(`Object is not of type ${ctor.name}`);
  }

  protected addDisposable(disposable: ISubscription | { destroy(): void }) {
    if ("unsubscribe" in disposable) {
      this.disposables.push({ destroy: () => disposable.unsubscribe() });
      return;
    }
    this.disposables.push(disposable);
  }

  /** Handy logging function that prepends the colored name. */
  protected log(...args: unknown[]) {
    log(this.name, ...args);
  }

  /** Handy warning logging function that prepends the colored name. */
  protected logWarning(...args: unknown[]) {
    logWarning(this.name, ...args);
  }

  /** Handy error logging function that prepends the colored name. */
  protected logError(...args: unknown[]) {
    logError(this.name, ...args);
  }

  // Magic function to resolve requirements
  private resolveRequirements() {
    for (const { id, requirement } of this.requirements) {
      // Resolve the requirement - get the instance
      let value: Behavior | Service;
      try {
        value = (this as unknown as Entity | Behavior).getBehavior(requirement as Constructor<Behavior>);
      } catch {
        value = (this as unknown as Entity | Behavior).getService(requirement as Constructor<Service>);
      }

      // Search for the field associated with the symbol and set it
      for (const key of Object.getOwnPropertyNames(this)) {
        if ((this as unknown as { [key: string]: unknown })[key] === id) {
          (this as unknown as { [key: string]: unknown })[key] = value;
          break;
        }
      }
    }
  }
}
