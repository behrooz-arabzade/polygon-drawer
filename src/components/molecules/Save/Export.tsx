import React, { FC } from "react";
import styles from "./Export.module.css";
import { Button } from '@mui/material';
import { store } from "store/store";

const Export: FC = () => {
  const handleClick = () => {
    const canvas = store.getState().canvas;
    let a = document.createElement("a")
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(canvas, null, 2)], { type: "application/json" })
    )
    a.download = "canvas.json"
    a.click()
  }

  return (
    <Button variant="contained" className={styles.root} onClick={handleClick}>Export current tab json</Button>
  );
};

export default React.memo(Export);
