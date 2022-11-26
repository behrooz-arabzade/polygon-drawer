import { FC, useState, useRef } from "react";
import styles from "./Canvas.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { Stage, Layer, Group, Line, Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import CanvasObject, {
  ICanvasObjectRef,
} from "components/molecules/CanvasObject/CanvasObject";
import { getMousePos, getRandomString, getPoint2d } from "./CanvasHelper";
import { Point2d } from "store/slices/canvasSlice/type";
import Polygon from "types/CanvasObjects/Polygon/Polygon";
import { addCanvasObject, setZoom } from "store/slices/canvasSlice/canvasSlice";

const Canvas: FC = () => {
  const [drawing, setDrawing] = useState(false);
  const [mousePos, setMousePos] = useState<Point2d>();
  const drawingObjectRef = useRef<ICanvasObjectRef>(null);
  const dispatch: AppDispatch = useDispatch();

  const canvas = useSelector((state: RootState) => state.canvas);
  const selectedTool = useSelector(
    (state: RootState) => state.toolbar.selectedTool
  );

  const startNewOne = (startingPos: Point2d) => {
    setDrawing(true);

    console.log("startNewOne startingPos", startingPos);
    const newObject = new Polygon(getRandomString(10), startingPos);

    dispatch(addCanvasObject(newObject));
  };

  const handleClick = (event: KonvaEventObject<MouseEvent>) => {
    if (!drawing) {
      if (selectedTool === "polygon") {
        const stage = event.target.getStage();
        const mousePos = getPoint2d(getMousePos(stage), canvas.zoom);
        startNewOne(mousePos);
      }
      return;
    }

    drawingObjectRef.current?.handleClick(event);
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);

    let point = getPoint2d(mousePos, canvas.zoom);
    setMousePos(point);
  };

  const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
    let direction = event.evt.deltaY > 0 ? -1 : 1;

    const zoomSpeed = 1.01;

    const newZoom =
      direction > 0 ? canvas.zoom * zoomSpeed : canvas.zoom / zoomSpeed;

    dispatch(setZoom(newZoom));
  };

  const onObjectCompleted = () => {
    setDrawing(false);
  };

  return (
    <div className={styles.root}>
      <p className={styles.zoom}>{`Zoom level: ${canvas.zoom}`}</p>
      <Stage
        className={styles.stage}
        width={canvas.size.width * canvas.zoom}
        height={canvas.size.height * canvas.zoom}
        onMouseDown={handleClick}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        scaleX={canvas.zoom}
        scaleY={canvas.zoom}
      >
        <Layer>
          {canvas.canvasObjects.map((obj) => {
            return (
              <CanvasObject
                key={obj.id}
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
