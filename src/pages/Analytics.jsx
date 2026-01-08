import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularRepos } from "../features/dashboard/dashboardThunks";
import LineChart from "../components/charts/LineChart";

const Analytics = () => {
  const dispatch = useDispatch();

  const { data: repos, status, error } = useSelector(
    (state) => state.dashboard.popularRepos
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPopularRepos("facebook"));
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div className="p-6">Loading analytics...</div>;
  }

  if (status === "failed") {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  const labels = repos.map((repo) => repo.name);
  const values = repos.map((repo) => repo.stars);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <LineChart
          title="Top Repositories by Stars"
          labels={labels}
          values={values}
        />
      </div>
    </div>
  );
};

export default Analytics;
