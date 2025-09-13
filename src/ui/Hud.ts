import { type Application, Container, Graphics, Text } from "pixi.js";

export class Hud {
  readonly info: Text;
  private readonly btns: Partial<{
    auto: HTMLButtonElement;
    easy: HTMLButtonElement;
    alt: HTMLButtonElement;
    dash: HTMLButtonElement;
    block: HTMLButtonElement;
  }> = {};
  private readonly hpBg: Graphics;
  private readonly hpFg: Graphics;
  private readonly energyBg: Graphics;
  private readonly energyFg: Graphics;
  private readonly lvlText: Text;
  private readonly xpText: Text;
  onAuto?: (v: boolean) => void;
  onEasy?: () => void;
  onAlt?: () => void;
  onDash?: () => void;
  onBlock?: () => void;
  auto = true;
  constructor(readonly app: Application) {
    const ui = new Container();
    this.app.stage.addChild(ui);
    this.info = new Text({ text: "", style: { fill: "#fff", fontSize: 14, letterSpacing: 1 } });
    this.info.x = 12;
    this.info.y = 10;
    ui.addChild(this.info);

    // health bar
    this.hpBg = new Graphics();
    this.hpBg.beginFill(0x222222);
    this.hpBg.drawRect(12, 34, 160, 12);
    this.hpBg.endFill();
    ui.addChild(this.hpBg);
    this.hpFg = new Graphics();
    ui.addChild(this.hpFg);

    // energy bar
    this.energyBg = new Graphics();
    this.energyBg.beginFill(0x222222);
    this.energyBg.drawRect(12, 50, 160, 10);
    this.energyBg.endFill();
    ui.addChild(this.energyBg);
    this.energyFg = new Graphics();
    ui.addChild(this.energyFg);

    this.lvlText = new Text({ text: "Lv:1", style: { fill: "#fff", fontSize: 13 } });
    this.lvlText.x = 12;
    this.lvlText.y = 66;
    ui.addChild(this.lvlText);
    this.xpText = new Text({ text: "XP:0/5", style: { fill: "#fff", fontSize: 13 } });
    this.xpText.x = 80;
    this.xpText.y = 66;
    ui.addChild(this.xpText);

    // DOM overlay for buttons
    const panel = document.createElement("div");
    panel.style.position = "fixed";
    panel.style.bottom = "1.5rem";
    panel.style.left = "50%";
    panel.style.transform = "translateX(-50%)";
    panel.style.display = "flex";
    panel.style.gap = "0.7rem";
    panel.style.zIndex = "9999";
    panel.style.pointerEvents = "auto";
    panel.style.userSelect = "none";
    panel.style.touchAction = "manipulation";
    document.body.append(panel);

    const makeBtn = (label: string, id: keyof Hud["btns"], cb: () => void) => {
      const b = document.createElement("button");
      b.textContent = label;
      b.style.fontSize = "1.1rem";
      b.style.padding = "0.5em 1.1em";
      b.style.borderRadius = "0.7em";
      b.style.border = "none";
      b.style.background = "#222a";
      b.style.color = "#fff";
      b.style.fontWeight = "bold";
      b.style.boxShadow = "0 2px 8px #0004";
      b.style.cursor = "pointer";
      b.style.outline = "none";
      b.style.transition = "background 0.2s";
      b.onclick = (e) => {
        e.preventDefault();
        cb();
      };
      panel.append(b);
      this.btns[id] = b;
      return b;
    };

    // Buttons
    makeBtn("Auto: ON", "auto", () => {
      this.auto = !this.auto;
      if (this.btns.auto) this.btns.auto.textContent = `Auto: ${this.auto ? "ON" : "OFF"}`;
      log("HUD", "auto", this.auto);
      this.onAuto?.(this.auto);
    });
    makeBtn("Easy Attack", "easy", () => {
      log("HUD", "easy");
      this.onEasy?.();
      this.setStatus("Easy Attack");
    });
    makeBtn("Alt Attack", "alt", () => {
      log("HUD", "alt");
      this.onAlt?.();
      this.setStatus("Alt Attack");
    });
    makeBtn("Dash", "dash", () => {
      log("HUD", "dash");
      this.onDash?.();
      this.setStatus("Dash");
    });
    makeBtn("Block", "block", () => {
      log("HUD", "block");
      this.onBlock?.();
      this.setStatus("Block");
    });
  }
  setStatus(s: string) {
    this.info.text = s;
  }

  setHealth(cur: number, max: number) {
    const w = 160 * Math.max(0, Math.min(1, cur / max));
    this.hpFg.clear();
    this.hpFg.beginFill(0xff4444);
    this.hpFg.drawRect(12, 34, w, 12);
    this.hpFg.endFill();
  }

  setEnergy(cur: number, max: number) {
    const w = 160 * Math.max(0, Math.min(1, cur / max));
    this.energyFg.clear();
    this.energyFg.beginFill(0x44aaff);
    this.energyFg.drawRect(12, 50, w, 10);
    this.energyFg.endFill();
  }

  setXP(level: number, xp: number, next: number) {
    this.lvlText.text = `Lv:${level}`;
    this.xpText.text = `XP:${xp}/${next}`;
  }
}
