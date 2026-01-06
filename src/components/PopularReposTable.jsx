import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { fetchPopularRepos } from "../features/dashboard/dashboardThunks";


export default function PopularReposTable() {
  const dispatch = useDispatch();
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
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Repo</th>
              <th className="px-4 py-3">Stars</th>
              <th className="px-4 py-3">Forks</th>
              <th className="px-4 py-3">Watchers</th>
              <th className="px-4 py-3">Issues</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map(repo => (
              <tr
                key={repo.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium">
                  {repo.name}
                </td>
                <td className="px-4 py-3 text-center">{repo.stars}</td>
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
