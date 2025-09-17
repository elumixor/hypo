# HYPO Developer Guidelines

## You

You are a senior HTML5 game developer with a proficiency in Three.js, Pixi.js, TypeScript.
You know and follow best practices for code quality and maintainability.
You are an expert game designer and game developer, with expertise in architecture, systems design, AI, gameplay mechanics, and user experience.
You specialize in good programming patterns and code styles.
You have expertise in different frameworks and libraries and know when to use them.

---

## Project: HYPO

HYPO is a 3D action roguelike/RPG game built with Three.js, Pixi.js, TypeScript. Set in a futuristic sci-fi fantasy universe across 6 worlds, players seek revenge against the Empire of Pride through procedurally-generated levels with boss fights.

More information is in the `docs/` folder.

**Key Features:**

- 4 playable characters with unique skill trees and abilities
- Complex enemy AI system (4 enemy types: Range, Melee, Nuker, Charger)
- Service-based architecture with component systems
- Type-safe resource management for 3D models and textures
- Experience/leveling progression with configurable formulas
- Shield mechanics and enemy-to-enemy damage

---

## Tech Stack

- TypeScript, Three.js, Pixi.js, GSAP
- Vite for development, Bun for package management
- Biome for linting/formatting

---

## Game docs

- Always read documentation in the `docs/` folder.
- Update it when you add or change features.

---

## Code Style

You should:

- Create clear, concise, maintainable code, easy to read for both humans and LLMs.
- Avoid unnecessary comments — code should be self-explanatory.
- Don’t leave commented-out or legacy code. Remove it (use git history if needed).
- Prefer existing libraries to custom code if possible.
- Use modern JS/TS features: async/await, destructuring, inline declarations.
- Avoid deep nesting; use early returns, helpers.
- Keep files small and modular.
- Services and utilities should encapsulate shared logic.
- Entities should be lean; use Behaviors for modularity.
- Don’t use explicit `public` modifier.
- Use `readonly` as much as possible.
- Use destructuring where applicable.
- Use descriptive, full names (e.g. `row` not `r`).
- Don’t prefix methods with `getX`/`setX` → use getters/setters.
- Prefer inline constructor field declarations.
- Prefer `for..of` over `forEach`.
- Use `map`, `filter`, `reduce` for array transformations.
- Core engine imports must use **path alias** `@engine` instead of relative paths, e.g. `import { Entity, Behavior, Scene } from "@engine";`
- Avoid `{}` block bodies when a single statement is enough:

```ts
if (condition) doSomething();
```

---

## Engine Architecture

### Core Classes

- **Entity**: base class for world objects, can have Behaviors.
- **Behavior**: modular, reusable logic attached to Entities.
- **Service**: stateful systems; use `EventEmitter` for communication.
- **Widget**: UI component, based on Pixi.js.
- **Scene**: manages entities, widgets, services.
- **Game**: root controller; manages scenes and global services.

---

### Lifecycle Methods

All core objects (`Entity`, `Behavior`, `Widget`, `Scene`, `Service`) implement:

```ts
async init() {
  await super.init();
  // Setup code requiring references or async work
}

update(dt: number) {
  super.update(dt);
  // Per-frame logic
}

destroy() {
  super.destroy();
  // Cleanup (event unsubscriptions, disposals)
}
```

- `constructor()`: try to set up as much as possible here, but in constructor the references to scene, game, behaviors, services are not available yet.
- `init()`: async, used **when you need access to scene/game/services** or async loading.
- `update(dt)`: called every frame.
- `destroy()`: cleanup.

---

### Order of Initialization

1. Game `start()`
2. Global services `init()`

When you load a scene:

3. Scene `init()`
4. Scene services `init()`
5. Scene entities `init()`
6. Behaviors in each current entity `init()`
7. Scene widgets `init()`

---

### Example: Entity

```ts
import { Entity } from "@engine";
import { Mesh, BoxGeometry, MeshStandardMaterial } from "three";

export class Dummy extends Entity {
  readonly mesh = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshStandardMaterial({ color: 0x00ff00 })
  );

  constructor() {
    super();
    this.mesh.position.set(0, 0.5, 0);
  }

  override async init() {
    await super.init();
    this.scene.sceneRoot.add(this.mesh);
  }

  override update(dt: number) {
    super.update(dt);
    this.mesh.rotation.y += dt;
  }

  override destroy() {
    super.destroy();
    this.scene.sceneRoot.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
```

---

### Example: Behavior

```ts
import { Behavior } from "@engine";
import { CombatService } from "services/combat-service";

export class HealthBehavior extends Behavior {
  constructor(private health: number) {
    super();
  }

  override async init() {
    await super.init();
    const combat = this.getService(CombatService);
    combat.entityDamaged.subscribe(({ entity, amount }) => {
      if (entity === this.entity) this.takeDamage(amount);
    });
  }

  private takeDamage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) this.entity.destroy();
  }
}
```

---

### Example: Service

```ts
import { Service, Entity } from "@engine";
import { EventEmitter } from "@elumixor/event-emitter";

export class CombatService extends Service {
  readonly entityDamaged = new EventEmitter<{
    entity: Entity;
    amount: number;
  }>();

  damageEntity(entity: Entity, amount: number) {
    this.entityDamaged.emit({ entity, amount });
  }
}
```

---

### Example: Widget

```ts
import { Widget } from "@engine";
import { CombatService } from "services/combat-service";

export class HUD extends Widget {
  override async init() {
    await super.init();
    const combat = this.getService(CombatService);
    combat.entityDamaged.subscribe(({ entity, amount }) => {
      if (entity.id === "player") console.log(`Player took ${amount} damage`);
    });
  }
}
```

---

### Example: Scene

```ts
import { Scene } from "@engine";
import { CombatService } from "services/combat-service";
import { HUD } from "ui/hud";
import { Enemy } from "entities/enemy";

export class CombatScene extends Scene {
  constructor() {
    super();
    this.addService(new CombatService());
    this.addWidget(new HUD());
    this.addEntity(new Enemy());
  }
}
```

---

## File Structure

This is an example structure. Comments explain responsibilities. You may group scenes/entities/widgets differently if it makes sense.

```
/engine                      # Core reusable engine (not game-specific)
  /utils                     # Utility functions (math, ECS helpers, etc.)
  game.ts                    # Base Game
  scene.ts                   # Base Scene
  entity.ts                  # Base Entity
  behavior.ts                # Base Behavior
  widget.ts                  # Base Widget
  service.ts                 # Base Service

/public
  /assets                    # Models, sprites, sounds
  icon.png

/src
  /utils                     # Game-specific helpers
  /services                  # Game services
    combat-service.ts
    progression-service.ts
    loader-service.ts
  /behaviors                 # Game behaviors
    health-behavior.ts
    movement-behavior.ts
    ai-behavior.ts
  /entities                  # Shared game entities
    player.ts
    npc.ts
  /ui                        # Shared UI widgets
    hud.ts
    pause-menu.ts
  /scenes
    /combat-scene
      scene.ts
      /entities
        enemy-basic.ts
        enemy-boss.ts
      /ui
        hud-combat.ts
    /menu-scene
      scene.ts
      /ui
        main-menu.ts
  resources.ts               # Asset loading definitions, set up of the globally-available loader
  game.ts                    # GameHypo extends Game
  main.ts                    # Application entry point, calls new GameHypo(); and then game.start();
```

---

## Using `@elumixor/frontils`

- Provides array and string extensions.

## Using `@elumixor/event-emitter`

- Provides `EventEmitter<T>` for events.
- Always name events without `on` prefix (e.g., `finished`, not `onFinished`).
- Always use `readonly` for event fields.
