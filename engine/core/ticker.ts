import { Ticker } from "pixi.js";

export const ticker = new Ticker();
ticker.minFPS = 10;
ticker.maxFPS = 60;
ticker.autoStart = false;

export function delay(seconds: number) {
  return new Promise<void>((resolve) => {
    let elapsed = 0;
    const onTick = ({ deltaMS }: Ticker) => {
      elapsed += deltaMS / 1000;
      if (elapsed >= seconds) {
        ticker.remove(onTick);
        resolve();
      }
    };
    ticker.add(onTick);
  });
}
