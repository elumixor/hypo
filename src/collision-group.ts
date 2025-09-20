export enum CollisionGroup {
  Player = "Player",
  Shield = "Shield",
  Enemy = "Enemy",
  PlayerProjectile = "PlayerProjectile",
  EnemyProjectile = "EnemyProjectile",
  PickUps = "PickUps",
  Static = "Static",
}

export const collisionGroups = {
  [CollisionGroup.Player]: [
    CollisionGroup.EnemyProjectile,
    CollisionGroup.PickUps,
    CollisionGroup.Enemy,
    CollisionGroup.Static,
  ],
  [CollisionGroup.Shield]: [CollisionGroup.EnemyProjectile],
  [CollisionGroup.Enemy]: [CollisionGroup.PlayerProjectile, CollisionGroup.Player, CollisionGroup.Static],
  [CollisionGroup.Static]: [
    CollisionGroup.PlayerProjectile,
    CollisionGroup.EnemyProjectile,
    CollisionGroup.Player,
    CollisionGroup.Enemy,
  ],
};
