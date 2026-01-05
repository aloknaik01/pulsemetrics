import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardMetrics } from "../features/dashboard/dashboardThunks";
import BarChart from "../components/charts/BarChart";

const Home = () => {
  const dispatch = useDispatch();
  const { metrics, status, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDashboardMetrics());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div className="p-6">Loading dashboard data...</div>;
  }

  if (status === "failed") {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {metrics && (
        <>
          {/* KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Stars</p>
              <p className="text-2xl font-semibold">{metrics.stars}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Forks</p>
              <p className="text-2xl font-semibold">{metrics.forks}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Issues</p>
              <p className="text-2xl font-semibold">{metrics.issues}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Watchers</p>
              <p className="text-2xl font-semibold">{metrics.watchers}</p>
            </div>
          </div>

          {/* CHART */}
          <div className="bg-white p-6 rounded-xl shadow">
            <BarChart
              title="Repository Metrics"
              labels={["Stars", "Forks", "Issues", "Watchers"]}
              values={[
                metrics.stars,
                metrics.forks,
                metrics.issues,
                metrics.watchers,
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
