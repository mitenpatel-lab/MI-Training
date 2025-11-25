import { PlaneIcon } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (

        <div className="flex min-h-screen min-w-screen">

            <aside className="bg-gray-800 fixed left-0 top-0 h-full w-60 border-r flex flex-col py-6 px-4 color-white">
                <p className="text-white text-2xl">Admin Panel</p>
                <nav className="space-y-2 text-l">
                    <SideItem to="flight">
                        <div className="flex items-center gap-2">
                            <PlaneIcon />
                            Flight
                        </div>
                    </SideItem>
                    <SideItem to="airline">
                        <div className="flex items-center gap-2">
                            <PlaneIcon />
                            Airlines
                        </div>
                    </SideItem>
                </nav>
            </aside>

            <div className="flex-1 ml-60 p-6  shadow rounded">
                <div className="bg-white rounded-xl  p-6 min-h-auto">

                </div>

                <Outlet />
            </div>
        </div>
    );
}

function SideItem({ to, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium 
                 ${isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-800 hover:bg-gray-100"}`
            }
        >
            {children}
        </NavLink>
    );
}
