import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddFlight() {
    const { id } = useParams();
    const [airlines, setAirlines] = useState([]);

    const [form, setForm] = useState({
        airline: "",
        flightNumber: "",
        departureCity: "",
        departureAirportCode: "",
        arrivalCity: "",
        arrivalAirportCode: "",
        departureTime: "",
        arrivalTime: "",
        status: "On Time",
        priceMin: "",
        priceMax: "",
        seats: "",
        durationMinutes: ""
    });

    useEffect(() => {

        if (id) {
            fetchFlight();
        }
    }, [id])

    const fetchFlight = async () => {
        const res = await fetch(`http://localhost:3000/api/flights/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const response = await res.json();
        setAirlines(response.airline || []);

        setForm({
            airline: response.data.airline._id || "",
            flightNumber: response.data.flightNumber || "",
            departureCity: response.data.departure.city || "",
            departureAirportCode: response.data.departure.airportCode || "",
            arrivalCity: response.data.arrival.city || "",
            arrivalAirportCode: response.data.arrival.airportCode || "",
            departureTime: response.data.departure.scheduledTime?.slice(0, 16) || "",
            arrivalTime: response.data.arrival.scheduledTime?.slice(0, 16) || "",
            priceMin: response.data.price?.min?.toString() || "",
            priceMax: response.data.price?.max?.toString() || "",
        });

    };

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function validate() {
        const required = [
            "airline",
            "flightNumber",
            "departureCity",
            "departureAirportCode",
            "arrivalCity",
            "arrivalAirportCode",
            "departureTime",
            "arrivalTime",
            "priceMax",
        ];

        for (let key of required) {
            if (!form[key] || String(form[key]).trim() === "") {
                return `${key} is required`;
            }
        }

        if (form.priceMin && isNaN(Number(form.priceMin))) return "Min price must be a number";
        if (isNaN(Number(form.priceMax))) return "Max price must be a number";

        if (new Date(form.departureTime) > new Date(form.arrivalTime))
            return "Arrival time must be after departure time";

        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage(null);

        const err = validate();
        if (err) {
            setMessage({ type: "error", text: err });
            return;
        }

        setLoading(true);
        try {
            let URL;
            let METHOD;
            if (id) {
                URL = `http://localhost:3000/api/flights/${id}`;
                METHOD = "PUT"
            }
            else {
                URL = `http://localhost:3000/api/flights`;
                METHOD = "POST"
            }
            const res = await fetch(URL, {
                method: METHOD,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : ""
                },
                body: JSON.stringify(form
                    //     {
                    //     airline: form.airline,
                    //     flightNumber: form.flightNumber,
                    //     departure: {
                    //         city: form.departureCity,
                    //         airportCode: form.departureAirportCode,
                    //         scheduledTime: form.departureTime
                    //     },
                    //     arrival: {
                    //         city: form.arrivalCity,
                    //         airportCode: form.arrivalAirportCode,
                    //         scheduledTime: form.arrivalTime
                    //     },
                    //     price: {
                    //         min: form.priceMin ? Number(form.priceMin) : 0,
                    //         max: Number(form.priceMax)
                    //     },
                    // }
                )
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: "success", text: data.message || "Flight added successfully." });
                setTimeout(() => navigate("/admin/flights"), 900);
            } else {
                setMessage({ type: "error", text: data.message || "Something went wrong." });
            }
        } catch (err) {
            setMessage({ type: "error", text: err.message || "Network error." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-screen align-center mx-auto">
            <div className="bg-white">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{id ? "Update Flight" : "Add Flight"} </h2>

                {message && (
                    <div
                        className={`mb-4 px-4 py-2 rounded-md text-sm ${message.type === "success"
                            ? "bg-green-50 text-green-800 border border-green-100"
                            : "bg-red-50 text-red-800 border border-red-100"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {id ? <label className="block">
                        <span className="text-sm font-medium text-gray-700 mb-1 block">Airline</span>

                        <div className="relative">
                            <select
                                name="airline"
                                value={form.airline}
                                onChange={handleChange}
                                className="block w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2.5 pr-10
                 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                            >
                                {airlines.map(a => (
                                    <option key={a._id} value={a._id}>{a.airline}</option>
                                ))}
                            </select>

                            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                                ▼
                            </span>
                        </div>
                    </label> : <label className="block">
                        <span className="text-sm font-medium text-gray-700">Airline</span>
                        <input
                            name="airline"
                            value={form.airline}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="AI-302"
                            required
                        />
                    </label>}


                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Flight Number</span>
                        <input
                            name="flightNumber"
                            value={form.flightNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="AI-302"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Departure City</span>
                        <input
                            name="departureCity"
                            value={form.departureCity}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Delhi"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Departure Airport Code</span>
                        <input
                            name="departureAirportCode"
                            value={form.departureAirportCode}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="DEL"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Arrival City</span>
                        <input
                            name="arrivalCity"
                            value={form.arrivalCity}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Mumbai"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Arrival Airport Code</span>
                        <input
                            name="arrivalAirportCode"
                            value={form.arrivalAirportCode}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="BOM"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Departure (date & time)</span>
                        <input
                            name="departureTime"
                            value={form.departureTime}
                            onChange={handleChange}
                            type="datetime-local"
                            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Arrival (date & time)</span>
                        <input
                            name="arrivalTime"
                            value={form.arrivalTime}
                            onChange={handleChange}
                            type="datetime-local"
                            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </label>



                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Price (Min)</span>
                        <input
                            name="priceMin"
                            value={form.priceMin}
                            onChange={handleChange}
                            type="number"
                            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="5000"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Price (Max)</span>
                        <input
                            name="priceMax"
                            value={form.priceMax}
                            onChange={handleChange}
                            type="number"
                            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="7500"
                            required
                        />
                    </label>


                    <div className="md:col-span-2 flex items-center justify-between mt-2">
                        <div className="text-sm text-gray-500">
                            You can edit these details later from Flights list.
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setForm({
                                        airline: "",
                                        flightNumber: "",
                                        departureCity: "",
                                        departureAirportCode: "",
                                        arrivalCity: "",
                                        arrivalAirportCode: "",
                                        departureTime: "",
                                        arrivalTime: "",
                                        status: "On Time",
                                        priceMin: "",
                                        priceMax: "",
                                        seats: "",
                                        durationMinutes: ""
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
                                {id ? "Update" : "Add Flight"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    );
}
