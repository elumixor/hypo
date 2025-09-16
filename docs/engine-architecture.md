# Engine Architecture

This document describes the unified modular engine architecture for HYPO.

## Core Classes

### Entity

Base class for all game objects. Entities can have behaviors attached to them and are rendered in the 3D scene.

```typescript
import { Entity } from "@engine";
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

export class Dummy extends Entity {
  readonly mesh: Mesh;

  constructor() {
    super();

    // Create Three.js mesh
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({ color: 0x00ff00 });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set(0, 0.5, 0);
  }

  override async init() {
    await super.init();

    // Add to scene's Three.js Group
    this.scene.sceneRoot.add(this.mesh);
  }

  override destroy() {
    super.destroy();

    // Clean up resources
    this.scene.sceneRoot.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
```

### Behavior

Modular, reusable logic components that can be attached to entities.

```typescript
import { Behavior } from "@engine";

export class HealthBehavior extends Behavior {
  constructor(private health: number) {
    super();
  }

  async init(): Promise<void> {
    // Access services through this.getService()
  }
}
```

### Service

Systems that manage state and communication. Use EventEmitters for communication.

```typescript
import { Service } from "@engine";
import { EventEmitter } from "@elumixor/frontils";

export class LoaderService extends Service {
  readonly loadProgress = new EventEmitter<{ percentage: number }>();

  async loadAsset(url: string): Promise<void> {
    // Loading logic
    this.loadProgress.emit({ percentage: 50 });
  }
}
```

### Widget

UI components built with PixiJS that can subscribe to services and handle user interaction.

```typescript
import { Widget } from "@engine";
import { Text as PixiText } from "pixi.js";
import { Button } from "ui/button";

export class MenuWidget extends Widget {
  private readonly titleText = new PixiText({ text: "Game Title" });
  private readonly startButton = new Button("Start Game");

  constructor() {
    super();
    this.addChild(this.titleText, this.startButton);

    this.startButton.clicked.subscribe(() => {
      // Handle button click
    });
  }

  override async init() {
    await super.init();
    this.game.resized.subscribeImmediate(this.resize.bind(this));
  }

  private resize({ width, height }: { width: number; height: number }) {
    this.startButton.y = -height / 2 + 200;
  }
}
```

### Scene

Manages entities, widgets, and scene-scoped services. Contains both 3D (sceneRoot) and UI (uiRoot) containers.

```typescript
import { Scene } from "@engine";
import { MenuWidget } from "./ui/menu.widget";
import { RotatingCube } from "entities/dummy";

export class MenuScene extends Scene {
  constructor() {
    super();

    this.addWidget(new MenuWidget());
    this.addEntity(new RotatingCube());
  }
}
```

### Game

Root controller that manages global services, scenes, and rendering systems (Three.js + PixiJS).

```typescript
import { Game } from "@engine";
import { MenuScene } from "scenes/menu/menu.scene";
import { LoaderService } from "services/loader.service";

export class GameHypo extends Game {
  readonly menuScene = new MenuScene();

  constructor() {
    super();
    this.addService(new LoaderService());
  }

  override async start() {
    await super.start();
    await this.loadScene(this.menuScene);
  }
}
```

## Rendering Architecture

The engine uses a dual-rendering system:

- **Three.js**: For 3D graphics (`game.sceneRoot`, `scene.sceneRoot`)
- **PixiJS**: For UI elements (`game.uiRoot`, `scene.uiRoot`)

Entities add their 3D meshes to `this.scene.sceneRoot`, while Widgets add UI elements to themselves (they extend PixiJS Container).

## Lifecycle Methods

All classes implement consistent async lifecycle methods:

- `async init()`: Called when becoming active in a scene
- `update(dt: number)`: Called every frame
- `destroy()`: Called for cleanup

## Order of initialization

1. Game `start()`
2. Global services `init()`
3. Scene `init()`
4. Scene services `init()`
5. Entities `init()`
6. Behaviors `init()`
7. Widgets `init()`

## Init vs Constructor

- Put setup logic in `constructor()`
- Use `async init()` when you need:
  - References to scene/game
  - Service access
  - Async operations (loading, etc.)

## Key Features

- **Async Initialization**: All init methods are async for loading operations
- **Direct Access**: Access `entity`, `scene`, `game` fields directly
- **Type Safety**: Strong TypeScript typing throughout
- **Resource Management**: Proper cleanup in destroy methods
- **Event-Driven**: Services use EventEmitters for communication
- **Dual Rendering**: Three.js for 3D, PixiJS for UI

## Current Implementation Status

### ✅ Correctly Implemented (New Architecture)

- `src/main.ts` - Entry point
- `src/game.ts` - Game class
- `src/resources.ts` - Resource definitions
- `src/services/loader.service.ts` - Asset loading
- `src/scenes/menu/menu.scene.ts` - Menu scene
- `src/scenes/menu/ui/menu.widget.ts` - Menu UI
- `src/ui/fonts.ts` - Font definitions
- `src/ui/button.ts` - Button component
- `src/entities/dummy.ts` - Example entity

### ❌ Needs Refactoring (Old Architecture)

- All other files in `src/` directory
- Most services, entities, behaviors, UI components
- Combat scene and related systems
- Character system
- State management
