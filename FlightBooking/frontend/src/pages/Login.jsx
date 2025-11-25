import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            localStorage.setItem("role", data.user.role);

            setMessage(`Welcome ${username}! Redirecting...`);
            setColor("text-green-600");

            if (data.user.role === "admin") {
                return navigate('/admin/flight');
            }

            setTimeout(() => {
                navigate('/index')
            }, 1000);
        } else {
            setMessage(data.message);
            setColor("text-red-600");
        }
    };

    return (
        <div className="min-w-screen flex items-center justify-center bg-white px-4">

            <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    ✈️ Flight Booking Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-grey-500 outline-none"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-grey-500 outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-grey-800  py-3 rounded-lg focus:ring-grey-500 font-semibold transition">
                        Login
                    </button>
                </form>

                <button
                    onClick={() => (window.location.href = "/register")}
                    className="w-full   py-3 mt-5  rounded-lg font-semibold hover:ring-grey-700 transition"
                >
                    Register Now
                </button>

                {message && (
                    <p className={`text-center mt-4 font-semibold ${color}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
