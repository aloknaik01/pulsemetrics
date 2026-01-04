import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardMetrics } from "./dashboardThunks";

const initialState = {
  metrics: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // pending
      .addCase(fetchDashboardMetrics.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // fulfilled
      .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.metrics = action.payload;
      })
      // rejected
      .addCase(fetchDashboardMetrics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
