// Example file to test @engine imports with vite
import { Entity, Behavior, Service, Widget, Scene, Game } from "@engine";
import { EventEmitter } from "@elumixor/frontils";

// Example service using @engine import
export class ExampleService extends Service {
  readonly onExample = new EventEmitter<{ message: string }>();
  
  protected override onInit(): void {
    super.onInit();
    console.log("[ExampleService] Initialized");
  }
}

// Example behavior using @engine import  
export class ExampleBehavior extends Behavior {
  protected override onInit(): void {
    super.onInit();
    const service = this.getService(ExampleService);
    service.onExample.subscribe(({ message }) => {
      console.log(`[ExampleBehavior] Received: ${message}`);
    });
  }
}

// Example entity using @engine import
export class ExampleEntity extends Entity {
  constructor() {
    super();
    this.addBehavior(new ExampleBehavior());
  }
}

// Example widget using @engine import
export class ExampleWidget extends Widget {
  protected override onInit(): void {
    super.onInit();
    console.log("[ExampleWidget] Initialized");
  }
}

// Example scene using @engine import
export class ExampleScene extends Scene {
  protected override onInit(): void {
    super.onInit();
    this.addService(new ExampleService());
    this.addWidget(new ExampleWidget());
    this.addEntity(new ExampleEntity());
  }
}

// Example game using @engine import
export class ExampleGame extends Game {
  protected override onInit(): void {
    super.onInit();
    this.registerScene(new ExampleScene());
    this.switchToScene("example");
  }
}

console.log("✅ @engine imports working correctly!");