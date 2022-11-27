import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ToolbarState {
  selectedTool: string;
}

const initialState: ToolbarState = {
  selectedTool: "polygon",
};

export const toolbarSlice = createSlice({
  name: "toolbarSlice",
  initialState,
  reducers: {
    toolSelected: (state, action: PayloadAction<string>) => {
      state.selectedTool = action.payload;
    },
  },
});

export const { toolSelected } = toolbarSlice.actions;

export default toolbarSlice.reducer;
