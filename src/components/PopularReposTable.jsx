import { useEffect , useState, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { fetchPopularRepos } from "../features/dashboard/dashboardThunks";


export default function PopularReposTable() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("stars");
  const [sortOrder, setSortOrder] = useState("desc");


const filteredRepos = useMemo(() => {
  return data.filter(repo =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );
}, [data, search]);


const sortedRepos = useMemo(() => {
  const sorted = [...filteredRepos].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortKey] - b[sortKey];
    }
    return b[sortKey] - a[sortKey];
  });

  return sorted;
}, [filteredRepos, sortKey, sortOrder]);


  const { data, status } = useSelector(
    state => state.dashboard.popularRepos
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPopularRepos("facebook")); 
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p className="mt-6">Loading repositories...</p>;
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow">
      <div className="p-4 border-b font-semibold">
        Most Popular Repositories
      </div>

      <div className="overflow-x-auto">
        <div className="p-4 border-b flex justify-between items-center">
  <h2 className="font-semibold">Most Popular Repositories</h2>

  <input
    type="text"
    placeholder="Search repo..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-md px-3 py-1 text-sm"
  />
</div>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Repo</th>
              <th className="px-4 py-3" onClick={() => setSortKey("stars")} >Stars</th>
              <th className="px-4 py-3" onClick={() => setSortKey("forks")}>Forks</th>
              <th className="px-4 py-3" onClick={() => setSortKey("watchers")}>Watchers</th>
              <th className="px-4 py-3" onClick={() => setSortKey("issues")}>Issues</th>
              <th className="px-4 py-3" onClick={() => setSortKey("updated")}>Updated</th>
              <th className="px-4 py-3" onClick={() => setSortKey("action")}>Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedRepos.map(repo => (
              <tr
                key={repo.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium">
                  {repo.name}
                </td>
                <td className="px-4 py-3 text-center"  >{repo.stars}</td>
                <td className="px-4 py-3 text-center">{repo.forks}</td>
                <td className="px-4 py-3 text-center">{repo.watchers}</td>
                <td className="px-4 py-3 text-center">{repo.issues}</td>
                <td className="px-4 py-3 text-center">
                  {new Date(repo.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    to={`/analytics/github/${repo.name}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
