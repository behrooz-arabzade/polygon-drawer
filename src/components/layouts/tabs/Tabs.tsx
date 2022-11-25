import { Button } from "@mui/material";
import { FC } from "react";
import styles from "./Tabs.module.css";

const Tabs: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.tabsParent}>
        Polygon Drawer (v0.0.1)
        {/* Iterate between available tabs */}
      </div>
      {/* <Button variant="text" className={styles.addButton}>
        +
      </Button> */}
    </div>
  );
};

export default Tabs;
