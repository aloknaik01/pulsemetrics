import { Link, Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">PulseMetrics</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/analytics" className="hover:text-gray-300">Analytics</Link>
          <Link to="/settings" className="hover:text-gray-300">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 text-gray-900">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
