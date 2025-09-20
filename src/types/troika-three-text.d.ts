declare module "troika-three-text" {
  import { Object3D, Color } from "three";

  export class Text extends Object3D {
    text: string;
    fontSize: number;
    color: number | Color | string;
    fontWeight: string;
    textAlign: string;
    anchorX: string | number;
    anchorY: string | number;
    fillOpacity: number;

    sync(): void;
    dispose(): void;
  }
}
