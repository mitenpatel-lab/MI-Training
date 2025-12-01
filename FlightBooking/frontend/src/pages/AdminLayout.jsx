import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div className="flex min-w-screen">
            <aside className="w-64 bg-gray-200 min-h-screen p-0">
                <h2 className="font-bold text-xl p-4 bg-gray-300">Admin Panel</h2>

                <nav className="flex flex-col gap-2 p-4 text-gray-500">
                    <Link
                        to="/admin/flight"
                        className={`px-3 py-2 rounded ${isActive("/admin/flight")
                            ? "bg-gray-400 text-black font-semibold"
                            : "text-gray-600 font-bold"
                            }`}
                    >
                        Flights
                    </Link>

                    <Link
                        to="/admin/airline"
                        className={`px-3 py-2 rounded ${isActive("/admin/airline")
                            ? "bg-gray-400 text-black font-semibold"
                            : "text-gray-600 font-bold"
                            }`}
                    >
                        Airlines
                    </Link>
                </nav>
            </aside>

            <main className="flex-1 min-h-screen overflow-x-auto">

                <div className="flex justify-end p-4 bg-grey-700">
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-grey-600 hover:text-red-800"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>

                <div className="p-6 w-full max-w-full">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}
