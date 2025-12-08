import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
export default function Register({ page }) {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cofirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [color, setColor] = useState("text-red-600");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== cofirmPassword) {
            setMessage("Passwords do not match");
            setColor("text-red-600");
            return;
        }
        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (data.success) {
            setTimeout(() => {
                navigate('/index')
            }, 1000);
        } else {
            setMessage(data.message);
            setColor("text-red-600");
        }
    }
    return (
        <>

            <form onSubmit={handleRegister} className="space-y-5">
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
                    className="w-full bg-grey-800  py-3 rounded-lg focus:ring-grey-500 font-semibold transition"
                >
                    Create an account
                </button>
            </form>

            <button
                // onClick={() => navigate('/')}
                className="w-full bg-grey-800 mt-5 py-3 rounded-lg focus:ring-grey-500 font-semibold transition">
                Login                </button>

            <p className={`mt-5 text-center font-semibold ${color}`}>{message}</p>
        </>
    );
}