import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ title, labels, values }) => {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#3b82f6", 
          "#22c55e", 
          "#f97316",
          "#a855f7", 
          "#ec4899", 
          "#14b8a6", 
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="h-[320px]">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
