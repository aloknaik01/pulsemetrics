import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDashboardMetrics,
  fetchPopularRepos,
  fetchRepoOverview,
} from "./dashboardThunks";

const initialState = {
  metrics: {
    data: null,
    status: "idle",
    error: null,
  },

  overview: {
    data: null,
    status: "idle",
    error: null,
  },

  popularRepos: {
    data: [],
    status: "idle",
    error: null,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // DASHBOARD METRICS
      .addCase(fetchDashboardMetrics.pending, (state) => {
        state.metrics.status = "loading";
      })
      .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
        state.metrics.status = "succeeded";
        state.metrics.data = action.payload;
      })
      .addCase(fetchDashboardMetrics.rejected, (state, action) => {
        state.metrics.status = "failed";
        state.metrics.error = action.payload;
      })

      // POPULAR REPOS
      .addCase(fetchPopularRepos.pending, (state) => {
        state.popularRepos.status = "loading";
      })
      .addCase(fetchPopularRepos.fulfilled, (state, action) => {
        state.popularRepos.status = "succeeded";
        state.popularRepos.data = action.payload;
      })
      .addCase(fetchPopularRepos.rejected, (state, action) => {
        state.popularRepos.status = "failed";
        state.popularRepos.error = action.payload;
      })

      // REPO OVERVIEW
      .addCase(fetchRepoOverview.pending, (state) => {
        state.overview.status = "loading";
      })
      .addCase(fetchRepoOverview.fulfilled, (state, action) => {
        state.overview.status = "succeeded";
        state.overview.data = action.payload;
      })
      .addCase(fetchRepoOverview.rejected, (state, action) => {
        state.overview.status = "failed";
        state.overview.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
