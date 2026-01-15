import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardSkeleton = () => {
  return (
    <div className="p-6 space-y-6">
      <Skeleton height={32} width={250} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow">
            <Skeleton height={14} width={80} />
            <Skeleton height={28} />
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <Skeleton height={300} />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
