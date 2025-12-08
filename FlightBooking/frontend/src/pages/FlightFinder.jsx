import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export default function FlightFinder() {
    const [flights, setFlights] = useState([]);
    const [search, setSearch] = useState(false);
    const [airlines, setairline] = useState([]);

    const [baseFilters, setBaseFilters] = useState({});
    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    async function fetchFlights(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const res = await fetch(`http://localhost:3000/api/flights?${queryParams}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
            logout();
            return;
        }
        const response = await res.json();
        console.log(response.airline);

        if (queryParams.length > 0 && response?.data?.length > 0)
            setSearch(true);
        setairline(response.airlines);
        setFlights(res.status === 200 ? response.data : []);
    }

    const handleSearch = async () => {
        const from = document.getElementById("fromInput").value.trim().toLowerCase();
        const to = document.getElementById("toInput").value.trim().toLowerCase();
        const date = document.getElementById("dateInput").value;

        if (!from || !to || !date) {
            toast.error("All Field are Required", {
                autoClose: 3000,
                position: "bottom-right",
                theme: "colored"
            }); return;
        }

        const filters = { from, to, date };
        setBaseFilters(filters);
        await fetchFlights(filters);
    };

    const applyFilters = async () => {
        if (!baseFilters.from || !baseFilters.to) return;

        const airline = document.getElementById("airlineFilter").value;
        const priceRange = document.getElementById("priceFilter").value;

        const [minPrice, maxPrice] = priceRange
            ? priceRange.split("-").map(Number)
            : [null, null];

        const fullFilters = {
            ...baseFilters,
            airline,

            ...(minPrice !== null ? { minPrice } : {}),
            ...(maxPrice !== null ? { maxPrice } : {}),
        };

        await fetchFlights(fullFilters);
    };

    return (
        <>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
                <input
                    id="fromInput"
                    placeholder="From (Delhi)"
                    className="px-4 py-2 border rounded-full shadow-sm w-52 focus:ring-4 focus:ring-gray-700"
                />

                <input
                    id="toInput"
                    placeholder="To (Mumbai)"
                    className="px-4 py-2 border rounded-full shadow-sm w-52 focus:ring-4  focus:ring-gray-700"
                />

                <input
                    type="date"
                    id="dateInput"
                    className="px-4 py-2 border rounded-full shadow-sm w-52 focus:ring-4 focus:ring-gray-700"
                />

                <button
                    onClick={handleSearch}
                    className="text-grey-800  font-semibold px-5 py-2 rounded-full border-2"
                >
                    Search Flights
                </button>
            </div>

            <div className="flex justify-center gap-6 items-start">

                {search && (
                    <div className="w-56 bg-white shadow-lg rounded-xl p-4 border space-y-4 sticky top-32">
                        <h3 className="text-center text-lg font-semibold text-grey-800">
                            Filters
                        </h3>

                        <select id="airlineFilter" onChange={applyFilters}
                            className="w-full border px-3 py-2 rounded-lg">
                            <option value="">All Airlines</option>
                            {airlines.map(a => (
                                <option key={a._id} value={a._id}>{a.airline}</option>
                            ))}
                        </select>


                        <select id="priceFilter" onChange={applyFilters}
                            className="w-full border px-3 py-2 rounded-lg">
                            <option value="">All Prices</option>
                            <option value="0-5000">0 - 5,000</option>
                            <option value="5000-10000">5,000 - 10,000</option>
                            <option value="10000-100000">10,000 - 100,000</option>
                        </select>
                    </div>
                )}

                <div className="w-full max-w-4xl">
                    {flights.length === 0 ? (
                        <p className="text-center text-gray-500 mt-5">
                            No flights found.
                        </p>


                    ) : (
                        <table className="w-full">
                            <tbody>
                                {flights.map((f, idx) => (
                                    <tr
                                        key={idx}
                                        className="bg-white shadow-md rounded-xl border mb-4 block hover:shadow-xl transition"
                                    >
                                        <td className="block p-4">
                                            <div className="flex justify-between items-center">
                                                <div className="font-semibold text-lg">
                                                    {f.airline.airline} • {f.flightNumber}
                                                </div>
                                                <div className="text-gray-600">
                                                    ₹{f.price.max}
                                                </div>
                                            </div>

                                            <div className="flex justify-between mt-2 text-sm text-gray-600">
                                                <div>
                                                    {f.departure.city} → {f.arrival.city}
                                                </div>

                                                <div>{new Date(f.departure.scheduledTime)
                                                    .toISOString()
                                                    .split("T")[0]}</div>
                                            </div>

                                            <div className="flex justify-between mt-3 items-center">

                                                <button
                                                    onClick={() => {
                                                        navigate(`ticket/${f._id}`);
                                                    }}
                                                    className=" text-grey-800 p-4 rounded-full"
                                                >
                                                    Book Now
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>

    );
}
