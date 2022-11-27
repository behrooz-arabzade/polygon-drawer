import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import styles from "./statistics.module.css";

const CanvasSize: FC = () => {
  //...... redux states ......//
  const size = useSelector(
    (state: RootState) =>
      state.canvases.tabs[state.canvases.selectedTabId].canvasData.size
  );
  //...... redux states ......//

  return (
    <p
      className={styles.text}
    >{`Canvas size: ${size.width} x ${size.height}`}</p>
  );
};

export default React.memo(CanvasSize);
