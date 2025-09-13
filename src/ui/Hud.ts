import { Container, Text, Application } from 'pixi.js';

export class Hud {
  readonly info: Text;
  constructor(readonly app: Application) {
    const ui = new Container();
    this.app.stage.addChild(ui);
    this.info = new Text({ text:'', style:{ fill:'#fff', fontSize:14, letterSpacing:1 }});
    this.info.x = 12; this.info.y = 10; ui.addChild(this.info);
  }
  setStatus(s: string) { this.info.text = s; }
}
