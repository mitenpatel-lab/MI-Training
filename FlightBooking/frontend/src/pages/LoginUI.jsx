import { Outlet } from 'react-router-dom'

function LoginUI() {

    return (
        <div className="min-w-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    ✈️ Flight Booking System
                </h2>
                <Outlet />

            </div>
        </div>
    )
}

export default LoginUI