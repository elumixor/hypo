# HYPO Architecture

> **Clean, maintainable service-based architecture with component systems**

## Overview

This document explains the architecture for the HYPO game, which has been refactored into a clean, maintainable service-based architecture with component systems.

## Core Components

### Services (`src/services/`)

- **BaseService**: Base class for all services with lifecycle management
- **HealthService**: Manages player health, damage, healing, and death states
- **ExperienceService**: Handles XP, leveling, and progression with configurable formulas
- **GameStateService**: Manages game state, respawning, world progression, and session tracking
- **ServiceRegistry**: Central registry for dependency injection and service lifecycle

### Systems (`src/systems/`)

- **TimerSystem**: Advanced timer using GSAP ticker with scaled (game time) and fixed (real time) support

### Components (`src/components/`)

- **Component**: Base component class with lifecycle management
- **ComponentManager**: Manages multiple components per entity
- **MovementComponent**: Handles entity movement and dashing
- **HealthComponent**: Entity-specific health management with events
- **ShieldComponent**: Shield mechanics with visual effects

### Key Features

#### Event-Driven Architecture

All services use EventEmitters for loose coupling:

```typescript
// Example: Health service events
healthService.onHealthChanged.subscribe((data) => updateUI(data));
healthService.onDeath.subscribe(() => handlePlayerDeath());
```

#### Component-Based Entities

Entities like Player now use components for modular functionality:

```typescript
const player = new Player(keyboard, {
  movement: { speed: 4, dashSpeed: 10 },
  health: { maxHealth: 10 },
  shield: { radius: 1.1 },
});
```

#### GSAP Timer Integration

Two-tier timing system for game effects:

```typescript
// Scaled time (affected by slow motion)
timerSystem.onScaledTick.subscribe(({ deltaTime }) => {
  updateGameLogic(deltaTime);
});

// Fixed time (real time, unaffected by time scale)
timerSystem.onFixedTick.subscribe(({ deltaTime }) => {
  updateUI(deltaTime);
});
```

#### Service Registry

Centralized service management:

```typescript
// Register services
Services.register(new HealthService());
Services.register(new ExperienceService());

// Use services anywhere
const healthService = Services.get(HealthService);
healthService.takeDamage(5);
```

## Architecture Benefits

1. **Separation of Concerns**: Each service handles one responsibility
2. **Event-Driven**: Loose coupling between systems
3. **Component-Based**: Modular, reusable entity behaviors
4. **GSAP Integration**: Professional timing with slow motion support
5. **Type Safety**: Full TypeScript support with proper interfaces
6. **Scalable**: Easy to add new features and systems
7. **Testable**: Services and components can be tested in isolation
8. **Separation of Concerns**: Each service handles one responsibility
9. **Event-Driven**: Loose coupling between systems
10. **Component-Based**: Modular, reusable entity behaviors
11. **GSAP Integration**: Professional timing with slow motion support
12. **Type Safety**: Full TypeScript support with proper interfaces
13. **Scalable**: Easy to add new features and systems
14. **Testable**: Services and components can be tested in isolation

## Migration Guide

### From Old to New

- **Game.ts** → **GameNew.ts**: Uses service architecture
- **Player.ts** → **PlayerNew.ts**: Component-based with health, movement, shield
- **Enemy.ts** → **EnemyNew.ts**: Component-based health system
- **main.ts** → **mainNew.ts**: Uses new game class

## Usage Examples

### Adding Time Dilation Effect

```typescript
const timer = Services.get(TimerSystem);
timer.slowMotion(0.3, 2000); // 30% speed for 2 seconds
```

### Listening to Player Leveling

```typescript
const xp = Services.get(ExperienceService);
xp.onLevelUp.subscribe((levelData) => {
  showLevelUpEffects(levelData.newLevel);
  applyStat Bonuses(levelData.bonusStats);
});
```

### Custom Component Example

```typescript
class AttackComponent extends Component {
  protected onUpdate(deltaTime: number): void {
    // Custom attack logic
  }
}

// Add to any entity
player.components.addComponent(new AttackComponent(config));
```

This architecture provides a solid foundation for implementing the full game design outlined in the `docs/game-info.md` document.
