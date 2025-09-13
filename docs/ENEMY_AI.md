# Enemy AI Documentation

This document describes the complex enemy AI system implemented in the game.

## Enemy Types

### 1. Range Enemy (Red Cube)
- **Appearance**: Red cube with rough texture
- **Health**: 3 HP
- **Behavior**: 
  - Approaches player to optimal distance (2.5 units)
  - Circles around player while maintaining distance
  - Fires projectiles at regular intervals (1.2s)
  - Retreats if player gets too close
  - Occasionally changes circle direction for variety

### 2. Melee Enemy (Orange Cone)  
- **Appearance**: Orange cone shape
- **Health**: 4 HP
- **Behavior**:
  - Fast movement speed (2.0 units/s)
  - Performs dash attacks in combo sequences (up to 3 dashes)
  - Each dash deals 1 damage to player
  - Has preparation phase before each dash (red glow effect)
  - Cooldown period after combo sequence (2.0s)
  - Can continue combo if player stays close

### 3. Nuker Enemy (Dark Red Octahedron)
- **Appearance**: Dark red octahedron with metallic finish
- **Health**: 5 HP
- **Behavior**:
  - Slow movement speed (0.8 units/s)
  - Two attack modes:
    1. **AOE Ballistic**: Shows ground indicator, fires projectile that damages enemies too
    2. **Trample**: Close-range area attack when player gets within 2.0 units
  - Ground indicators show 1.5s warning before attacks
  - AOE projectiles can damage other enemies (enemy-to-enemy damage)
  - Both attacks deal 2 damage

### 4. Charger Enemy (Purple Cylinder)
- **Appearance**: Purple cylinder with slight metallic finish
- **Health**: 6 HP (highest HP)
- **Behavior**:
  - Very slow movement when not charging (0.5 units/s)
  - Stays mostly in original position
  - Charges in straight line through player position
  - 1.2s preparation with growing red glow
  - Very fast charge speed (8.0 units/s) 
  - Charges 10 units past target
  - Damages both player and other enemies during charge (2 damage)
  - Long cooldown after charge (4.0s)

## Enemy Distribution
- **Range**: 40% (most common)
- **Melee**: 25% 
- **Nuker**: 20%
- **Charger**: 15% (least common)

## Key Features

### Enemy-to-Enemy Damage
- Nuker's AOE projectiles damage other enemies
- Charger's charge attack damages other enemies in path
- Nuker's trample attack damages other enemies in range

### Visual Indicators
- Melee enemies glow red before dashing
- Charger enemies glow red with increasing intensity before charging
- Nuker enemies show ground indicators before AOE and trample attacks
- All enemy types have distinct shapes and colors

### AI State Management
- Each enemy uses a state machine with states like IDLE, APPROACH, ATTACK, COOLDOWN
- Smart targeting and movement avoiding overlap with other enemies
- Respects player's shield for damage mitigation

## Testing the System

To test the enemy AI system:

1. **Range Enemies**: Observe circling behavior and projectile firing
2. **Melee Enemies**: Let them get close to see dash combo attacks
3. **Nuker Enemies**: Watch for ground indicators and AOE damage
4. **Charger Enemies**: Stay at medium distance to trigger charge attacks
5. **Enemy-to-Enemy**: Position enemies close together to see friendly fire

The spawn system ensures a good mix of all enemy types for varied gameplay.