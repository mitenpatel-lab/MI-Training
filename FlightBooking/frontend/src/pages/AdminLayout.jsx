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
        <div className="flex min-w-screen min-h-screen">
            <aside className="w-64 bg-gray-200 flex flex-col min-h-screen p-0">
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
                    <Link
                        to="/admin/user"
                        className={`px-3 py-2 rounded ${isActive("/admin/user")
                            ? "bg-gray-400 text-black font-semibold"
                            : "text-gray-600 font-bold"
                            }`}
                    >
                        Users
                    </Link>
                </nav>
                <button
                    onClick={logout}
                    className="flex button-logout font-bold mt-auto mb-5 gap-2 text-grey-600 hover:text-red-800"
                >
                    <LogOut size={20} /> Logout
                </button>
            </aside>

            <main className="flex-1 min-h-screen">



                <div className="p-6 w-full min-w-full">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}
