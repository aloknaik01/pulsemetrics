import { createSelector } from "@reduxjs/toolkit";

export const selectPopularRepos = (state) =>
  state.dashboard.popularRepos.data;

export const selectPopularReposStatus = (state) =>
  state.dashboard.popularRepos.status;

const selectRepos = (state) => state.dashboard.popularRepos.data;
const selectTimeRange = (state) => state.ui.timeRange;

export const selectFilteredReposByTime = createSelector(
  [selectRepos, selectTimeRange],
  (repos, timeRange) => {
    const daysMap = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
    };

    const days = daysMap[timeRange];
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return repos.filter(
      (repo) => new Date(repo.updatedAt) >= cutoff
    );
  }
);