import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CanvasSize, TabsState, CanvasData, CanvasTab } from "./type";
import { getRandomString } from "components/layouts/canvasContainer/canvas/CanvasHelper";
import { SerializablePolygon } from "types/CanvasObjects/Polygon/type";
import { getCurrentTab, getInitialCanvasData, getNewTabName } from "./helper";

const initialTabId = getRandomString(10);
const initialState: TabsState = {
  tabs: {
    [initialTabId]: {
      id: initialTabId,
      name: getNewTabName(),
      canvasData: getInitialCanvasData(),
    },
  },
  selectedTabId: initialTabId,
};

export const canvasesSlice = createSlice({
  name: "canvasesSlice",
  initialState,
  reducers: {
    setSize: (state, action: PayloadAction<CanvasSize>) => {
      getCurrentTab(state).canvasData.size = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      getCurrentTab(state).canvasData.zoom = action.payload;
    },
    setCurrentDrawingId: (state, action: PayloadAction<string | null>) => {
      getCurrentTab(state).canvasData.currentDrawingObjectId = action.payload;
    },
    addCanvasObject: (state, action: PayloadAction<SerializablePolygon>) => {
      getCurrentTab(state).canvasData.canvasObjects.push(action.payload);
    },
    updateCanvasObject: (state, action: PayloadAction<SerializablePolygon>) => {
      const index = getCurrentTab(state).canvasData.canvasObjects.findIndex(
        (o) => o.id === action.payload.id
      );

      if (index < 0) {
        console.error("Object does not exist !!!");
        return;
      }

      getCurrentTab(state).canvasData.canvasObjects.splice(
        index,
        1,
        action.payload
      );
    },
    removeCanvasObject: (state, action: PayloadAction<SerializablePolygon>) => {
      const index = getCurrentTab(state).canvasData.canvasObjects.findIndex(
        (o) => o.id === action.payload.id
      );

      if (index < 0) {
        console.error("Object does not exist !!!");
        return;
      }

      getCurrentTab(state).canvasData.canvasObjects.splice(index, 1);
    },
    importCanvas: (state, action: PayloadAction<CanvasData>) => {
      getCurrentTab(state).canvasData.canvasObjects =
        action.payload.canvasObjects;
      getCurrentTab(state).canvasData.currentDrawingObjectId =
        action.payload.currentDrawingObjectId;
      getCurrentTab(state).canvasData.size = action.payload.size;
      getCurrentTab(state).canvasData.zoom = action.payload.zoom;
    },
    addNewTab: (state) => {
      const id = getRandomString(10);
      const tab: CanvasTab = {
        id,
        name: getNewTabName(state),
        canvasData: getInitialCanvasData(),
      };

      state.tabs[id] = tab;
      state.selectedTabId = id;
    },
    selectTab: (state, action: PayloadAction<string>) => {
      state.selectedTabId = action.payload;
    },
    resetSession: (state) => {
      state.selectedTabId = initialState.selectedTabId;
      state.tabs = initialState.tabs;
    },
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
  addNewTab,
  selectTab,
  resetSession,
} = canvasesSlice.actions;

export default canvasesSlice.reducer;
