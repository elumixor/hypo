
![Build & Lint Status](https://github.com/elumixor/hypo/actions/workflows/deploy.yml/badge.svg)
# HYPO

[Playable Version (latest build)](https://elumixor.github.io/hypo/)

Early prototype scaffold for the HYPO action roguelike RPG. Futuristic sci‑fi + fantasy universe of 6+ worlds ruled by the Empire of Pride. You rise from Wrath to overthrow it.

## Stack

- Three.js for 3D world
- Pixi.js for UI / 2D overlays
- Vite + single-file plugin (outputs one self-contained HTML bundle)
- TypeScript + Bun runtime/dev tooling

## Dev workflow

Install deps (already installed if you ran `bun install` once):

```bash
bun install
```

Start dev server (auto reload):

```bash
bun run dev
```

Build single-file release (outputs `dist/index.html`):

```bash
bun run build
```

Preview built file locally:

```bash
bun run preview
```

## Current prototype

- Rotating cube placeholder (represents player avatar)
- Basic ground + lighting
- PIXI overlay text
- Single-finger drag rotates object (mobile friendly test)

## Near-term roadmap (extract from `docs/game-info.md`)

- Level/world progression (Wrath → Pride)
- Character switching & relation-based skill unlocks
- Procedural sampling of handcrafted levels
- Auto-play / one-finger mode support

## Deployment

GitHub Pages workflow (to be added) will publish `dist/index.html` after pushes to `main`.

## License

TBD (add when defined).
