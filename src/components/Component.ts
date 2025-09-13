import type * as THREE from "three";

type ComponentConstructor<T extends Component = Component> = new (...args: unknown[]) => T;

/**
 * Base class for all game components
 * Components provide specific functionality and can be attached to entities
 */
export abstract class Component {
  protected _entity?: THREE.Object3D;
  protected _enabled = true;

  /**
   * Get the entity this component is attached to
   */
  get entity(): THREE.Object3D | undefined {
    return this._entity;
  }

  /**
   * Check if this component is enabled
   */
  get enabled(): boolean {
    return this._enabled;
  }

  /**
   * Enable or disable this component
   */
  set enabled(value: boolean) {
    if (value !== this._enabled) {
      this._enabled = value;
      if (value) {
        this.onEnable();
      } else {
        this.onDisable();
      }
    }
  }

  /**
   * Attach this component to an entity
   */
  attach(entity: THREE.Object3D) {
    if (this._entity === entity) return;

    if (this._entity) {
      this.detach();
    }

    this._entity = entity;
    this.onAttach();
  }

  /**
   * Detach this component from its entity
   */
  detach() {
    if (!this._entity) return;

    this.onDetach();
    this._entity = undefined;
  }

  /**
   * Update this component
   */
  update(deltaTime: number) {
    if (!this._enabled) return;
    this.onUpdate(deltaTime);
  }

  /**
   * Destroy this component and clean up resources
   */
  destroy() {
    this.onDestroy();
    this.detach();
  }

  /**
   * Called when component is attached to an entity
   */
  protected onAttach() {
    // Override in subclass
  }

  /**
   * Called when component is detached from an entity
   */
  protected onDetach() {
    // Override in subclass
  }

  /**
   * Called when component is enabled
   */
  protected onEnable() {
    // Override in subclass
  }

  /**
   * Called when component is disabled
   */
  protected onDisable() {
    // Override in subclass
  }

  /**
   * Called every frame when enabled
   */
  protected onUpdate(_deltaTime: number) {
    // Override in subclass
  }

  /**
   * Called when component is destroyed
   */
  protected onDestroy() {
    // Override in subclass
  }
}

/**
 * Component manager for handling multiple components on an entity
 */
export class ComponentManager {
  private readonly components = new Map<string, Component>();
  private readonly componentsByType = new Map<ComponentConstructor, Component[]>();

  constructor(private readonly entity: THREE.Object3D) {}

  /**
   * Add a component to this entity
   */
  addComponent<T extends Component>(component: T): T {
    const typeName = component.constructor.name;

    if (this.components.has(typeName)) {
      throw new Error(`Component ${typeName} already exists on this entity`);
    }

    this.components.set(typeName, component);

    // Track by type for fast lookups
    const ComponentClass = component.constructor as ComponentConstructor;
    if (!this.componentsByType.has(ComponentClass)) {
      this.componentsByType.set(ComponentClass, []);
    }
    const typeComponents = this.componentsByType.get(ComponentClass);
    if (typeComponents) {
      typeComponents.push(component);
    }

    component.attach(this.entity);
    return component;
  }

  /**
   * Get a component by type
   */
  getComponent<T extends Component>(ComponentClass: ComponentConstructor<T>): T | undefined {
    const components = this.componentsByType.get(ComponentClass as ComponentConstructor);
    return components?.[0] as T | undefined;
  }

  /**
   * Get all components of a specific type
   */
  getComponents<T extends Component>(ComponentClass: ComponentConstructor<T>): T[] {
    return (this.componentsByType.get(ComponentClass as ComponentConstructor) as T[]) || [];
  }

  /**
   * Remove a component
   */
  removeComponent<T extends Component>(ComponentClass: ComponentConstructor<T>): boolean {
    const component = this.getComponent(ComponentClass);
    if (!component) return false;

    const typeName = ComponentClass.name;
    this.components.delete(typeName);

    const typeComponents = this.componentsByType.get(ComponentClass);
    if (typeComponents) {
      const index = typeComponents.indexOf(component);
      if (index >= 0) {
        typeComponents.splice(index, 1);
        if (typeComponents.length === 0) {
          this.componentsByType.delete(ComponentClass);
        }
      }
    }

    component.destroy();
    return true;
  }

  /**
   * Check if entity has a component of given type
   */
  hasComponent<T extends Component>(ComponentClass: ComponentConstructor<T>): boolean {
    return this.getComponent(ComponentClass) !== undefined;
  }

  /**
   * Update all components
   */
  update(deltaTime: number) {
    for (const component of this.components.values()) {
      component.update(deltaTime);
    }
  }

  /**
   * Destroy all components
   */
  destroy() {
    for (const component of this.components.values()) {
      component.destroy();
    }
    this.components.clear();
    this.componentsByType.clear();
  }

  /**
   * Get all components
   */
  getAllComponents(): Component[] {
    return Array.from(this.components.values());
  }
}
