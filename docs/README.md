# Documentation Index

This directory contains documentation for the Hypo game project.

## Available Documents

- **[ENEMY_AI.md](./ENEMY_AI.md)** - Comprehensive documentation of the complex enemy AI system with 4 different enemy types (Range, Melee, Nuker, Charger), their behaviors, and features like enemy-to-enemy damage.
- **[Architecture](./ARCHITECTURE.md)** - Service-based architecture with component systems
- **[Resource Management](./RESOURCES.md)** - Type-safe asset loading and retrieval system

## Game Features

The game now includes:
- 4 distinct enemy types with unique AI behaviors
- Enemy-to-enemy damage system
- Visual attack indicators and warnings
- State-based AI with smart positioning
- Balanced enemy distribution system
- Player shield mechanics that work with all enemy types

## Development Tools

The project includes several development tools located in the `scripts/` folder:

- **Asset Viewer** - Visual tool for inspecting game assets
- **Resource Demo** - Command-line demo of the resource system
- **Test Resources** - Basic resource loading test page

To use these tools, see the commands available in `package.json`:

```bash
bun run assets        # Open the asset viewer
bun run test-resources # Open the test resources page
```

## Related Files

- [`package.json`](../package.json) - Build scripts and dependencies
- [`tsconfig.json`](../tsconfig.json) - TypeScript configuration
- [`vite.config.ts`](../vite.config.ts) - Vite build configuration
