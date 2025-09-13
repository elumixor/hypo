# HYPO Game Overview

## Narrative
Futuristic sci-fi + fantasy universe of 6 worlds: Wrath, Desire, Greed, Attachment, Envy, Pride. Empire of Pride murdered your parents; you seek revenge, rising from Wrath after each death.

## Core Gameplay
- 3D action roguelike / RPG
- Isometric-leaning perspective (custom FOV)
- Movement, light/heavy attacks, skills, dash, block
- Party character switching mid-combat

## Level Progression
- 8 worlds
- Loop per world: safe zone → 5 levels → boss
- Worlds selected sequence; handcrafted levels sampled per run
- Safe zones host companions / prep

## Experience & Leveling
- Enemies drop experience particles
- Collect to level up and unlock/upgrade skill nodes

## Skills & Trees
- 4 playable characters (expandable)
- Each: light attack, heavy attack, block, dodge trees
- Plus 4 unique skill trees per character (relation gated)

## Enemies & Bosses
- Distinct enemy sets per world
- Unique boss per world with bespoke mechanics
- See also: [Enemy AI](./EnemyAI.md)

## Character Switching
- Start as Helio
- Recruit others during run; remain until first death
- Switch to access their attacks + skills

## Companions & Relations
- Dialogue in safe zones builds relationship
- Relationship gates unique skill unlocks

## Art Style
- Low poly, simple primitives
- Heavy particle/VFX focus for juice
- Minimalistic UI with motion feedback

## Tech Stack
- Three.js (3D)
- Pixi.js (2D/UI)
- TypeScript
- Vite bundler
- Biome formatting/lint
- Single-page deploy (assets inlined where possible)

## Additional Requirements
- Mobile support (portrait first; later landscape)
- Optional one-finger auto-play assistance (auto move/attack, manual character swap)

See also: [Architecture](./Architecture.md) • [Resources](./Resources.md)
