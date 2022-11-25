import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice/uiSlice";
import toolbarReducer from "./slices/toolbarSlice/toolbarSlice";
import canvasReducer from "./slices/canvasSlice/canvasSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    toolbar: toolbarReducer,
    canvas: canvasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
