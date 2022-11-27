import { FC } from "react";
import styles from "./CanvasContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import Canvas from "./canvas/Canvas";
import Export from "components/molecules/Save/Export";
import Import from "components/molecules/Import/Import";
import Statistics from "./statistics/Statistics";
import { setZoom } from "store/slices/canvasesSlice/canvasesSlice";

const CanvasContainer: FC = () => {
  //...... redux states ......//
  const zoom = useSelector((state: RootState) => state.canvases.tabs[state.canvases.selectedTabId].canvasData.zoom);
  //...... redux states ......//

  //...... constants ......//
  const dispatch = useDispatch();
  //...... constants ......//

  //...... handlers ......//
  const handleWheel = (event: React.WheelEvent) => {
    let direction = event.deltaY > 0 ? -1 : 1;

    const zoomSpeed = 1.02;

    const newZoom =
      direction > 0 ? zoom * zoomSpeed : zoom / zoomSpeed;

    dispatch(setZoom(newZoom));
  };
  //...... handlers ......//

  return (
    <>
      <Statistics />
      <Export />
      <Import />
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
