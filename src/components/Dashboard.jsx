import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardMetrics, fetchRepoOverview } from '../features/dashboard/dashboardThunks';
import BarChart from './charts/BarChart';
import RepoSelector from './RepoSelector';

const Dashboard = () => {

    const dispatch = useDispatch();

  const { metrics, status, error, overview } = useSelector(
    (state) => state.dashboard
  );

    const { owner, repo } = useSelector(
    (state) => state.ui.selectedRepo
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDashboardMetrics());
    }
  }, [dispatch, status]);

   useEffect(() => {
    dispatch(fetchRepoOverview({ owner, repo }));
  }, [owner, repo, dispatch]);

  if (status === "loading") {
    return <div className="p-6">Loading dashboard data...</div>;
  }

  if (status === "failed") {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
       <RepoSelector />
      {overview  && (
        <>
          {/* KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Stars</p>
              <p className="text-2xl font-semibold">{overview.stargazers_count}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Forks</p>
              <p className="text-2xl font-semibold">{overview.forks_count}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Issues</p>
              <p className="text-2xl font-semibold"> {overview.open_issues_count}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Watchers</p>
              <p className="text-2xl font-semibold">{overview.watchers_count}</p>
            </div>
          </div>

          {/* CHART */}
          <div className="bg-white p-6 rounded-xl shadow">
            <BarChart
              title="Repository Metrics"
              labels={["Stars", "Forks", "Issues", "Watchers"]}
               values={[
                overview.stargazers_count,
                overview.forks_count,
                overview.open_issues_count,
                overview.watchers_count,
              ]}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard