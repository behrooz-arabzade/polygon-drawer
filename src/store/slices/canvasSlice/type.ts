export interface MyCanvasState {
  canvasObjects: CanvasObject[];
  size: CanvasSize;
  zoom: number;
}

export interface CanvasObject {
  id: string;
}

export interface Point2d {
  x: number;
  y: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}
