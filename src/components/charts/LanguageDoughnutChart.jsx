import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { selectFilteredReposByTime } from "../../features/dashboard/dashboardSelectors";

ChartJS.register(ArcElement, Tooltip, Legend);


const COLORS = [
  "rgba(59, 130, 246, 0.7)",   // blue
  "rgba(34, 197, 94, 0.7)",    // green
  "rgba(234, 179, 8, 0.7)",    // yellow
  "rgba(239, 68, 68, 0.7)",    // red
  "rgba(168, 85, 247, 0.7)",   // purple
  "rgba(14, 165, 233, 0.7)",   // sky
  "rgba(249, 115, 22, 0.7)",   // orange
];

const LanguageDoughnutChart = () => {
  const repos = useSelector(selectFilteredReposByTime);

  const { labels, values } = useMemo(() => {
    const map = {};

    repos.forEach((repo) => {
      const lang = repo.language || "Other";
      map[lang] = (map[lang] || 0) + 1;
    });

    return {
      labels: Object.keys(map),
      values: Object.values(map),
    };
  }, [repos]);

  const data = {
    labels,
    datasets: [
      {
        label: "Repositories",
        data: values,
        backgroundColor: COLORS.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-6 rounded shadow h-[350px]">
      <h2 className="text-lg font-semibold mb-4">
        Language Distribution
      </h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default LanguageDoughnutChart;
