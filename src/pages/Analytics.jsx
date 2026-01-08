import { useSelector } from "react-redux";
import LineChart from "../components/charts/LineChart";

const Analytics = () => {
  const repos = useSelector((state) => state.dashboard.data) || [];

  // Mock trend using stars count
  const labels = repos.map((repo) => repo.name);
  const values = repos.map((repo) => repo.stargazers_count);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <LineChart
          title="Stars Distribution Across Repositories"
          labels={labels}
          values={values}
        />
      </div>
    </div>
  );
};

export default Analytics;
