import type { Game } from "../../core/Game";
import type { Enemy } from "../Enemy";
import { ChargerAI } from "./ChargerAI";
import type { EnemyAI } from "./EnemyAI";
import { EnemyType } from "./EnemyAI";
import { MeleeAI } from "./MeleeAI";
import { NukerAI } from "./NukerAI";
import { RangeAI } from "./RangeAI";

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
