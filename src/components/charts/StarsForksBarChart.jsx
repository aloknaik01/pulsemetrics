import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { selectFilteredReposByTime } from "../../features/dashboard/dashboardSelectors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const StarsForksBarChart = () => {
  const repos = useSelector(selectFilteredReposByTime);

  if (!repos.length) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">
          Stars vs Forks
        </h2>
        <p className="text-gray-500">
          No data available for selected time range.
        </p>
      </div>
    );
  }

  const data = {
    labels: repos.map((repo) => repo.name),
    datasets: [
      {
        label: "Stars",
        data: repos.map((repo) => repo.stars),
      },
      {
        label: "Forks",
        data: repos.map((repo) => repo.forks),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">
        Stars vs Forks
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StarsForksBarChart;
