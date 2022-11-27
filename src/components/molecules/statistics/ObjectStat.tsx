import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import styles from "./statistics.module.css";

const ObjectStat: FC = () => {
  const canvasData = useSelector((state: RootState) => state.canvases.tabs[state.canvases.selectedTabId].canvasData);

  return (
    <p className={styles.text}>{`Object number: ${canvasData.canvasObjects.length}`}</p>
  );
};

export default React.memo(ObjectStat);
