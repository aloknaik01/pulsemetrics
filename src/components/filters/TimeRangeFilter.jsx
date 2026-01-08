import { useDispatch, useSelector } from "react-redux";
import { setTimeRange } from "../../features/ui/uiSlice";


const ranges = [
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
];

const TimeRangeFilter = () => {
  const dispatch = useDispatch();
  const activeRange = useSelector((state) => state.ui.timeRange);

  return (
    <div className="flex gap-2">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => dispatch(setTimeRange(range.value))}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition
            ${
              activeRange === range.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeFilter;
