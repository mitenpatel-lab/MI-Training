import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddAirline() {
    const { id } = useParams();
    const [form, setForm] = useState({
        name: ""
    });



    const fetchAirline = async () => {
        const res = await fetch(`http://localhost:3000/api/airline/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        console.log(data);

        setForm({ name: data.data.airline || "" });
    }
    useEffect(() => {

        if (id) {
            fetchAirline();
        }
    }, [id])
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    }

    function validate() {
        if (!form.name || !form.name.trim()) return "Airline name is required";
        return null;
    }

    async function handleSubmit(e) {
        let METHOD = id ? "PUT" : "POST";
        let URL = id ? `http://localhost:3000/api/airline/${id}` : "http://localhost:3000/api/airline"
        e.preventDefault();
        setMessage(null);

        const err = validate();
        if (err) {
            setMessage({ type: "error", text: err });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(URL, {
                method: METHOD,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : ""
                },
                body: JSON.stringify({
                    name: form.name.trim(),
                })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: "success", text: data.message || id ? "Airline updated successfully." : "Airline added successfully." });
                setTimeout(() => navigate("/admin/airline"), 300);
            } else {
                setMessage({ type: "error", text: data.message || "Failed to add airline." });
            }
        } catch (err) {
            setMessage({ type: "error", text: err.message || "Network error." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center p-4">
            <div className="rounded-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    {id ? "Update Airline" : "Add Airline"}
                </h2>

                {message && (
                    <div
                        className={`mb-4 px-4 py-2 rounded-md text-sm ${message.type === "success"
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Airline Name</span>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Example Airlines"
                            required
                        />
                    </label>

                    <div className="flex items-center justify-between mt-2">


                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setForm({
                                        name: "",
                                    });
                                    setMessage(null);
                                }}
                                className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                            >
                                Reset
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-5 py-2 rounded-md  ${loading ? "bg-gray-400" : "bg-gray-800 hover:bg-gray-900"
                                    } transition`}
                            >
                                {id ? "Update Airline" : "Add Airline"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
