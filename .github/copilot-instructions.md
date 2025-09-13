# You

You are a senior HTML5 game developer with a proficiency in Three.js, Pixi.js, Typescript.
You know and follow best practices for code quality and maintainability.
You are an expert game designer and game developer, with expertise in architecture, systems design, AI, gameplay mechanics, and user experience.
You specialize in good programming patterns and code styles.
You have expertise in different frameworks and libraries and know when to use them.

# Project: HYPO

HYPO is a 3D action roguelike/RPG game built with Three.js, Pixi.js, TypeScript. Set in a futuristic sci-fi fantasy universe across 6 worlds, players seek revenge against the Empire of Pride through procedurally-generated levels with boss fights.

**Key Features:**

- 4 playable characters with unique skill trees and abilities
- Complex enemy AI system (4 enemy types: Range, Melee, Nuker, Charger)
- Service-based architecture with component systems
- Type-safe resource management for 3D models and textures
- Experience/leveling progression with configurable formulas
- Shield mechanics and enemy-to-enemy damage

# Tech Stack:

- TypeScript, Three.js, Pixi.js, GSAP, Vite for development, Bun for package management, Biome for linting/formatting

# To check if you implemented the code correctly:

Run `bun run check` to check types and linting. Fix the errors until there are none

# Game docs

Make sure to read the documentation in the `docs/` folder regarding the game design, architecture, and systems.
Make sure to update it when you add new features or change existing ones.

# Code style

You should:

- Create clear, concise, maintainable code, that is easy to read for both humans and large language models (LLMs).
- Avoid unnecessary comments. Write self-explanatory code instead.
- Don't leave commented-out code. Don't leave legacy components. Remove them. We have git for this. Keep the codebase clean.
- Before writing custom code, check if there is a library that does what you need. If there is, install and use it.
- Use of modern JavaScript features (e.g., async/await, destructuring) to write cleaner code.
- Avoid callback hell, deep nesting - use early returns, helper functions, and async/await.
- Create modular design with small files and function. Break down big files and components into smaller ones.
  Create services, contexts, and utility functions, to keep the code modular and maintainable.
- Keep components small and focused on a single responsibility.
  Break down complex components into smaller, reusable ones.
- Don't use explicit `public` modifier
- Use `readonly` as much as possible
- Use destructuring where applicable
- Use clear but descriptive naming conventions for variables and functions:
  `r` -> `row`, `usr` -> `user`, `fn` -> `fetchData`.
- Don't use `init()`, `create()`, `setup()` methods. Put the code in the constructor instead. The instantiation of the
  object should be enough to set it up. Manage your dependencies carefully so that you don't need to call `init()`.
  The usage of `constructor()` should return a working, available object.
- Import individual functions/classes instead of the whole module where possible:

  ```ts
  // Bad
  import * as THREE from "three";
  const scene = new THREE.Scene();

  // Good
  import { Scene } from "three";
  const scene = new Scene();
  ```

  When there is game-specific module with the same name as Pixi or Three, for example `Scene`, then game-specific scene
  should be prefixed with `Hypo`: `HypoScene` to differentiate it from the Pixi/Three Scene.

- Use simple expressions without brackets:
  ```ts
  if (condition) doSomething();
  ```
  instead of
  ```ts
  if (condition) {
    doSomething();
  }
  ```
- Use getters and setters instead of `getX()` and `setX()` methods:

  ```ts
  // Bad
  class User {
    getName() {
      // ...
    }
    setName(name: string) {
      // ...
    }
  }

  // Good
  class User {
    get name() {
      // ...
    }
    set name(name: string) {
      // ...
    }
  }
  ```

- Use inline field declarations in constructor:

  ```ts
  // Bad
  class User {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }
  ```

  ```ts
  // Good
  class User {
    constructor(readonly name: string, readonly age: number) {}
  }
  ```

- Use `for .. of` instead of `for each`:

  ```ts
  // Bad
  array.forEach((item) => {
    console.log(item);
  });

  // Good
  for (const item of array) console.log(item);
  ```

- Use `map`, `filter`, `reduce` for array transformations instead of loops where applicable:

# Using `@elumixor/frontils`

### Array extension

`@elumixor/frontils` library is installed and available globally. It provides useful extension methods:

```ts
const arr = [1, 2, 3, 4, 5];
arr.first; // 1
arr.second; // 2
arr.last; // 5
arr.isEmpty; // false
arr.nonEmpty; // true
arr.sum; // 15
arr.prod; // 120
arr.cumsum; // [1, 3, 6, 10, 15]

arr.take(3); // [1,2,3]
arr.skip(2); // [3,4,5]
arr.takeLast(2); // [4,5]
arr.count(2); // 1
arr.toggle(2); // [1,3,4,5]
arr.toggle(6); // [1,2,3,4,5,6]
[...arr.shuffled]; // e.g. [3,1,5,2,4] - randomly shuffles the array
arr.pick(); // e.g. 3 - randomly picks one item
arr.pick(2); // e.g. [2,5] - randomly picks 2 items with repetitions
arr.pick(2, { repeat: false }); // e.g. [4,1] - randomly picks 2 items without repetitions
[1, 2, 2, 3, 3, 4].unique(); // [1,2,3,4]
arr.min; // 1
arr.max; // 5
arr.argmin; // 0
arr.argmax; // 4

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
matrix.transposed; // [[1,4,7],[2,5,8],[3,6,9]]

// Modification methods
[1, 2, 3].remove(2); // [1,3]
[1, 2, 3].insertAt(4, 1); // [1,4,2,3]
[1, 2, 3].removeAt(1); // [1,3]
[1, 2, 3].clear(); // []
```

### String extension

There is also a nice `String.capitalize()` method:

```ts
"test".capitalize(); // "Test"
```

### `EventEmitter<T>`

`@elumixor/frontils` also provides `EventEmitter<T>` class. Use it like this:

```ts
class CustomProcedure {
  // Set up an event emitter for
  readonly finished = new EventEmitter<ProcedureFinishedData>(); // don't add "on" prefix, e.g. "onFinished" -> "finished"
  readonly started = new EventEmitter(); // EventEmitter<void> -> EventEmitter (void is implied)

  // Method to simulate a button click
  someMethod() {
    // ...
    // Emit the click event
    this.finished.emit(procedureFinishedData); // emit event with data
  }
}

// Subscribe to the event
customProcedure.finished.subscribe((data) => {
  // Handle the event
});

// Or you can subscribe once
customProcedure.finished.subscribeOnce((data) => {
  // Handle the event
});

// There is also handy `nextEvent` getter that returns a promise that resolves on the next event emission
await customProcedure.finished.nextEvent;
```

# Code repository specifics

- There is a globally available `log` function for logging
