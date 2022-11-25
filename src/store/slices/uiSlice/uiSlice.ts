import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  selectedTab?: string;
}

const initialState: UIState = {};

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    tabSelected: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { tabSelected } = uiSlice.actions;

export default uiSlice.reducer;
