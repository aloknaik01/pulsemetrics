import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardMetrics } from "../features/dashboard/dashboardThunks";

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded shadow">
            Stars
            <p className="text-2xl font-semibold">{metrics.stars}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            Forks
            <p className="text-2xl font-semibold">{metrics.forks}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            Issues
            <p className="text-2xl font-semibold">{metrics.issues}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            Watchers
            <p className="text-2xl font-semibold">{metrics.watchers}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
