import { Button } from "@mui/material";
import Tab from "components/molecules/Tab/Tab";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTab, selectTab } from "store/slices/canvasesSlice/canvasesSlice";
import { getInitialCanvasData } from "store/slices/canvasesSlice/helper";
import { CanvasTab } from "store/slices/canvasesSlice/type";
import { RootState } from "store/store";
import { getRandomString } from "../canvasContainer/canvas/CanvasHelper";
import styles from "./Tabs.module.css";
import MuiTabs from '@mui/material/Tabs';

const Tabs: FC = () => {
  //...... redux states ......//
  const tabs = useSelector((state: RootState) => state.canvases.tabs);
  const selectedTabId = useSelector((state: RootState) => state.canvases.selectedTabId);
  //...... redux states ......//

  //...... constants ......//
  const dispatch = useDispatch();
  //...... constants ......//

  //...... handlers ......//
  const createNewTab = () => {
    dispatch(addNewTab())
  };

  const handleTabChange = (newTabId: string) => {
    dispatch(selectTab(newTabId))
  };
  //...... handlers ......//
  return (
    <div className={styles.root}>
      <div className={styles.tabsParent}>
        <>
          <p className={styles.title}>Polygon Drawer (v0.0.1)</p>
          <div className={styles.tabsContainer}>
            <MuiTabs
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              value={selectedTabId}
            >
              {
                Object.values(tabs).map((tab) => {
                  return (
                    <Tab
                      onClick={handleTabChange}
                      key={tab.id}
                      id={tab.id}
                      value={tab.id}
                      name={tab.name}
                      selected={tab.id === selectedTabId}
                    />
                  )
                })
              }
            </MuiTabs>
          </div>

        </>
      </div>
      <Button variant="text" className={styles.addButton} onClick={createNewTab}>
        +
      </Button>
    </div>
  );
};

export default Tabs;
