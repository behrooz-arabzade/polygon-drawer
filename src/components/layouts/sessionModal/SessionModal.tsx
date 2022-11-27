import { FC } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import styles from "./SessionModal.module.css";

interface ISessionModal {
  show?: boolean;
  onCancel?: () => void;
  onResetSession: () => void;
}

const SessionModal: FC<ISessionModal> = ({
  show,
  onCancel,
  onResetSession,
}) => {
  return (
    <Modal
      disableAutoFocus
      open={Boolean(show)}
      onClose={onCancel}
      className={styles.modal}
    >
      <div className={styles.root}>
        <p className={styles.message}>
          Would you like to restore the previous session or create a new one?
        </p>
        <div className={styles.actionBox}>
          <Button
            className={styles.button}
            variant="contained"
            onClick={onCancel}
          >
            Continue
          </Button>
          <Button
            className={styles.button}
            variant="contained"
            onClick={onResetSession}
          >
            New Session
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SessionModal;
