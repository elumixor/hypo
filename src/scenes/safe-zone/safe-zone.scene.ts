import { Scene } from "@engine";
import type { LevelConfig } from "types/level-config";
import { SafeZoneWidget } from "./ui/safe-zone.widget";

export class SafeZoneScene extends Scene {
  constructor(private readonly levelConfig: LevelConfig) {
    super();

    // Add the safe zone UI widget
    this.addWidget(new SafeZoneWidget(this.levelConfig));
  }
}
