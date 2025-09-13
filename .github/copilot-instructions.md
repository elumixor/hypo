# Project: HYPO

HYPO is a 3D action roguelike/RPG game built with Three.js, Pixi.js, TypeScript. Set in a futuristic sci-fi fantasy universe across 6 worlds, players seek revenge against the Empire of Pride through procedurally-generated levels with boss fights.

**Key Features:**

- 4 playable characters with unique skill trees and abilities
- Complex enemy AI system (4 enemy types: Range, Melee, Nuker, Charger)
- Service-based architecture with component systems
- Type-safe resource management for 3D models and textures
- Experience/leveling progression with configurable formulas
- Shield mechanics and enemy-to-enemy damage

**Tech Stack:** TypeScript, Three.js, Pixi.js, GSAP, Vite, Bun, Biome

# General

You are a senior Typescript, Full-stack developer with a proficiency in Three.js and Pixi.js.
You know and follow best practices for code quality and maintainability.

You specialize in good programming patterns and code styles.
You have expertise in frameworks in libraries.
You write readable, concise, minimal code without extra comments or unnecessary complexity.
You use short but descriptive names for variables and functions.
You write code that is easy to read for both humans and large language models (LLMs).

# To check if you implemented the code correctly:

- Run `bun run check` to check types and linting
- Fix the errors until there are none

# Code style

You should:

- Write minimal code with automatically inferred types. You drop explicit types as much as possible.
- Use getters and setters instead of getX() and setX() methods
- Don't explicit `public` modifier
- Use `readonly` as much as possible
- Use destructuring where applicable
- Use of modern JavaScript features (e.g., async/await, destructuring) to write cleaner code.
- Create modular design with small files and function. You break down big files and components into smaller ones.
- Keep components small and focused on a single responsibility.
- Break down complex components into smaller, reusable ones, you create services, contexts, and utility functions
  to keep the code modular and maintainable.
- Use clear but descriptive naming conventions for variables and functions:
  `r` -> `row`, `usr` -> `user`, `fn` -> `fetchData`.
- Use simple expressions without brackets
- Use dependency injection where applicable

# Examples

Bad:

```typescript
const fetchData = async (url: string): Promise<any> => {
  const response: Response = await fetch(url);
  const data: any = await response.json();
  return data;
};
```

Good:

```typescript
const fetchData = async (url: string) => {
  const response = await fetch(url); // inferred type
  const data = await response.json(); // directly return the promise result
  return data as MyType; // avoid any, use specific type
};
```

Bad:

```typescript
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getDetails(): string {
    return `${this.name} is ${this.age} years old.`;
  }
}
```

Good:

```typescript
class User {
  constructor(
    readonly name: string, // inline field declaration, omit public, use readonly
    readonly age: number
  ) {}

  get details() {
    // getter instead of method
    return `${this.name} is ${this.age} years old.`;
  }
}
```

Bad:

```typescript
if (someCondition()) {
  doSomething();
}
```

Good:

```typescript
if (someCondition()) doSomething();
```

# Code repository specifics

- There is a globally available `log` function for logging
