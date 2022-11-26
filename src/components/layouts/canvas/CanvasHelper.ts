import { Stage as StageClass } from "konva/lib/Stage";
import { Point2d } from "store/slices/canvasSlice/type";

export const getMousePos = (stage: StageClass | null) => {
  return [stage?.getPointerPosition()?.x, stage?.getPointerPosition()?.y];
};

export const getKonvaPoint = (point: Point2d) => {
  return [point.x, point.y];
};

export const getPoint2d = (
  point: (number | undefined)[],
  zoom: number = 1
): Point2d => {
  return {
    x: point[0]! / zoom,
    y: point[1]! / zoom,
  };
};

export const getRandomString = (length: number): string => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
