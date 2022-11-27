import CanvasContainer from "components/layouts/canvasContainer/CanvasContainer";
import SessionModal from "components/layouts/sessionModal/SessionModal";
import Tabs from "components/layouts/tabs/Tabs";
import Toolbar from "components/layouts/toolbar/Toolbar";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetSession } from "store/slices/canvasesSlice/canvasesSlice";
import { store } from "store/store";
import { isInitialState } from "store/slices/canvasesSlice/helper";
import styles from "./Main.module.css";

const Main: FC = () => {
  const [showSessionModal, setShowSessionModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isInitialState(store.getState())) {
      setShowSessionModal(true);
    }
  }, []);

  const onResetSession = () => {
    dispatch(resetSession());
    setShowSessionModal(false);
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.tabContainer}>
          <Tabs />
        </div>
        <div className={styles.toolbarContainer}>
          <Toolbar />
        </div>
        <div className={styles.canvasContainer}>
          <CanvasContainer />
        </div>
      </div>

      <SessionModal
        show={showSessionModal}
        onCancel={() => setShowSessionModal(false)}
        onResetSession={onResetSession}
      />
    </>
  );
};

export default Main;
