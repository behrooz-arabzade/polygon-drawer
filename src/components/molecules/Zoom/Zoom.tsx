import React, { FC } from "react";
import styles from "./Zoom.module.css";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const Zoom: FC = () => {
  //...... redux states ......//
  const zoom = useSelector((state: RootState) => state.canvases.tabs[state.canvases.selectedTabId].canvasData.zoom);
  //...... redux states ......//

  return (
    <p className={styles.root}>{`Zoom level: ${(zoom * 100).toFixed(0)} %`}</p>
  );
};

export default React.memo(Zoom);
