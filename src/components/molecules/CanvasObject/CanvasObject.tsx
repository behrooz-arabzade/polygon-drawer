import React, {
  FC,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Polygon from "types/CanvasObjects/Polygon/Polygon";
import { Point2d } from "store/slices/canvasesSlice/type";
import { Stage, Layer, Group, Line, Rect, Circle } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import {
  getMousePos,
  getPoint2d,
} from "components/layouts/canvasContainer/canvas/CanvasHelper";
import { RootState } from "store/store";
import { updateCanvasObject } from "store/slices/canvasesSlice/canvasesSlice";
import { SerializablePolygon } from "types/CanvasObjects/Polygon/type";
import Point from "./Point/Point";

interface ICanvasObject {
  obj: SerializablePolygon;
  mousePos?: Point2d;
  onComplete?: () => void;
}

export interface ICanvasObjectRef {
  handleClick: (event: KonvaEventObject<MouseEvent>) => void;
}

const CanvasObject: ForwardRefRenderFunction<
  ICanvasObjectRef,
  ICanvasObject
> = ({ obj, mousePos, onComplete }, forwardedRef) => {
  //...... ref implementation ......//
  useImperativeHandle(forwardedRef, () => ({
    handleClick(event: KonvaEventObject<MouseEvent>) {
      handleClick(event);
    },
  }));
  //...... ref implementation ......//

  //...... redux states ......//
  const zoom = useSelector(
    (state: RootState) =>
      state.canvases.tabs[state.canvases.selectedTabId].canvasData.zoom
  );
  //...... redux states ......//

  //...... constants ......//
  const dispatch = useDispatch();
  const polygon = new Polygon(obj.id, obj.points, obj.state);
  const isDrawing = polygon.state === "open";
  const linePoints = polygon.points
    .traverse()
    .concat(polygon.state === "close" ? [] : mousePos!) // to draw last line of open polygon
    .reduce<number[]>((array, p) => {
      array.push(p.x);
      array.push(p.y);
      return array;
    }, []);
  //...... constants ......//

  //...... handlers ......//
  const handleClick = (event: KonvaEventObject<MouseEvent>) => {
    const mousePos = getMousePos(event.target.getStage());

    polygon.addPoint(getPoint2d(mousePos, zoom));

    dispatch(updateCanvasObject(polygon.getSerializablePolygon()));
  };

  const onFirstPointClick = () => {
    polygon.close();
    onComplete?.();

    dispatch(updateCanvasObject(polygon.getSerializablePolygon()));
  };

  const onPointMove = (index: number, mousePos: Point2d) => {
    polygon.updatePoint(index, mousePos);
    dispatch(updateCanvasObject(polygon.getSerializablePolygon()));
  };
  //...... handlers ......//

  return (
    <>
      <Line
        points={linePoints}
        stroke="black"
        strokeWidth={2}
        closed={!isDrawing}
      />

      {polygon.points.traverse().map((point, index) => {
        return (
          <Point
            key={index}
            index={index}
            onPointMove={onPointMove}
            pointX={point.x}
            pointY={point.y}
            polygonPointSize={polygon.points.size()}
            isDrawing={isDrawing}
            onFirstPointClick={onFirstPointClick}
          />
        );
      })}
    </>
  );
};

export default React.memo(forwardRef(CanvasObject));
