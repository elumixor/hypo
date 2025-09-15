# Engine Architecture

This document describes the new modular engine architecture for HYPO.

## Core Classes

### Entity
Base class for all game objects. Entities can have behaviors attached to them.

```typescript
import { Entity } from "@engine";
import { HealthBehavior } from "../behaviors/health-behavior";

export class Player extends Entity {
  constructor() {
    super("player");
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

  protected override onInit(): void {
    super.onInit();
    // Access services through this.getService()
  }
}
```

### Service
Global systems that manage state and communication. Use EventEmitters for communication.

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
  protected override onInit(): void {
    super.onInit();
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
  protected override onInit(): void {
    super.onInit();
    this.addService(new CombatService());
    this.addWidget(new HUD());
    this.addEntity(new Player());
  }
}
```

### Game
Root controller that manages global services and active scenes.

```typescript
import { Game } from "@engine";

export class GameHypo extends Game {
  protected override onInit(): void {
    super.onInit();
    this.registerScene(new CombatScene());
    this.switchToScene("combat");
  }
}
```

## Lifecycle Methods

All classes implement consistent lifecycle methods:

- `onInit()`: Called once when fully constructed
- `onEnterScene()`: Called when becoming active in a scene
- `onUpdate(dt: number)`: Called every frame
- `onExitScene()`: Called when removed from scene
- `onDestroy()`: Called for cleanup

## Implementation Status

- ✅ Engine foundation (Entity, Behavior, Service, Widget, Scene, Game)
- ✅ Core services (Combat, Health, Progression, Time)
- ✅ Core behaviors (Health, Movement, AI)
- ✅ Entity implementations (Player, Enemy)
- ✅ Scene implementations (Combat, Menu, SafeZone)
- ✅ Widget implementations (HUD)
- ✅ Complete game loop with GameHypo

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