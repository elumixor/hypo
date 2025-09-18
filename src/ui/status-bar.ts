import { Container, Graphics, Text } from "pixi.js";
import { textStyle } from "./fonts";

export class StatusBar extends Container {
  private readonly background = new Graphics();
  private readonly bar = new Graphics();
  private readonly text = new Text({ text: "0/100", style: textStyle.basic });

  private _value = 0;
  private _maxValue = 100;
  private _color = 0x00ff00;
  private _backgroundColor = 0x333333;
  private _borderColor = 0x666666;
  private _barWidth = 290;
  private _barHeight = 30;

  constructor() {
    super();

    // Add children to this container
    this.addChild(this.background, this.bar, this.text);
    this.text.anchor.set(0.5);
    this.updateDisplay();
  }

  get value() {
    return this._value;
  }

  set value(v: number) {
    this._value = Math.max(0, Math.min(v, this._maxValue));
    this.updateDisplay();
  }

  get maxValue() {
    return this._maxValue;
  }

  set maxValue(v: number) {
    this._maxValue = v;
    this.updateDisplay();
  }

  get color() {
    return this._color;
  }

  set color(c: number) {
    this._color = c;
    this.updateDisplay();
  }

  get barWidth() {
    return this._barWidth;
  }

  set barWidth(w: number) {
    this._barWidth = w;
    this.updateDisplay();
  }

  get barHeight() {
    return this._barHeight;
  }

  set barHeight(h: number) {
    this._barHeight = h;
    this.updateDisplay();
  }

  get backgroundColor() {
    return this._backgroundColor;
  }

  set backgroundColor(c: number) {
    this._backgroundColor = c;
    this.updateDisplay();
  }

  get borderColor() {
    return this._borderColor;
  }

  set borderColor(c: number) {
    this._borderColor = c;
    this.updateDisplay();
  }

  private updateDisplay() {
    // Update background, bar, and text
    this.background.clear();
    const bgWidth = this._barWidth + 10; // Add padding for background
    const bgHeight = this._barHeight + 10;
    this.background
      .roundRect(-5, -5, bgWidth, bgHeight, 5)
      .fill({ color: this._backgroundColor })
      .stroke({ color: this._borderColor, width: 2 });

    // Update bar
    const percent = this._value / this._maxValue;
    const barWidth = this._barWidth * percent;
    this.bar.clear();
    this.bar.roundRect(0, 0, barWidth, this._barHeight, 3).fill({ color: this._color });

    // Update text
    this.text.text = `${Math.round(this._value)}/${this._maxValue}`;
    this.text.position.set(this._barWidth / 2, this._barHeight / 2);
  }
}
