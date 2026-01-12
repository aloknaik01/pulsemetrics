const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="bg-white p-4 rounded shadow animate-pulse">
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-6 gap-4 mb-4"
        >
          {[...Array(6)].map((_, j) => (
            <div
              key={j}
              className="h-4 bg-gray-200 rounded"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
