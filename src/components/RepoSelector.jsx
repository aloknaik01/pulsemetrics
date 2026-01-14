import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedRepo } from "../features/ui/uiSlice";


const RepoSelector = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const [owner, repo] = value.split("/");
    if (!owner || !repo) return;

    dispatch(setSelectedRepo({ owner, repo }));
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        className="w-full rounded bg-gray-800 p-2 text-white"
        placeholder="owner/repo (e.g. facebook/react)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="rounded bg-blue-600 px-4">
        Load
      </button>
    </form>
  );
};

export default RepoSelector;
