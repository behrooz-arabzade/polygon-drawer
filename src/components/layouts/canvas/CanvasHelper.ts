import { Stage as StageClass } from "konva/lib/Stage";
import { Point2d } from "store/slices/canvasSlice/type";

export const getMousePos = (stage: StageClass | null) => {
  return [stage?.getPointerPosition()?.x, stage?.getPointerPosition()?.y];
};

export const getKonvaPoint = (point: Point2d) => {
  return [point.x, point.y];
};

export const getPoint2d = (point: number[]) => {
  return {
    x: point[0],
    y: point[1],
  };
};
