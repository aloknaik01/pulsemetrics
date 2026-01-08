import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
  sidebarOpen: true,
  timeRange: "30d",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setTimeRange: (state, action) => {
      state.timeRange = action.payload;
    },
  },
});

export const { toggleSidebar, setTheme, setTimeRange } = uiSlice.actions;
export default uiSlice.reducer;
