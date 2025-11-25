import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function FlightFinder() {
    const [flights, setFlights] = useState([]);
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

        const data = await res.json();
        setFlights(res.status === 200 ? data : []);
    }

    const handleSearch = async () => {
        const from = document.getElementById("fromInput").value.trim().toLowerCase();
        const to = document.getElementById("toInput").value.trim().toLowerCase();
        const date = document.getElementById("dateInput").value;

        if (!from || !to || !date) {
            alert("Please enter all fields.");
            return;
        }

        const filters = { from, to, date };
        setBaseFilters(filters);
        await fetchFlights(filters);
    };

    const applyFilters = async () => {
        if (!baseFilters.from || !baseFilters.to) return;

        const airline = document.getElementById("airlineFilter").value;
        const status = document.getElementById("statusFilter").value;
        const priceRange = document.getElementById("priceFilter").value;

        const [minPrice, maxPrice] = priceRange
            ? priceRange.split("-").map(Number)
            : [null, null];

        const fullFilters = {
            ...baseFilters,
            airline,
            status,
            ...(minPrice !== null ? { minPrice } : {}),
            ...(maxPrice !== null ? { maxPrice } : {}),
        };

        await fetchFlights(fullFilters);
    };

    return (
        <div className="min-h-screen min-w-screen text-center flex flex-col">
            <header className="fixed top-0 left-0 w-full bg-white shadow z-20">
                <div className="relative w-full px-6 py-4 flex items-center">

                    <div className="absolute left-1/2 -translate-x-1/2 text-center">
                        <h1 className="text-xl font-bold text-gray-800">✈️ Flight Finder</h1>
                        <p className="text-gray-500 text-sm">Search and book your next journey</p>
                    </div>

                    <div className="ml-auto flex gap-4">
                        <button
                            onClick={() => (window.location.href = "/profile")}
                            className="bg-gray-800 text-grey-800 px-5 py-2 rounded-full shadow hover:bg-gray-900 transition"
                        >
                            Profile
                        </button>

                        <button
                            onClick={logout}
                            className="bg-gray-800 text-grey-800  px-5 py-2 rounded-full shadow hover:bg-gray-900 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>



            <main className="flex-1 mt-28 pb-20 px-4 item-center">
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                    <input
                        id="fromInput"
                        placeholder="From (Delhi)"
                        className="px-4 py-2 border rounded-full shadow-sm w-52 focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        id="toInput"
                        placeholder="To (Mumbai)"
                        className="px-4 py-2 border rounded-full shadow-sm w-52 focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="date"
                        id="dateInput"
                        className="px-4 py-2 border rounded-full shadow-sm w-52 focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-blue-700 text-grey-800  font-semibold px-5 py-2 rounded-full shadow hover:bg-blue-800 transition"
                    >
                        Search Flights
                    </button>
                </div>

                <div className="flex justify-center gap-6 items-start">

                    {flights.length > 0 && (
                        <div className="w-56 bg-white shadow-lg rounded-xl p-4 border space-y-4 sticky top-32">
                            <h3 className="text-center text-lg font-semibold text-grey-800">
                                Filters
                            </h3>

                            <select id="airlineFilter" onChange={applyFilters}
                                className="w-full border px-3 py-2 rounded-lg">
                                <option value="">All Airlines</option>
                                <option value="Air India">Air India</option>
                                <option value="IndiGo">IndiGo</option>
                                <option value="Vistara">Vistara</option>
                                <option value="SpiceJet">SpiceJet</option>
                            </select>


                            <select id="priceFilter" onChange={applyFilters}
                                className="w-full border px-3 py-2 rounded-lg">
                                <option value="">All Prices</option>
                                <option value="0-5000">0 - 5,000</option>
                                <option value="5000-10000">5,000 - 10,000</option>
                                <option value="10000-20000">10,000 - 20,000</option>
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
                                                        {f.airline} • {f.flightNumber}
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
                                                            localStorage.setItem(
                                                                "selectedFlight",
                                                                JSON.stringify(f)
                                                            );
                                                            window.location.href = "/passengerdetail";
                                                        }}
                                                        className="bg-blue-600 text-grey-800 px-4 py-1 rounded-full hover:bg-blue-700 transition"
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
            </main>

            <footer className="fixed bottom-0 left-0 w-full bg-white shadow-inner py-3 text-center text-gray-600 text-sm">
                © 2025 Flight Finder
            </footer>
        </div>
    );
}
