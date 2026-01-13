import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularRepos } from "../features/dashboard/dashboardThunks";
import LineChart from "../components/charts/LineChart";
import TimeRangeFilter from "../components/filters/TimeRangeFilter";
import LanguageDoughnutChart from "../components/charts/LanguageDoughnutChart";
import StarsForksBarChart from "../components/charts/StarsForksBarChart";
import ChartSkeleton from "../components/skeletons/ChartSkeleton";
import ApiErrorMessage from "../components/errors/ApiErrorMessage";

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


 if (status === "failed") {
  return (
    <div className="p-6">
      <ApiErrorMessage message={error} />
    </div>
  );
}

  const labels = repos.map((repo) => repo.name);
  const values = repos.map((repo) => repo.stars);

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <TimeRangeFilter />
      </div>

      {/* Line Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        {status === "loading" ? (
          <ChartSkeleton />
        ) : (
          <LineChart
            title="Top Repositories by Stars"
            labels={labels}
            values={values}
          />
        )}
      </div>


      {/* Doughnut + Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {status === "loading" ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <LanguageDoughnutChart />
            <StarsForksBarChart />
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
