import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardMetrics,
  fetchRepoOverview,
} from "../features/dashboard/dashboardThunks";
import BarChart from "./charts/BarChart";
import RepoSelector from "./RepoSelector";
import DashboardSkeleton from "./skeletons/DashboardSkeleton";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { overview } = useSelector((state) => state.dashboard);

  const { owner, repo } = useSelector((state) => state.ui.selectedRepo);

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchDashboardMetrics());
  //   }
  // }, [dispatch, status]);

  useEffect(() => {
    dispatch(fetchRepoOverview({ owner, repo }));
  }, [owner, repo, dispatch]);

  if (overview.status === "loading") {
    return <DashboardSkeleton />;
  }

  if (overview.status === "failed") {
    return <div className="p-6 text-red-600">Error: {overview.error}</div>;
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <RepoSelector />
      {overview && (
        <>
          {/* KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Stars</p>
              <p className="text-2xl font-semibold">
                {overview?.data?.stargazers_count}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Forks</p>
              <p className="text-2xl font-semibold">{overview?.data?.forks_count}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Issues</p>
              <p className="text-2xl font-semibold">
                {" "}
                {overview?.data?.open_issues_count}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Watchers</p>
              <p className="text-2xl font-semibold">
                {overview?.data?.watchers_count}
              </p>
            </div>
          </div>

          {/* CHART */}
          <div className="bg-white p-6 rounded-xl shadow">
            <BarChart
              title="Repository Metrics"
              labels={["Stars", "Forks", "Issues", "Watchers"]}
              values={[
                overview?.data?.stargazers_count,
                overview?.data?.forks_count,
                overview?.data?.open_issues_count,
                overview?.data?.watchers_count,
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
