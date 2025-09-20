# Enemy AI

Documentation of the enemy AI system.

## Architecture

The Enemy AI system has been redesigned using **Behavior Trees** for more dynamic and reactive behavior. This replaces the previous GSAP tween-based system with a modular, state-driven approach.

### Behavior Tree Framework

Located in `engine/ai/`, the system provides:

- **Core Node Types**: `BTNode`, `BTCondition`, `BTAction`, `BTComposite`
- **Composite Nodes**: 
  - `BTSelector` - OR logic (executes children until one succeeds)
  - `BTSequence` - AND logic (executes children until one fails)
- **Decorators**: `BTInverter`, `BTRepeat`

### Enemy AI Behavior

The main enemy AI is implemented in `src/scenes/combat/behaviors/enemy-ai.behavior.ts` using these specific behaviors:

#### Conditions
- `InRangeCondition` - Check if player is within shooting range
- `CanShootCondition` - Check if shoot cooldown has passed
- `ShouldUpdateTargetCondition` - Check if it's time to pick a new movement target

#### Actions  
- `PickNewTargetAction` - Select a new random position around the player
- `MoveToTargetAction` - Move toward the current target position
- `RotateToPlayerAction` - Smoothly rotate to face the player
- `StrafeAroundPlayerAction` - Strafe around player when in close range
- `ShootSequenceAction` - Execute shooting with pre/post delays

### AI Behavior Tree Structure

```
Selector (choose one behavior)
├── Sequence (shooting behavior when in range)
│   ├── InRangeCondition
│   ├── RotateToPlayerAction  
│   └── Selector (choose shooting or strafing)
│       ├── Sequence (shoot if can shoot)
│       │   ├── CanShootCondition
│       │   ├── ShootSequenceAction
│       │   └── PickNewTargetAction
│       └── StrafeAroundPlayerAction
└── Sequence (movement behavior when not in range)
    └── Selector (target management)
        ├── Sequence (update target if needed)
        │   ├── ShouldUpdateTargetCondition
        │   └── PickNewTargetAction
        └── MoveToTargetAction
```

### Key Features

- **Dynamic targeting**: Enemies pick new movement points every 2-3 seconds
- **Range-based behavior**: Stop and shoot when in range (12 units), move when out of range
- **Smooth rotation**: Enemies smoothly rotate toward player when preparing to shoot
- **Strafing movement**: Reduced-speed circular movement when close to player
- **Shooting delays**: 0.5s pre-delay + shooting + 0.3s post-delay
- **Reactive system**: Fully event-driven, no blocking GSAP tweens

## Enemy Types

### Range Enemy (Red Cube)

- Health: 3
- Maintains ~2.5 units distance, circles player, fires every 1.2s, retreats if too close.

### Melee Enemy (Orange Cone)

- Health: 4
- Fast (2.0 u/s). Dash combo up to 3 dashes (prep glow + cooldown 2.0s).

### Nuker Enemy (Dark Red Octahedron)

- Health: 5
- Slow (0.8 u/s). Two attacks:
  1. AOE ballistic (ground indicator, 1.5s warn, damages enemies too)
  2. Trample (close-range AOE if player < 2.0 units)
- Both deal 2 damage.

### Charger Enemy (Purple Cylinder)

- Health: 6
- Idle/slow (0.5 u/s) until charge sequence.
- 1.2s telegraph (red glow), then 8.0 u/s straight-line charge (10 units travel) dealing 2 damage to all hit. 4.0s cooldown.

## Distribution

- Range 40%
- Melee 25%
- Nuker 20%
- Charger 15%

## Shared Features

### Enemy-to-Enemy Damage

- Nuker AOE + trample damage others.
- Charger charge damages others.

### Telegraphs & Feedback

- Red glow (Melee dashes, Charger charge buildup).
- Ground indicators (Nuker attacks).
- Distinct silhouettes & colors.

### States

Typical states: IDLE → APPROACH → ATTACK → COOLDOWN (loop). Charger inserts TELEGRAPH, Nuker splits ATTACK variants.

## Testing Checklist

- Range: maintains orbit & distance shifts.
- Melee: triggers multi-dash if player stays close.
- Nuker: indicators show; AOE damages clustered enemies.
- Charger: pathing is straight; enemy collision damage occurs.
- Friendly fire: cluster enemies to verify cross-damage.

## Future Extensions

- **Visual Editor**: The behavior tree system is designed to support visual editing
  - Clear node hierarchy with descriptive names
  - Exposed state variables in `EnemyAIContext`
  - Modular, reusable behavior components
- **Multiple Enemy Types**: Different behavior trees for Range, Melee, Nuker, and Charger enemies
- **Difficulty scaling**: Configurable parameters (HP / speed / timings multipliers)
- **Coordinated behaviors**: Pack tactics, focus fire using shared AI context
- **Boss AI**: Complex behavior trees with multiple phases and special abilities

## Implementation Notes

- **Performance**: Behavior trees execute once per frame per enemy
- **Modularity**: Easy to add new conditions and actions
- **Debugging**: Clear execution flow for troubleshooting AI behavior
- **Data-driven**: AI parameters stored in `EnemyAIContext` for easy tuning

See also: [Architecture](./Architecture.md) • [Game Overview](./GameInfo.md)
