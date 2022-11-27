import { SerializablePolygon } from "types/CanvasObjects/Polygon/type";

export interface MyCanvasState {
  canvasObjects: SerializablePolygon[];
  size: CanvasSize;
  zoom: number;
  currentDrawingObjectId: string | null
}

export interface Point2d {
  x: number;
  y: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}
