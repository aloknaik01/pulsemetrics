import { createAsyncThunk } from "@reduxjs/toolkit";

const REPO_URL = "https://api.github.com/repos/facebook/react";

export const fetchDashboardMetrics = createAsyncThunk(
  "dashboard/fetchMetrics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(REPO_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch GitHub metrics");
      }

      const data = await response.json();

      // Return only what analytics needs
      return {
        stars: data.stargazers_count,
        forks: data.forks_count,
        issues: data.open_issues_count,
        watchers: data.subscribers_count,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
