import { FC, useState, useRef } from "react";
import styles from "./Canvas.module.css";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { Stage, Layer, Group, Line, Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import CanvasObject, {
  ICanvasObjectRef,
} from "components/molecules/CanvasObject/CanvasObject";
import { getMousePos } from "./CanvasHelper";
import { Point2d } from "store/slices/canvasSlice/type";

const Canvas: FC = () => {
  const [drawing, setDrawing] = useState(false);
  const [mousePos, setMousePos] = useState<Point2d>();
  const drawingObjectRef = useRef<ICanvasObjectRef>(null);

  const canvas = useSelector((state: RootState) => state.canvas);

  const startNewOne = () => {};

  const handleClick = (event: KonvaEventObject<MouseEvent>) => {
    if (!drawing) {
      startNewOne();
      return;
    }

    drawingObjectRef.current?.handleClick(event);
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);

    setMousePos({ x: mousePos[0]!, y: mousePos[1]! });
  };

  const onObjectCompleted = () => {
    setDrawing(false);
  };

  return (
    <div className={styles.root}>
      <Stage
        className={styles.stage}
        width={canvas.size.width}
        height={canvas.size.height}
        onMouseDown={handleClick}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          {canvas.canvasObjects.map((obj) => {
            return (
              <CanvasObject
                ref={drawingObjectRef}
                mousePos={mousePos}
                obj={obj}
                onComplete={onObjectCompleted}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
