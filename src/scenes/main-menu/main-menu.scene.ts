import { Scene } from "@engine";
import { RotatingCube } from "entities/rotating-cube";
import { MainMenuWidget } from "./ui/main-menu.widget";

export class MainMenuScene extends Scene {
  constructor() {
    super();

    this.addWidget(new MainMenuWidget());
    this.addEntity(new RotatingCube());
  }
}
