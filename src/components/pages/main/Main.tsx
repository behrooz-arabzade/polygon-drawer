import Canvas from "components/layouts/canvas/Canvas";
import Tabs from "components/layouts/tabs/Tabs";
import Toolbar from "components/layouts/toolbar/Toolbar";
import Zoom from "components/molecules/Zoom/Zoom";
import { FC } from "react";
import styles from "./Main.module.css";

const Main: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.tabContainer}>
        <Tabs />
      </div>
      <div className={styles.canvasContainer}>
        <Zoom />
        <Canvas />
      </div>
      <div className={styles.toolbarContainer}>
        <Toolbar />
      </div>
    </div>
  );
};

export default Main;
