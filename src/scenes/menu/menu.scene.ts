import { Scene } from "@engine";
import { RotatingCube } from "entities/dummy";
import { MenuWidget } from "./ui/menu.widget";

export class MenuScene extends Scene {
  constructor() {
    super();

    this.addWidget(new MenuWidget());
    this.addEntity(new RotatingCube());
  }
}
