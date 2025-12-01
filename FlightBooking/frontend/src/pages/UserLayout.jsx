import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
function UserLayout() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
    };
    return (
        <>
            <div className="min-h-screen min-w-screen text-center flex flex-col">
                <main className="min-h-screen flex-1 mt-28 pb-20 px-4 item-center">
                    <header className="fixed top-0 left-0 w-full bg-white shadow z-20">
                        <div className="relative w-full px-6 py-4 flex items-center">

                            <div onClick={() => navigate('/index')} className="absolute left-1/2 -translate-x-1/2 text-center">
                                <h1 className="text-xl font-bold text-gray-800">✈️ Flight Finder</h1>
                                <p className="text-gray-500 text-sm">Search and book your next journey</p>
                            </div>

                            <div className="ml-auto flex gap-4">
                                <Link to={"ticket"}><button className="bg-gray-800 text-grey-800 px-5 py-2 rounded-full shadow hover:bg-gray-900 transition">
                                    My Booking
                                </button></Link>

                                <button
                                    onClick={logout}
                                    className="bg-gray-800 text-grey-800  px-5 py-2 rounded-full shadow hover:bg-gray-900 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </header>
                    <Outlet />

                </main>

                <footer className="fixed bottom-0 left-0 w-full bg-white shadow-inner py-3 text-center text-gray-600 text-sm">
                    © 2025 Flight Finder
                </footer>
            </div >
        </>
    )
}

export default UserLayout;