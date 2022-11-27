import React, { FC } from "react";
import styles from "./Import.module.css";
import { Button } from "@mui/material";
import { store } from "store/store";
import { importCanvas } from "store/slices/canvasesSlice/canvasesSlice";

const Import: FC = () => {
  //...... handlers ......//
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    if (!event.target.files) return;

    fileReader.readAsText(event.target.files[0]);
    fileReader.onload = (e) => {
      try {
        let canvas = JSON.parse(e?.target?.result as string);
        store.dispatch(importCanvas(canvas));
      } catch (error) {
        console.error("The file is not a valid json file", error);
      }
    };
  };
  //...... handlers ......//

  return (
    <Button variant="contained" component="label" className={styles.root}>
      Import here from json
      <input
        hidden
        accept="application/json"
        type="file"
        onChange={handleChange}
      />
    </Button>
  );
};

export default React.memo(Import);
