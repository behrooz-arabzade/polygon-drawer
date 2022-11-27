import React, { FC } from "react";
import styles from "./Point.module.css";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { Circle } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Point2d } from "store/slices/canvasesSlice/type";
import {
  getMousePos,
  getPoint2d,
} from "components/layouts/canvasContainer/canvas/CanvasHelper";

interface IPoint {
  index: number;
  pointX: number;
  pointY: number;
  polygonPointSize: number;
  isDrawing?: boolean;
  onPointMove: (index: number, mousePos: Point2d) => void;
  onFirstPointClick: () => void;
}

const Point: FC<IPoint> = ({
  index,
  pointX,
  pointY,
  isDrawing,
  polygonPointSize,
  onPointMove,
  onFirstPointClick,
}) => {
  //...... local states ......//
  const [mouseAtStartPoint, setMouseAtStartPoint] = useState(false);
  //...... local states ......//

  //...... redux states ......//
  const zoom = useSelector(
    (state: RootState) =>
      state.canvases.tabs[state.canvases.selectedTabId].canvasData.zoom
  );
  const currentDrawingObjectId = useSelector(
    (state: RootState) =>
      state.canvases.tabs[state.canvases.selectedTabId].canvasData
        .currentDrawingObjectId
  );
  //...... redux states ......//

  //...... handlers ......//
  const handleMouseOverStartPoint = (event: KonvaEventObject<MouseEvent>) => {
    if (polygonPointSize < 3 || !isDrawing) return;

    event.target.scale({ x: 2, y: 2 });
    setMouseAtStartPoint(true);
  };

  const handleMouseOutStartPoint = (event: KonvaEventObject<MouseEvent>) => {
    event.target.scale({ x: 1, y: 1 });
    setMouseAtStartPoint(false);
  };

  const onClick = (event: KonvaEventObject<MouseEvent>) => {
    if (index === 0 && isDrawing && mouseAtStartPoint) {
      event.cancelBubble = true;
      event.target.scale({ x: 1, y: 1 });
      onFirstPointClick();
    }
  };

  const onPointDragStart = (event: KonvaEventObject<MouseEvent>) => {
    event.target.scale({ x: 2, y: 2 });
  };

  const onPointDragEnd =
    (index: number) => (event: KonvaEventObject<MouseEvent>) => {
      event.target.scale({ x: 1, y: 1 });

      const stage = event.target.getStage();
      const mousePos = getPoint2d(getMousePos(stage), zoom);

      onPointMove(index, mousePos);
    };

  const onDragMove =
    (index: number) => (event: KonvaEventObject<MouseEvent>) => {
      const stage = event.target.getStage();
      const mousePos = getPoint2d(getMousePos(stage), zoom);

      onPointMove(index, mousePos);
    };
  //...... handlers ......//

  const startPointAttribute =
    index === 0 && isDrawing
      ? {
          hitStrokeWidth: 12,
          onMouseOver: handleMouseOverStartPoint,
          onMouseOut: handleMouseOutStartPoint,
        }
      : null;

  return (
    <Circle
      key={index}
      x={pointX}
      y={pointY}
      width={6}
      height={6}
      fill="white"
      stroke="black"
      strokeWidth={2}
      draggable={!isDrawing && !Boolean(currentDrawingObjectId)}
      onDragStart={!isDrawing ? onPointDragStart : undefined}
      onDragMove={!isDrawing ? onDragMove(index) : undefined}
      onDragEnd={!isDrawing ? onPointDragEnd(index) : undefined}
      onClick={!isDrawing || index === 0 ? onClick : undefined}
      {...startPointAttribute}
    />
  );
};

export default React.memo(Point);
