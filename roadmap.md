# HYPO Roadmap

Date: 2025-09-17

## Original request

- block on Q
- dash on Space
- movement with Joystick when touching the screen

- character switching mechanics in combat (you can have maximum of 4 characters in the party - you can switch between them - like switching the pilot of the ship - this would result in you gaining access to different attacks, dash, block, and skills)
- (for that we also need) different characters with different skills
- each character has basic attack, alternative attack, 4 different skills
- each of them has skill tree: e.g. skill tree for light attack, skill tree for alternative attack, skill tree for each of 4 skills
- level progression - different level structure
- enemy ai - different behaviors (range, melee, nuker, charger)
- enemy ai behavior tree mechanics, system, visual editor perhaps
- put objects in the level (rocks)
- dialogue system with character avatars
- enemies should drop XP
- you collect xp, level up
- you die -> show some simple screen, and then start from beginning - in world 1 safe zone
- energy system - skills cost energy, shield costs energy. Base attacks can give energy (but not always - with some upgrades). Energy replenishes on its own
- Dash charages - you have 2 dash charages, with independent recharge time
- improve resources cleanup (right now it's hard to rember about everything. Perhaps we can do it similarly to Rust when we can do like const sub = event.subscribe(...); this.subscriptions.add(sub); or even this.disposableResource.add(sub); <- we would use this for models, etc. then the dispose would get called for all these resources)
- overall level progression: 1 safe zone level, 5 combat levels (randomly sampled out of 12 pre-made levels per world), 1 boss level. <- all of this for 5 worlds, and then the 6th world with 6 boss fights only.
- actual level design and assembly (perhaps some configurator/debug view for levels, and serializer). For now we need some ground texture/rocks, and then we can put stones around. We also need some dust particle effect + some random black/shining particles at it should look nice.
- safe zone mechanics (control Helios character instead of the Phoenix ship, no fighting, just talking to other characters)
- randomly meeting companions in the combat levels (once you complete the combat level), triggerring some random dialogue
- story & dialogue progression system
- character relation system - some dialogue options deepen the chracter relation and this gives gameplay buffs (unlock new skills, gives permanent passive traits)
- blueprints: enemies drop blueprints which unlock upgrades to skills. They don't unlock base skills, but upgrades in the skills upgrade tree
- Make enemies not collide with each other, also strafe movement
- UI:
  - hud:
    - damage numbers
    - character level, xp - current/level up
    - character switcher, portrait of the current character
    - random popping text from the character/phoenix ship during combat gameplay
  - Hints for where the enemy will attack (needed for Nuker with AOE damage, and charger that skewers the player)
  - Dialogue UI
  - Skill treees, level up screen
  - In-game pause screen -> settings, save/load, exit
  - Settings menu (keybindings switch?, music loudness)
  - Load different games screen
- VFX:
  - projectile attack
  - melee attacks
  - particles - on hit
  - ray attack
  - destruction / explosion attack
- sounds
  - main theme
  - sfx on for vfx skills
  - sfx for explosion

## Backlog (prioritized)

The following items are ordered for implementation. Priorities: P0 (now), P1 (next), P2 (later), P3 (polish/tools).

1. P0 — Core input: Block on Q

- Implement block input mapping in `src/scenes/combat/combat-input-mapping.context.ts` and hook to a `BlockBehavior` with shield/energy drain stubs.

2. P0 — Core input: Dash on Space

- Add dash binding and a `DashBehavior` with invulnerability frames window and movement burst; ensure cooldown hooks exist.

3. P0 — Touch: Virtual joystick movement

- Add on-screen joystick for mobile/touch; integrate with input system in `engine/systems/input`; support simultaneous dash/block taps.

4. P0 — Dash charges (2 independent cooldowns)

- Extend `DashBehavior` with 2-charge system, independent timers, and HUD indicators; configurable in character stats.

5. P0 — Energy system (skills and shield costs)

- Implement `EnergyBehavior/Service`: regen over time, costs for skills and block/shield; hooks for “basic attacks may generate energy via upgrades”.

6. P0 — Minimal HUD (combat slice)

- Add HUD widget: dash charges, energy bar, damage numbers MVP, current character portrait placeholder.

7. P0 — Enemies drop XP → Level up basics

- Extend enemy death flow to emit XP; add `ProgressionService` hooks to collect XP and trigger level-up; minimal UI feedback.

8. P0 — Death flow to Safe Zone

- On player death, show simple screen; then load Safe Zone scene (stub) as “world 1 safe zone”.

9. P0 — Resource cleanup utility

- Introduce `DisposableBag` pattern for subscriptions/resources: `this.disposables.add(x)` with unified disposal in `destroy()`; propagate to core classes.

10. P0 — Enemy collision and strafe

- Prevent enemies from colliding with each other; add simple steering/strafe around player to avoid clumping.

11. P0 — Place rocks/objects in level

- Add basic props (rocks) to current combat scene; simple placement and collisions if needed.

12. P0 — Basic VFX pass (slice)

- Minimal projectile/melee/on-hit particle effects to support readability during slice.

13. P0 — Basic SFX pass (slice)

- Hook sfx for dash, hit, projectile; add a placeholder main theme with volume control.

14. P1 — Character switching (party up to 4)

- Implement party system and runtime switch of controlled entity; hotkeys (e.g., 1–4) and UI switcher; transfer camera/follow; per-character inputs shared but behaviors differ.

15. P1 — Characters with distinct kits

- Define 4 characters with unique stats and behaviors for dash, block, basic/alt attacks, and 4 skills (skeleton implementations).

16. P1 — Basic/Alt attacks and 4 skills per character

- Implement ability system interfaces; cooldowns, costs, targeting; minimal animations/VFX hooks.

17. P1 — Skill trees per ability

- Add skill tree data model and application of modifiers: separate trees for light/basic, alt, and each of the 4 skills.

18. P1 — Dialogue system with avatars

- Implement dialogue runtime with portrait/avatar support; simple branching; reusable Widget; data-driven script format.

19. P1 — Safe Zone scene and mechanics

- Create Safe Zone scene controlling Helios (no combat); NPC interactables; access to dialogue and progression UI.

20. P1 — Random companion encounters post-combat

- After finishing combat levels, roll for companion dialogue event; inject dialogue sequence and rewards/relations.

21. P1 — Enemy AI: ranged and melee

- Implement two baseline AI behaviors (Range, Melee) with perception, kiting/approach, and attack loops.

22. P1 — UI: Combat HUD expansion

- Add character level/xp bar, character switcher with portrait, random popping combat barks; polish damage numbers.

23. P1 — Attack hints UI

- Telegraphs for Nuker AOE and Charger lanes/paths (circles/cones/lines with timing).

24. P2 — Enemy AI: Nuker and Charger

- Implement remaining AI types with specialized behaviors, leveraging hint system; tune timings and counters.

25. P2 — Behavior tree system (runtime)

- Introduce BT framework (selectors, sequences, decorators); migrate AI behaviors to BT graphs; data-driven definitions.

26. P2 — Level structure and progression framework

- Implement world structure: 1 safe zone → 5 combat (sampled from 12 templates) → 1 boss; support 5 worlds + 6th boss-only world.

27. P2 — Level selector and serialization tools

- Simple configurator/debug view to assemble levels; JSON schema and serializer for placements and spawners.

28. P2 — Blueprint drops for skill upgrades

- Add blueprint item type from enemies; integrate with skill trees to unlock upgrades (not base skills); inventory/collection UI.

29. P2 — Story & dialogue progression system

- Track story flags, dialogue seen state, branching unlocks tied to levels/worlds and relations.

30. P2 — Character relation system

- Dialogue choices affect relation values; grant buffs/unlocks/passives; expose minimal UI in Safe Zone.

31. P2 — UI: Dialogue UI polish

- Full-featured dialogue UI with history, auto/skip, portraits/emotions.

32. P2 — UI: Skill trees and level-up screen

- Interactive tree view, spending points, previewing changes; level-up modal with rewards.

33. P2 — UI: Pause and Settings

- In-game pause screen providing settings (keybinds, music/sfx volume) and save/load/exit.

34. P2 — UI: Load games screen

- Slot management with thumbnails/metadata; integrate with existing save/load service.

35. P2 — Level art baseline

- Ground texture, rock scatter, dust particles, ambient particles to achieve cohesive look across combat scenes.

36. P3 — Behavior tree visual editor (optional)

- Node-based editor for authoring BTs; live reload to runtime graphs; export/import JSON.

37. P3 — VFX polish pass

- Ray attack visuals, improved explosions, ability-specific effects; performance budget verification.

38. P3 — Audio polish pass

- Finalize main theme, add unique sfx per skill, explosion variants; dynamic mixing.

39. P3 — Enemy movement polish

- Improved strafing, spacing, flocking; remove remaining enemy-enemy collisions artifacts.

40. P3 — Cleanup and tech debt

- Biome rules, typing hardening, asset pipeline, profiling, and documentation updates in `docs/`.

## Assumptions & Notes

Assumptions

- Input system: we’ll extend the existing `engine/systems/input` and the combat mapping context for keyboard/touch.
- Energy: centralized via a behavior/service to allow UI and abilities to query/modify consistently.
- Abilities: data-first with behavior hooks; per-character configs select behaviors/VFX.
- AI: start with hand-coded FSMs; later migrate to Behavior Trees; visual editor is optional/polish.
- Levels: authored templates (12 per world) serialized to JSON; sampling logic selects 5 per run; boss scenes are bespoke.

Notes

- We’ll prioritize a playable combat vertical slice (P0) before expanding breadth.
- Each backlog item implies updating `docs/` with concise developer notes and, when applicable, player-facing docs.
- Where UI is mentioned, we’ll use Pixi.js Widgets consistent with the existing engine patterns.
