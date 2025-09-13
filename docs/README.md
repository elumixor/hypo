# Documentation

This folder contains the technical documentation for the HYPO game project.

## Contents

- **[Architecture](./ARCHITECTURE.md)** - Service-based architecture with component systems
- **[Resource Management](./RESOURCES.md)** - Type-safe asset loading and retrieval system
- **[Game Info](./game-info.md)** - Game design and mechanics overview

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
