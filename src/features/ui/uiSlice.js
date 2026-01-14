import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
  sidebarOpen: true,
  timeRange: "7d",
  selectedRepo: {
    owner: "facebook",
    repo: "react"
  }
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
    setSelectedRepo(state, action) {
      state.selectedRepo = action.payload;
    }
  },
});

export const { toggleSidebar, setTheme, setTimeRange, setSelectedRepo  } = uiSlice.actions;
export default uiSlice.reducer;
