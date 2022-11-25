import {
  FC,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from "react";
import styles from "./ToolbarItem.module.css";
import cs from "classnames";
import Polygon from "types/CanvasObjects/Polygon/Polygon";
import { Point2d } from "store/slices/canvasSlice/type";
import { Stage, Layer, Group, Line, Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage as StageClass } from "konva/lib/Stage";
import {
  getKonvaPoint,
  getMousePos,
} from "components/layouts/canvas/CanvasHelper";

interface ICanvasObject {
  obj: Polygon;
  mousePos: Point2d | undefined;
  onComplete: () => void;
}

export interface ICanvasObjectRef {
  handleClick: (event: KonvaEventObject<MouseEvent>) => void;
}

const CanvasObject: ForwardRefRenderFunction<
  ICanvasObjectRef,
  ICanvasObject
> = ({ obj, mousePos, onComplete }, forwardedRef) => {
  useImperativeHandle(forwardedRef, () => ({
    handleClick(event: KonvaEventObject<MouseEvent>) {
      handleClick(event);
    },
  }));

  const [mouseAtStartPoint, setMouseAtStartPoint] = useState(false);

  const handleClick = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);

    if (mouseAtStartPoint && obj.points.size() >= 3) {
      onComplete();
    } else {
      obj.addPoint({ x: mousePos[0]!, y: mousePos[1]! });
    }
  };

  const handleMouseOverStartPoint = (event: KonvaEventObject<MouseEvent>) => {
    if (obj.points.size() < 3 || obj.state === "close") return;

    event.target.scale({ x: 2, y: 2 });

    setMouseAtStartPoint(true);
  };

  const handleMouseOutStartPoint = (event: KonvaEventObject<MouseEvent>) => {
    event.target.scale({ x: 1, y: 1 });

    setMouseAtStartPoint(false);
  };

  const pointLines = obj.points
    .traverse()
    .concat(obj.state === "close" ? [] : mousePos!)
    .reduce<number[]>((array, p) => {
      array.push(p.x);
      array.push(p.y);
      return array;
    }, []);

  return (
    <>
      <Line points={pointLines} stroke="black" strokeWidth={2} closed={true} />

      {obj.points.traverse().map((point, index) => {
        const startPointAttribute =
          index === 0
            ? {
                hitStrokeWidth: 12,
                onMouseOver: handleMouseOverStartPoint,
                onMouseOut: handleMouseOutStartPoint,
              }
            : null;
        return (
          <Rect
            key={index}
            x={point.x}
            y={point.y}
            width={4}
            height={4}
            fill="white"
            stroke="black"
            strokeWidth={2}
            draggable
            {...startPointAttribute}
          />
        );
      })}
    </>
  );
};

export default forwardRef(CanvasObject);
