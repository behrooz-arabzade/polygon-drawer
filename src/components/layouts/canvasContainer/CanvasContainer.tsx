import { FC } from "react";
import styles from "./CanvasContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { setZoom } from "store/slices/canvasSlice/canvasSlice";
import Zoom from "components/molecules/Zoom/Zoom";
import Canvas from "./canvas/Canvas";
import Save from "components/molecules/Save/Save";

const CanvasContainer: FC = () => {
  //...... redux states ......//
  const zoom = useSelector((state: RootState) => state.canvas.zoom);
  //...... redux states ......//

  //...... constants ......//
  const dispatch = useDispatch();
  //...... constants ......//

  //...... handlers ......//
  const handleWheel = (event: React.WheelEvent) => {
    let direction = event.deltaY > 0 ? -1 : 1;

    const zoomSpeed = 1.01;

    const newZoom =
      direction > 0 ? zoom * zoomSpeed : zoom / zoomSpeed;

    dispatch(setZoom(newZoom));
  };
  //...... handlers ......//

  return (
    <>
      <Zoom />
      <Save />
      <div
        className={styles.root}
        onWheel={handleWheel}
      >
        <Canvas />
      </div>
    </>
  );
};

export default CanvasContainer;
