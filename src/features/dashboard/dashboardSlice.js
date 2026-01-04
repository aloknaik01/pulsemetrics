import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  metrics: [],
  status: "idle",   // idle | loading | success | error
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchMetricsStart(state) {
      state.status = "loading";
    },
    fetchMetricsSuccess(state, action) {
      state.status = "success";
      state.metrics = action.payload;
    },
    fetchMetricsError(state, action) {
      state.status = "error";
      state.error = action.payload;
    },
  },
});

export const {
  fetchMetricsStart,
  fetchMetricsSuccess,
  fetchMetricsError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
