import React from "react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cofirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [color, setColor] = useState("text-red-600");
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Login</h2>
                <p className="text-center text-gray-500 mb-8">Please sign in to continue</p>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="text-gray-700 text-sm font-medium">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={cofirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                            required
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full mt-5 text-blue-600 hover:text-blue-700 font-medium transition"
                    >
                        Create an account
                    </button>
                </form>

                <button
                    onClick={() => (window.location.href = "/register.jsx")}
                    className="w-full mt-5 text-blue-600 hover:text-blue-700 font-medium transition">
                    Login                </button>

                <p className={`mt-5 text-center font-semibold ${color}`}>{message}</p>
            </div>
        </div>
    );
}