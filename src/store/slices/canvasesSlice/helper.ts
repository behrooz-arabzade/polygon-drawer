import { RootState, store } from "store/store";
import { CanvasData, TabsState, CanvasTab } from "./type";

export const getInitialCanvasData = (): CanvasData => {
  return {
    canvasObjects: [],
    size: {
      height: 500,
      width: 500,
    },
    zoom: 1,
    currentDrawingObjectId: null,
  };
};

export const getCurrentTab = (state: TabsState): CanvasTab => {
  return state.tabs[state.selectedTabId];
};

export const getNewTabName = (state?: TabsState): string => {
  let name = "New Canvas";
  return name;
};

export const isInitialState = (currentState: RootState): boolean => {
  if (Object.keys(currentState.canvases.tabs).length > 1) return false;

  const onlyTab = Object.values(currentState.canvases.tabs)[0];
  if (onlyTab.name !== "New Canvas") return false;

  return (
    JSON.stringify(onlyTab.canvasData) ===
    JSON.stringify(getInitialCanvasData())
  );
};
