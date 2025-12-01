import { Link } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from 'react'
import { toast } from "react-toastify";
export default function TicketList() {
    const [flights, setTickets] = useState([]);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const deleteAirline = async (Id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/ticket/${Id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },

            });
            if (res.status === 401) {
                logout();
                return;
            }
            if (res.status == 200) {

                toast.success("Ticket is removed", {
                    autoClose: 3000,
                }); ticketList();
            }

        } catch (err) {
            console.error("Failed to Delete flight", err);
        }
    };
    const ticketList = async () => {
        const res = await fetch(`http://localhost:3000/api/ticket?username=${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
            logout();
            return;
        }

        const data = await res.json();
        setTickets(res.status === 200 ? data.ticketbooking : []);

    };
    useEffect(() => {

        ticketList();
    }, []);
    return (
        <>
            {

                flights.length < 1 ? <h1 className="flex items-center justify-center">No Booking Yet</h1> : <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 sticky top-0 z-10">
                                <tr className="text-gray-600 uppercase text-xs tracking-wider">
                                    <th className="p-4">Airline</th>
                                    <th className="p-4">Flight No</th>
                                    <th className="p-4">From</th>
                                    <th className="p-4">To</th>
                                    <th className="p-4">Departure Date</th>
                                    <th className="p-4">Arrival Date</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">
                                {flights.length > 0 && flights.map((f) => (
                                    <tr key={f._id} className="hover:bg-gray-50 border-b border-gray-200">
                                        <td className="p-4 font-medium">{f?.Airline || "not Available"}</td>
                                        <td className="p-4">{f.FlightNo}</td>
                                        <td className="p-4">{f.From}</td>
                                        <td className="p-4">{f.To}</td>
                                        <td className="p-4">{new Date(f.DepartureDate).toISOString().split('T')[0]}</td>
                                        <td className="p-4">{new Date(f.ArrivalDate).toISOString().split('T')[0]}</td>

                                        <td className="p-4 text-center flex justify-center gap-3">
                                            <Link to={`details/${f._id}`}>
                                                <button className="rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition">
                                                    <Eye size={16} />
                                                </button>
                                            </Link>
                                            <button key={f._id} onClick={() => deleteAirline(f._id)} className="rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                </div>

            }
        </>
    );
}
