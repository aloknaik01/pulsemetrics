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

const LanguageDoughnutChart = () => {
  const repos = useSelector(selectFilteredReposByTime);

  // language count
  const languageCount = repos.reduce((acc, repo) => {
    const language = repo.language || "Other";
    acc[language] = (acc[language] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(languageCount),
    datasets: [
      {
        label: "Repositories",
        data: Object.values(languageCount),
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
