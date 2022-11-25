import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CanvasSize, MyCanvasState } from "./type";
import Polygon from "types/CanvasObjects/Polygon/Polygon";

const testPolygon = new Polygon("test", {
  x: 0,
  y: 0,
});

testPolygon.addPoint({ x: 100, y: 0 });
testPolygon.addPoint({ x: 100, y: 100 });
testPolygon.addPoint({ x: 0, y: 100 });
testPolygon.addPoint({ x: 0, y: 0 });

const initialState: MyCanvasState = {
  canvasObjects: [testPolygon],
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
    addCanvasObject: (state, action: PayloadAction<Polygon>) => {
      state.canvasObjects.push(action.payload);
    },
    updateCanvasObject: (state, action: PayloadAction<Polygon>) => {
      const index = state.canvasObjects.findIndex(
        (o) => o.id === action.payload.id
      );

      if (index <= 0) {
        console.error("Object does not exist !!!");
        return;
      }

      state.canvasObjects.splice(index, 1, action.payload);
    },
    removeCanvasObject: (state, action: PayloadAction<Polygon>) => {
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
