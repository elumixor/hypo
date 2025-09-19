import { Container, Graphics } from "pixi.js";

export class DashChargeIndicator extends Container {
  private readonly charges: Graphics[] = [];
  private _maxCharges = 2;
  private _chargeRegenTime = 0.5;
  private readonly chargeTimers: number[] = [];

  private readonly chargeSize = 20;
  private readonly chargeSpacing = 5;
  private readonly availableColor = 0x00aaff; // Bright blue for available charges
  private readonly rechargingColor = 0x666666; // Gray for recharging
  private readonly borderColor = 0x004488; // Dark blue border

  constructor() {
    super();
    this.updateDisplay();
  }

  get maxCharges() {
    return this._maxCharges;
  }

  set maxCharges(value: number) {
    this._maxCharges = value;
    this.updateDisplay();
  }

  get chargeRegenTime() {
    return this._chargeRegenTime;
  }

  set chargeRegenTime(value: number) {
    this._chargeRegenTime = value;
    this.updateDisplay();
  }

  updateChargeTimers(timers: readonly number[]) {
    this.chargeTimers.clear();
    this.chargeTimers.push(...timers);
    this.updateDisplay();
  }

  private updateDisplay() {
    // Clear existing charges
    for (const charge of this.charges) charge.destroy();
    this.charges.clear();

    // Create charge indicators
    for (let i = 0; i < this._maxCharges; i++) {
      const charge = new Graphics();
      const x = (this._maxCharges - 1 - i) * (this.chargeSize + this.chargeSpacing);

      // Determine if this charge is available or recharging based on timer
      const chargeTimer = this.chargeTimers[i] ?? 0;
      const isAvailable = chargeTimer === 0;
      const isRecharging = chargeTimer > 0;

      const fillColor = isAvailable ? this.availableColor : this.rechargingColor;

      // Draw charge indicator (circle)
      charge
        .circle(x + this.chargeSize / 2, this.chargeSize / 2, this.chargeSize / 2)
        .fill({ color: fillColor })
        .stroke({ color: this.borderColor, width: 2 });

      // Add recharge progress arc if recharging
      if (isRecharging) {
        const progress = 1 - chargeTimer / this._chargeRegenTime;
        const endAngle = -Math.PI / 2 + Math.PI * 2 * progress;

        charge
          .moveTo(x + this.chargeSize / 2, this.chargeSize / 2)
          .arc(x + this.chargeSize / 2, this.chargeSize / 2, this.chargeSize / 2 - 3, -Math.PI / 2, endAngle, false)
          .fill({ color: this.availableColor });
      }

      this.charges.push(charge);
      this.addChild(charge);
    }
  }
}
