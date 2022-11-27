import { SerializablePolygon } from "types/CanvasObjects/Polygon/type";

export interface TabsState {
  tabs: Record<string, CanvasTab>,
  selectedTabId: string,
}

export interface CanvasData {
  canvasObjects: SerializablePolygon[];
  size: CanvasSize;
  zoom: number;
  currentDrawingObjectId: string | null;
}

export interface CanvasTab {
  id: string;
  name: string;
  canvasData: CanvasData;
}

export interface Point2d {
  x: number;
  y: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}
