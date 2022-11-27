import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import styles from "./statistics.module.css";

const PointStat: FC = () => {
  //...... redux states ......//
  const canvasData = useSelector(
    (state: RootState) =>
      state.canvases.tabs[state.canvases.selectedTabId].canvasData
  );
  //...... redux states ......//

  //...... Constants ......//
  const pointNumber = canvasData.canvasObjects.reduce((sum, obj) => {
    sum += obj.points.length;
    return sum;
  }, 0);
  //...... Constants ......//

  return <p className={styles.text}>{`Point number: ${pointNumber}`}</p>;
};

export default React.memo(PointStat);
