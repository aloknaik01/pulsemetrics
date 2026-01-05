import { Bar } from "react-chartjs-2";

const BarChart = ({ title, labels, values }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: [
          "#3b82f6", 
          "#22c55e", 
          "#f97316", 
          "#a855f7",
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div className="h-[320px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
