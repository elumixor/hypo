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
  [CollisionGroup.Player]: [CollisionGroup.EnemyProjectile, CollisionGroup.PickUps],
  [CollisionGroup.Shield]: [CollisionGroup.EnemyProjectile],
  [CollisionGroup.Enemy]: [CollisionGroup.PlayerProjectile],
  [CollisionGroup.Static]: [CollisionGroup.PlayerProjectile, CollisionGroup.EnemyProjectile],
};
