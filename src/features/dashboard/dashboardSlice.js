import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDashboardMetrics,
  fetchPopularRepos,
  fetchRepoOverview,
} from "./dashboardThunks";


const initialState = {
  metrics: null,

  popularRepos: {
    data: [],
    status: "idle",
    error: null,
  },
  overview: null,
  status: "idle",
  error: null,
};


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // DASHBOARD METRICS
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
      })

      // POPULAR REPOSITORIES
    .addCase(fetchPopularRepos.pending, (state) => {
      state.popularRepos.status = "loading";
      state.popularRepos.error = null;
    })
    .addCase(fetchPopularRepos.fulfilled, (state, action) => {
      state.popularRepos.status = "succeeded";
      state.popularRepos.data = action.payload;
    })
    .addCase(fetchPopularRepos.rejected, (state, action) => {
      state.popularRepos.status = "failed";
      state.popularRepos.error = action.payload;
    })
// Repo Overview
    .addCase(fetchRepoOverview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRepoOverview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.overview = action.payload;
      })
      .addCase(fetchRepoOverview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
