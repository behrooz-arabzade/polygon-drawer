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

export const isLeftClick = (evt: any): boolean => {
  evt = evt || window.event;
  const button = evt.button;
  return button == 0;
}

export const areNear = (point1: Point2d | undefined, point2: Point2d | undefined, threshold: number = 5): boolean => {
  if (!point1 || !point2) return false;
  return (
    point1.x - point2.x < threshold && point1.y - point2.y < threshold
  )
}