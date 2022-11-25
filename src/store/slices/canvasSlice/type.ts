import Polygon from "types/CanvasObjects/Polygon/Polygon";

export interface MyCanvasState {
  canvasObjects: Polygon[];
  size: CanvasSize;
  zoom: number;
}

export interface Point2d {
  x: number;
  y: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}
