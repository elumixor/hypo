import { Scene } from "@engine";
import { SuccessWidget } from "./ui/success.widget";

export class SuccessScene extends Scene {
  constructor() {
    super();

    // Add the success screen widget
    this.addWidget(new SuccessWidget());
  }
}
