# Enemy AI

Documentation of the enemy AI system.

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

- Difficulty scaling (HP / speed / cadence multipliers)
- Coordinated behaviors (pack tactics, focus fire)
- Boss AI hooks into same state framework

See also: [Architecture](./Architecture.md) • [Game Overview](./GameInfo.md)
