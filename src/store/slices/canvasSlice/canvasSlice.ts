import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CanvasObject, CanvasSize, MyCanvasState } from "./type";

const initialState: MyCanvasState = {
  canvasObjects: [],
  size: {
    height: 500,
    width: 500,
  },
  zoom: 1,
};

export const canvasSlice = createSlice({
  name: "canvasSlice",
  initialState,
  reducers: {
    setSize: (state, action: PayloadAction<CanvasSize>) => {
      state.size = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    addCanvasObject: (state, action: PayloadAction<CanvasObject>) => {
      state.canvasObjects.push(action.payload);
    },
    updateCanvasObject: (state, action: PayloadAction<CanvasObject>) => {
      const index = state.canvasObjects.findIndex(
        (o) => o.id === action.payload.id
      );

      if (index <= 0) {
        console.error("Object does not exist !!!");
        return;
      }

      state.canvasObjects.splice(index, 1, action.payload);
    },
    removeCanvasObject: (state, action: PayloadAction<CanvasObject>) => {
      const index = state.canvasObjects.findIndex(
        (o) => o.id === action.payload.id
      );

      if (index <= 0) {
        console.error("Object does not exist !!!");
        return;
      }

      state.canvasObjects.splice(index, 1);
    },
  },
});

export const { setSize } = canvasSlice.actions;

export default canvasSlice.reducer;
