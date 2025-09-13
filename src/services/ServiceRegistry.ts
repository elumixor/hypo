import type { BaseService } from "./BaseService";

type ServiceConstructor<T extends BaseService = BaseService> = new (...args: unknown[]) => T;

/**
 * Central registry for all game services
 * Provides dependency injection and service lifecycle management
 */
export class ServiceRegistry {
  private static _instance?: ServiceRegistry;
  private readonly services = new Map<ServiceConstructor, BaseService>();
  private readonly serviceInstances = new Map<string, BaseService>();

  private constructor() {}

  /**
   * Get the singleton instance
   */
  static get instance(): ServiceRegistry {
    if (!ServiceRegistry._instance) {
      ServiceRegistry._instance = new ServiceRegistry();
    }
    return ServiceRegistry._instance;
  }

  /**
   * Register a service instance
   */
  register<T extends BaseService>(service: T): T {
    const ServiceConstructor = service.constructor as ServiceConstructor<T>;
    const serviceName = ServiceConstructor.name;

    if (this.services.has(ServiceConstructor)) {
      throw new Error(`Service ${serviceName} is already registered`);
    }

    this.services.set(ServiceConstructor, service);
    this.serviceInstances.set(serviceName, service);

    log("ServiceRegistry", `Registered service: ${serviceName}`);
    return service;
  }

  /**
   * Get a service by type
   */
  get<T extends BaseService>(ServiceClass: ServiceConstructor<T>): T {
    const service = this.services.get(ServiceClass) as T;
    if (!service) {
      throw new Error(`Service ${ServiceClass.name} is not registered`);
    }
    return service;
  }

  /**
   * Get a service by name
   */
  getByName<T extends BaseService>(serviceName: string): T {
    const service = this.serviceInstances.get(serviceName) as T;
    if (!service) {
      throw new Error(`Service ${serviceName} is not registered`);
    }
    return service;
  }

  /**
   * Check if a service is registered
   */
  has<T extends BaseService>(ServiceClass: ServiceConstructor<T>): boolean {
    return this.services.has(ServiceClass);
  }

  /**
   * Check if a service is registered by name
   */
  hasByName(serviceName: string): boolean {
    return this.serviceInstances.has(serviceName);
  }

  /**
   * Destroy all services and clear registry
   */
  destroy() {
    log("ServiceRegistry", "Destroying services...");

    for (const service of this.services.values()) {
      service.destroy();
    }

    this.services.clear();
    this.serviceInstances.clear();

    log("ServiceRegistry", "All services destroyed");
  }

  /**
   * Get all registered service names
   */
  getServiceNames(): string[] {
    return Array.from(this.serviceInstances.keys());
  }

  /**
   * Get service count
   */
  get serviceCount(): number {
    return this.services.size;
  }
}

// Global service accessor functions for convenience
export const Services = ServiceRegistry.instance;
