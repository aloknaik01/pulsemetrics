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

export const fetchPopularRepos = createAsyncThunk(
  'dashboard/fetchPopularRepos',    
  async (username, { rejectWithValue }) => {
    try {
      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );

      if (!reposRes.ok) {
        if (reposRes.status === 403) {
          // Rate limit hit
          return rejectWithValue("GitHub API rate limit exceeded. Try again later.");
        }
        throw new Error("Failed to fetch repositories");
      }

      const repos = await reposRes.json();

      const sorted = repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10);

      return sorted.map(repo => ({
        id: repo.id,
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        issues: repo.open_issues_count,
        updatedAt: repo.updated_at,
        owner: repo.owner.login,
        language: repo.language,
      }));

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
