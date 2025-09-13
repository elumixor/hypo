# HYPO Documentation

Central documentation hub for the HYPO game project.

## Guides & References

- [Architecture](./Architecture.md)
- [Enemy AI](./EnemyAI.md)
- [Resource Management](./Resources.md)
- [Game Overview & Narrative](./GameInfo.md)

## Quick Start (Developers)

```bash
bun install
bun run dev
```

Open `http://localhost:5173`.

Load assets demo & tools:

```bash
bun run assets          # Open the asset viewer
bun run test-resources  # Open resource loading test page
```

## Repository Essentials

| File | Purpose |
|------|---------|
| `package.json` | Scripts & dependencies |
| `tsconfig.json` | TypeScript config |
| `vite.config.ts` | Vite build config |
| `biome.jsonc` | Lint / format rules |

## Contributing to Docs

Keep filenames in PascalCase (except `index.md`). Link using relative paths. When adding a new doc, add it to the list above.

## GitHub Pages

These docs can be published via **GitHub Pages** using the `/docs` folder (Pages setting: Branch = `main`, Folder = `/docs`). Once enabled they will be available at:

`https://elumixor.github.io/hypo/`

If you add custom styling or want Jekyll processing, create a `_config.yml`. A basic one is included.

---
Return to the [project README](../README.md).
