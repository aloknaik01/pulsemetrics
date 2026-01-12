const ChartSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded shadow h-[350px] animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded mb-6" />

      <div className="flex items-center justify-center h-full">
        <div className="w-40 h-40 rounded-full bg-gray-200" />
      </div>
    </div>
  );
};

export default ChartSkeleton;
