import { type Application, Container } from "pixi.js";

/**
 * Base class for all UI components
 */
export abstract class UIComponent {
  protected container!: Container;
  protected app: Application;
  protected isVisible = true;

  constructor(app: Application) {
    this.app = app;
    this.container = new Container();
    this.init();
  }

  /**
   * Initialize the component (called by constructor)
   */
  protected abstract init(): void;

  /**
   * Update the component (called every frame if needed)
   */
  update?(deltaTime: number): void;

  /**
   * Get the container for this component
   */
  getContainer(): Container {
    return this.container;
  }

  /**
   * Show the component
   */
  show(): void {
    this.isVisible = true;
    this.container.visible = true;
  }

  /**
   * Hide the component
   */
  hide(): void {
    this.isVisible = false;
    this.container.visible = false;
  }

  /**
   * Toggle visibility
   */
  toggle(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Check if component is visible
   */
  get visible(): boolean {
    return this.isVisible;
  }

  /**
   * Set position
   */
  setPosition(x: number, y: number): void {
    this.container.position.set(x, y);
  }

  /**
   * Dispose of the component
   */
  dispose(): void {
    if (this.container.parent) {
      this.container.parent.removeChild(this.container);
    }
    this.container.destroy({ children: true });
  }
}

/**
 * UI Manager to handle all UI components
 */
export class UIManager {
  private readonly components = new Map<string, UIComponent>();
  private readonly app: Application;
  private readonly rootContainer: Container;

  constructor(app: Application) {
    this.app = app;
    this.rootContainer = new Container();
    this.app.stage.addChild(this.rootContainer);
  }

  /**
   * Add a component to the UI
   */
  addComponent<T extends UIComponent>(id: string, component: T): T {
    if (this.components.has(id)) {
      this.removeComponent(id);
    }

    this.components.set(id, component);
    this.rootContainer.addChild(component.getContainer());
    return component;
  }

  /**
   * Get a component by ID
   */
  getComponent<T extends UIComponent>(id: string): T | undefined {
    return this.components.get(id) as T;
  }

  /**
   * Remove a component
   */
  removeComponent(id: string): boolean {
    const component = this.components.get(id);
    if (!component) return false;

    component.dispose();
    this.components.delete(id);
    return true;
  }

  /**
   * Update all components
   */
  update(deltaTime: number): void {
    for (const component of this.components.values()) {
      if (component.update) {
        component.update(deltaTime);
      }
    }
  }

  /**
   * Show component
   */
  showComponent(id: string): void {
    const component = this.components.get(id);
    component?.show();
  }

  /**
   * Hide component
   */
  hideComponent(id: string): void {
    const component = this.components.get(id);
    component?.hide();
  }

  /**
   * Clear all components
   */
  clear(): void {
    for (const component of this.components.values()) {
      component.dispose();
    }
    this.components.clear();
  }

  /**
   * Dispose of the UI manager
   */
  dispose(): void {
    this.clear();
    this.rootContainer.destroy({ children: true });
  }
}
