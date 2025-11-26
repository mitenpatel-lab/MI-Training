import { Link, Outlet } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from 'react'
import Dialog from "../components/Dialog";

export default function FlightList() {
    const [flights, setFlights] = useState([]);
    const token = localStorage.getItem("token");

    const handleToggle = async (flight) => {
        const newStatus = flight.status === 1 ? 0 : 1;

        try {
            await fetch(`http://localhost:3000/api/flights/status/${flight._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ status: newStatus })
            });

            setFlights(prev =>
                prev.map(f =>
                    f._id === flight._id ? { ...f, status: newStatus } : f
                )
            );

        } catch (err) {
            console.error("Failed to update flight status", err);
        }
    };
    const deleteFlight = async (Id) => {
        <Dialog />
        try {
            const res = await fetch(`http://localhost:3000/api/flights/${Id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },

            });
            if (res.status === 401) {
                logout();
                return;
            }
            if (res.status == 200) {
                alert("flight deleted");
                flightList();
            }

        } catch (err) {
            console.error("Failed to Delete flight", err);
        }
    };
    const flightList = async (e) => {
        const res = await fetch("http://localhost:3000/api/flights", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
            logout();
            return;
        }

        const data = await res.json();
        setFlights(res.status === 200 ? data : []);

    };
    useEffect(() => {

        flightList();
    }, [])
    return (
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">


            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Flight List</h2>
                <Link
                    to="/admin/flight/addflight"
                    className="px-5 py-2 text-white rounded-lg hover:bg-blue-700 shadow-sm transition"
                >
                    + Add New Flight
                </Link>
            </div>


            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr className="text-gray-600 uppercase text-xs tracking-wider">
                            <th className="p-4">Airline</th>
                            <th className="p-4">Flight No</th>
                            <th className="p-4">From</th>
                            <th className="p-4">To</th>
                            <th className="p-4">Departure</th>
                            <th className="p-4">Arrival</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {flights.length > 0 && flights.map((f) => (
                            <tr key={f._id} className="hover:bg-gray-50 border-b border-gray-200">
                                <td className="p-4 font-medium">{f?.airline?.airline || "not Available"}</td>
                                <td className="p-4">{f.flightNumber}</td>
                                <td className="p-4">{f.departure.city}</td>
                                <td className="p-4">{f.arrival.city}</td>
                                <td className="p-4">{new Date(f.departure.scheduledTime).toISOString().split('T')[0]}</td>
                                <td className="p-4">{new Date(f.arrival.scheduledTime).toISOString().split('T')[0]}</td>

                                <td className="p-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={f.status === 1}
                                            onChange={() => handleToggle(f)}
                                        />

                                        <div className="relative w-9 h-5 bg-gray-300
                          rounded-full peer peer-checked:bg-green-500
                          peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300
                          peer-checked:after:translate-x-full after:content-['']
                          after:absolute after:top-[2px] after:start-[2px]
                          after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all">
                                        </div>
                                    </label>
                                </td>

                                <td className="p-4 text-center flex justify-center gap-3">
                                    <Link to={`/admin/flight/addflight/${f._id}`}>
                                        <button className="rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition">
                                            <Pencil size={16} />
                                        </button>
                                    </Link>
                                    <button key={f._id} onClick={() => deleteFlight(f._id)} className="rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </div>
    );
}
