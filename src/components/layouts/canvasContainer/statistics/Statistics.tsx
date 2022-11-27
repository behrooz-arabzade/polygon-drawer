import ObjectStat from "components/molecules/statistics/ObjectStat";
import PointStat from "components/molecules/statistics/PointStat";
import Zoom from "components/molecules/statistics/Zoom";
import React, { FC } from "react";
import styles from "./Statistics.module.css";

const Statistics: FC = () => {
  return (
    <div className={styles.root}>
      <Zoom />
      <ObjectStat />
      <PointStat />
    </div>
  );
};

export default React.memo(Statistics);
