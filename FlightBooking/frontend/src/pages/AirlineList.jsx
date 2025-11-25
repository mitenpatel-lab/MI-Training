import { Link, Outlet } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from 'react'

export default function AirlineList() {
    const [airline, setairline] = useState([]);
    const token = localStorage.getItem("token");



    useEffect(() => {
        const airlineList = async (e) => {
            const res = await fetch("http://localhost:3000/api/airline", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 401) {
                logout();
                return;
            }

            const data = await res.json();
            setairline(res.status === 200 ? data.data : []);

        };
        airlineList();
    }, [])
    return (
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Airline List</h2>
                <Link
                    to="/admin/airline/addairline"
                    className="px-5 py-2 text-white rounded-lg hover:bg-blue-700 shadow-sm transition"
                >
                    + Add New airline
                </Link>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr className="text-gray-600 uppercase text-xs tracking-wider">
                            <th className="p-4">Airline</th>
                            {/* <th className="p-4">Status</th> */}
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {airline.map((f) => (
                            <tr className="hover:bg-gray-50 border-b border-gray-200">
                                <td className="p-4 font-medium">{f}</td>

                                <td className="p-4 text-center flex justify-center gap-3">
                                    <button className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition">
                                        <Pencil size={16} />
                                    </button>
                                    <button className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition">
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
