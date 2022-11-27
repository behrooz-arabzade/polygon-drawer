import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CanvasSize, MyCanvasState, Point2d } from './type';
import Polygon from "types/CanvasObjects/Polygon/Polygon";
import { getRandomString } from "components/layouts/canvasContainer/canvas/CanvasHelper";
import { SerializablePolygon } from "types/CanvasObjects/Polygon/type";

const initialState: MyCanvasState = {
  canvasObjects: [],
  size: {
    height: 500,
    width: 500,
  },
  zoom: 1,
  currentDrawingObjectId: null
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
    setCurrentDrawingId: (state, action: PayloadAction<string | null>) => {
      state.currentDrawingObjectId = action.payload;
    },
    addCanvasObject: (state, action: PayloadAction<SerializablePolygon>) => {
      state.canvasObjects.push(action.payload);
    },
    updateCanvasObject: (state, action: PayloadAction<SerializablePolygon>) => {
      const index = state.canvasObjects.findIndex(
        (o) => o.id === action.payload.id
      );

      if (index < 0) {
        console.error("Object does not exist !!!");
        return;
      }

      state.canvasObjects.splice(index, 1, action.payload);
    },
    removeCanvasObject: (state, action: PayloadAction<SerializablePolygon>) => {
      const index = state.canvasObjects.findIndex(
        (o) => o.id === action.payload.id
      );

      if (index < 0) {
        console.error("Object does not exist !!!");
        return;
      }

      state.canvasObjects.splice(index, 1);
    },
    importCanvas: (state, action: PayloadAction<MyCanvasState>) => {
      state.canvasObjects = action.payload.canvasObjects;
      state.currentDrawingObjectId = action.payload.currentDrawingObjectId;
      state.size = action.payload.size;
      state.zoom = action.payload.zoom;
    }
  },
});

export const {
  setSize,
  setZoom,
  setCurrentDrawingId,
  addCanvasObject,
  updateCanvasObject,
  removeCanvasObject,
  importCanvas,
} = canvasSlice.actions;

export default canvasSlice.reducer;
