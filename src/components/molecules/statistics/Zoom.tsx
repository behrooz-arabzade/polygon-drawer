import React, { FC } from "react";
import styles from "./statistics.module.css";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const Zoom: FC = () => {
  //...... redux states ......//
  const zoom = useSelector(
    (state: RootState) =>
      state.canvases.tabs[state.canvases.selectedTabId].canvasData.zoom
  );
  //...... redux states ......//

  return (
    <p className={styles.text}>{`Zoom level: ${(zoom * 100).toFixed(0)} %`}</p>
  );
};

export default React.memo(Zoom);
