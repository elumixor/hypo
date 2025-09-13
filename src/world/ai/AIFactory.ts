import { EnemyType } from "./EnemyAI";
import { RangeAI } from "./RangeAI";
import { MeleeAI } from "./MeleeAI";
import { NukerAI } from "./NukerAI";
import { ChargerAI } from "./ChargerAI";
import type { Enemy } from "../Enemy";
import type { Game } from "../../core/Game";
import type { EnemyAI } from "./EnemyAI";

export class AIFactory {
  static createAI(enemy: Enemy, game: Game): EnemyAI {
    switch (enemy.type) {
      case EnemyType.RANGE:
        return new RangeAI(enemy, game);
      case EnemyType.MELEE:
        return new MeleeAI(enemy, game);
      case EnemyType.NUKER:
        return new NukerAI(enemy, game);
      case EnemyType.CHARGER:
        return new ChargerAI(enemy, game);
      default:
        return new RangeAI(enemy, game);
    }
  }
}