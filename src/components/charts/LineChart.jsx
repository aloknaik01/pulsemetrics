import { Line } from "react-chartjs-2";

const LineChart = ({ title, labels, values }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: title },
    },
  };

  return (
    <div className="h-[320px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
