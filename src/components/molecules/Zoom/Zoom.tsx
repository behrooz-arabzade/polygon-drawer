import { FC } from "react";
import styles from "./Zoom.module.css";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const Zoom: FC = ({}) => {
  const zoom = useSelector((state: RootState) => state.canvas.zoom);
  return (
    <p className={styles.root}>{`Zoom level: ${(zoom * 100).toFixed(0)} %`}</p>
  );
};

export default Zoom;
