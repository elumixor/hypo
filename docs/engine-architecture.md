# Engine Architecture

This document describes the unified modular engine architecture for HYPO.

## Core Classes

### Entity
Base class for all game objects. Entities can have behaviors attached to them.

```typescript
import { Entity } from "@engine";
import { HealthBehavior } from "../behaviors/health-behavior";

export class Player extends Entity {
  constructor() {
    super();
    this.addBehavior(new HealthBehavior(100));
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

  onInit(): void {
    // Access services through this.getService()
  }
}
```

### Service
Systems that manage state and communication. Use EventEmitters for communication.

```typescript
import { Service } from "@engine";
import { EventEmitter } from "@elumixor/frontils";

export class CombatService extends Service {
  readonly entityDamaged = new EventEmitter<{ entity: Entity; amount: number }>();

  damageEntity(entity: Entity, amount: number): void {
    this.entityDamaged.emit({ entity, amount });
  }
}
```

### Widget
UI components that can subscribe to services.

```typescript
import { Widget } from "@engine";
import { CombatService } from "../services/combat-service";

export class HUD extends Widget {
  onInit(): void {
    const combat = this.getService(CombatService);
    combat.entityDamaged.subscribe(({ entity, amount }) => {
      // Update UI
    });
  }
}
```

### Scene
Manages entities, widgets, and scene-scoped services.

```typescript
import { Scene } from "@engine";

export class CombatScene extends Scene {
  onInit(): void {
    this.addService(new CombatService());
    this.addWidget(new HUD());
    this.addEntity(new Player());
  }
}
```

### Game
Root controller that manages services and active scenes.

```typescript
import { Game } from "@engine";

export class GameHypo extends Game {
  onInit(): void {
    this.registerScene(new CombatScene("combat"));
    this.switchToScene("combat");
  }
}
```

## Lifecycle Methods

All classes implement consistent public lifecycle methods:

- `onInit()`: Called once when fully constructed
- `onEnterScene()`: Called when becoming active in a scene
- `onUpdate(dt: number)`: Called every frame
- `onExitScene()`: Called when removed from scene
- `onDestroy()`: Called for cleanup

## Key Features

- **Direct Method Access**: All lifecycle methods are public - call them directly
- **Public Fields**: Access `entity`, `scene` fields directly without getters/setters
- **Type Safety**: Constructor type `Constructor<T>` for better type inference
- **No IDs**: Entities don't have IDs - managed by reference
- **Event-Driven Communication**: Services use EventEmitters for loose coupling

## Usage

```typescript
import { GameHypo } from "./game";

const game = new GameHypo();
game.init();

// Game loop
function gameLoop(dt: number) {
  game.update(dt);
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
```