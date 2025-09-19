import { Scene } from "@engine";
import type { LevelConfig } from "services/level-progression.service";
import { SafeZoneWidget } from "./ui/safe-zone.widget";

export class SafeZoneScene extends Scene {
  constructor(private readonly levelConfig: LevelConfig) {
    super();

    // Add the safe zone UI widget
    this.addWidget(new SafeZoneWidget(this.levelConfig));
  }
}
