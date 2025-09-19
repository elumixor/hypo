import { Scene } from "@engine";
import { DeathWidget } from "./ui/death.widget";

export class DeathScene extends Scene {
  constructor() {
    super();

    // Add the death screen widget
    this.addWidget(new DeathWidget());
  }
}
