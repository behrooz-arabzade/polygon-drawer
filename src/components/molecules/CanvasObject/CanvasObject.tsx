import {
  FC,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Polygon from "types/CanvasObjects/Polygon/Polygon";
import { Point2d } from "store/slices/canvasSlice/type";
import { Stage, Layer, Group, Line, Rect, Circle } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import {
  getMousePos,
  getPoint2d,
} from "components/layouts/canvas/CanvasHelper";
import { AppDispatch, RootState } from "store/store";
import { updateCanvasObject } from "store/slices/canvasSlice/canvasSlice";

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
  const dispatch: AppDispatch = useDispatch();
  const zoom = useSelector((state: RootState) => state.canvas.zoom);

  const handleClick = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);

    if (mouseAtStartPoint && obj.points.size() >= 3) {
      obj.close();
      onComplete();
    } else {
      let point = getPoint2d(mousePos, zoom);
      obj.addPoint(point);
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

  const onPointMove =
    (index: number) => (event: KonvaEventObject<MouseEvent>) => {
      const stage = event.target.getStage();
      const mousePos = getPoint2d(getMousePos(stage));

      console.log("onPointMove index", index, mousePos);
      obj.updatePoint(index, mousePos);
      dispatch(updateCanvasObject(obj));
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
      <Line
        points={pointLines}
        stroke="black"
        strokeWidth={2}
        closed={obj.state === "close"}
      />

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
          <Circle
            key={index}
            x={point.x}
            y={point.y}
            width={5}
            height={5}
            fill="white"
            stroke="black"
            strokeWidth={2}
            // draggable
            onDragMove={onPointMove(index)}
            {...startPointAttribute}
          />
        );
      })}
    </>
  );
};

export default forwardRef(CanvasObject);
