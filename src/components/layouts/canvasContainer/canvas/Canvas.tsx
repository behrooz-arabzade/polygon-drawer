import React, { FC, useState, useRef } from "react";
import styles from "./Canvas.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { Stage, Layer, Group, Line, Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import CanvasObject, {
  ICanvasObjectRef,
} from "components/molecules/CanvasObject/CanvasObject";
import { getMousePos, getRandomString, getPoint2d, isLeftClick, areNear } from './CanvasHelper';
import { Point2d } from "store/slices/canvasesSlice/type";
import Polygon from "types/CanvasObjects/Polygon/Polygon";
import { addCanvasObject, setCurrentDrawingId, setZoom } from "store/slices/canvasesSlice/canvasesSlice";

const Canvas: FC = () => {
  //...... local states ......//
  const [drawing, setDrawing] = useState(false);
  const [mousePos, setMousePos] = useState<Point2d>();
  const [mouseDownPos, setMouseDownPos] = useState<Point2d>();
  //...... local states ......//

  //...... redux states ......//
  const { zoom, canvasObjects, size, currentDrawingObjectId } = useSelector((state: RootState) => state.canvases.tabs[state.canvases.selectedTabId].canvasData);
  const selectedTool = useSelector(
    (state: RootState) => state.toolbar.selectedTool
  );
  //...... redux states ......//

  //...... constants ......//
  const currentDrawingObject = useRef<ICanvasObjectRef>(null);
  const dispatch: AppDispatch = useDispatch();
  //...... constants ......//

  //...... handlers ......//
  const startNewOne = (startingPos: Point2d) => {
    const newObject = new Polygon(getRandomString(10), [startingPos]);

    dispatch(setCurrentDrawingId(newObject.id));
    dispatch(addCanvasObject(newObject.getSerializablePolygon()));

    setDrawing(true);
  };

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    const mousePos = getMousePos(event.target.getStage());
    setMouseDownPos(getPoint2d(mousePos, zoom));
  }

  const handleClick = (event: KonvaEventObject<MouseEvent>) => {
    if (!isLeftClick(event.evt)) return;

    if (!drawing) {
      if (selectedTool === "polygon") {
        const mousePos = getPoint2d(getMousePos(event.target.getStage()), zoom);

        if (areNear(mousePos, mouseDownPos))
          startNewOne(mousePos);
      }
      return;
    }

    currentDrawingObject.current?.handleClick(event);
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    const mousePos = getMousePos(event.target.getStage());
    setMousePos(getPoint2d(mousePos, zoom));
  };

  const onObjectCompleted = () => {
    setDrawing(false);
    dispatch(setCurrentDrawingId(null))
  };
  //...... handlers ......//

  return (
    <Stage
      className={styles.stage}
      width={size.width * zoom}
      height={size.height * zoom}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      scaleX={zoom}
      scaleY={zoom}
    >
      <Layer>
        {canvasObjects.map((obj) => {
          const isDrawingObject = obj.id === currentDrawingObjectId;
          return (
            <CanvasObject
              key={obj.id}
              obj={obj}
              ref={isDrawingObject ? currentDrawingObject : undefined}
              mousePos={isDrawingObject ? mousePos : undefined}
              onComplete={isDrawingObject ? onObjectCompleted : undefined}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default React.memo(Canvas);
