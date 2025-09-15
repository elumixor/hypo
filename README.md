![Build & Lint Status](https://github.com/elumixor/hypo/actions/workflows/deploy.yml/badge.svg)

# HYPO

[Playable Version (latest build)](https://elumixor.github.io/hypo/)

Early prototype scaffold for the HYPO action roguelike RPG. Futuristic sci‑fi + fantasy universe of 6+ worlds ruled by the Empire of Pride. You rise from Wrath to overthrow it.

## Documentation

- Online Docs: https://elumixor.github.io/hypo/
- Local Docs Index: [./docs/index.md](./docs/index.md)

Key pages: [Architecture](./docs/Architecture.md) · [Enemy AI](./docs/EnemyAI.md) · [Resources](./docs/Resources.md) · [Game Overview](./docs/GameInfo.md)

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

## Near-term roadmap (see `docs/GameInfo.md`)

- Level/world progression (Wrath → Pride)
- Character switching & relation-based skill unlocks
- Procedural sampling of handcrafted levels
- Auto-play / one-finger mode support

## Deployment

GitHub Pages workflow (to be added) will publish `dist/index.html` after pushes to `main`.

## Asset Viewer (Models & Textures)

Quick visual inspection tool for everything under `public/assets` (models + textures).

Run it:

```bash
bun run asset-viewer
```

What happens:

- Starts a lightweight Bun server at http://localhost:5789
- Scans `public/assets/**` for `.glb/.gltf` (models) and common image textures
- Opens your browser automatically
- Renders a responsive grid:
  - Textures show native resolution
  - Models get a mini Three.js scene (auto-centered, scaled, slow rotation)

Reload assets with the button after adding new files (no restart needed).

Fallback: If local `three` cannot be resolved it auto-loads a CDN build.

This tool is intentionally independent of the main Vite dev server so you can iterate on assets without a full game compile cycle.

## License

TBD (add when defined).
