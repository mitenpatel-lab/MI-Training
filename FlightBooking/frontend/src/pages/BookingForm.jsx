import { useEffect, useState } from "react";
import { User, Calendar, Plane, Hash, Clock, IndianRupee } from "lucide-react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getFlightDetails } from "../../services/flightService";
import { createTicket, getTicket } from "../../services/ticketService";

export default function BookingForm() {
    const location = useLocation();
    const [isDisabled, setIsDisabled] = useState(false);

    const desiredPath = '/index/ticket/details/';
    const isDetailRoute = location.pathname.startsWith(desiredPath);

    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const { flight_id, ticket_id } = useParams();
    const [message, setMessage] = useState("");

    const [passenger, setPassenger] = useState({
        name: "",
        age: "",
        gender: "",
        email: ""
    });

    const [flight, setFlight] = useState({
        airline: "",
        from: "",
        to: "",
        date: "",
        time: "",
        flightNumber: "",
        price: "",
    });

    useEffect(() => {


        if (isDetailRoute) {
            bookingDetails();
            setIsDisabled(true);
        }
        else {
            setIsDisabled(false);

            fetchFlightDetails();
        }

    }, [])


    const fetchFlightDetails = async (e) => {
        try {
            const response = await getFlightDetails(flight_id);
            setFlight({
                airline: response.airline?.airline || response.airline || "N/A",
                from: response.departure?.city || "N/A",
                to: response.arrival?.city || "N/A",
                date: response.departure?.estimatedTime?.split("T")[0] || "N/A",
                time: response.departure?.estimatedTime?.split("T")[1]?.slice(0, 5) || "N/A",
                flightNumber: response.flightNumber || "N/A",
                price: response.price?.max || response.price || "N/A",
            })

        } catch (error) {
            setMessage({ type: "error", text: error });
            console.error("Error:", error);
        }
    }
    const bookFlight = async (e) => {
        e.preventDefault();
        setMessage(null);

        const err = validate();
        if (err) {
            setMessage({ type: "error", text: err });
            return;
        }

        const body = { username, flight_id, passengerInfo: passenger, totalAmount: flight.price };
        try {
            const data = await createTicket(body);
            if (data.success) {
                setMessage({ type: "success", text: data.message || "Ticket Booked..." });

                setTimeout(() => navigate("/index"), 2000);
            } else {
                setMessage({ type: "error", text: data.message || "Something went wrong." });
            }
        } catch (err) {
            setMessage({ type: "error", text: err.message || "Network error." });
        }
    }

    function validate() {
        const isValidEmail = (email) => emailRegex.test(email);
        const required = [
            "name",
            "age",
            "gender",
            "email",
        ];
        for (let key of required) {
            if (!passenger[key] || String(passenger[key]).trim() === "") {
                return `${key} is required`;
            }
        }
        if (!isValidEmail(passenger.email)) return "Email is  invalid"
        if (Number(passenger.age) < 18) return "Passenger must be over 18";
        return null;
    }

    const bookingDetails = async (e) => {
        try {

            const response = await getTicket(ticket_id);

            setPassenger(response.getTicketDetails[0].passengerInfo);
            setFlight(response.getTicketDetails[0]);

        } catch (error) {
            setMessage({ type: "error", text: error });
            console.error("Error:", error);
        }
    }
    return (
        <div className="max-w-5xl mx-auto  bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-gray-100">

            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                {!ticket_id ? "✈️ Flight Booking" : "Ticket Details"}
            </h2>
            {message && (
                <div
                    className={`mb-4 px-4 py-2 rounded-md ${message.type === "success"
                        ? "bg-green-50 text-green-800 text-xl border border-green-100"
                        : "bg-red-50 text-red-800 border border-red-100"
                        }`}
                >
                    {message.text}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                <div>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
                        <Plane className="w-6 h-6 text-blue-500" />
                        Flight Details
                    </h3>

                    <div className="bg-gray-50 p-6 rounded-2xl shadow-inner space-y-4 text-gray-700">

                        <p className="flex justify-between">
                            <span className="font-semibold">Airline:</span>
                            <span>{flight.airline}</span>
                        </p>

                        <p className="flex justify-between">
                            <span className="font-semibold">From:</span>
                            <span>{flight.from}</span>
                        </p>

                        <p className="flex justify-between">
                            <span className="font-semibold">To:</span>
                            <span>{flight.to}</span>
                        </p>

                        <p className="flex justify-between">
                            <span className="font-semibold flex items-center gap-1">
                                <Calendar className="w-4 h-4" /> Date:
                            </span>
                            <span>{flight.date}</span>
                        </p>

                        <p className="flex justify-between">
                            <span className="font-semibold flex items-center gap-1">
                                <Clock className="w-4 h-4" /> Time:
                            </span>
                            <span>{flight.time}</span>
                        </p>

                        <p className="flex justify-between">
                            <span className="font-semibold flex items-center gap-1">
                                <Hash className="w-4 h-4" /> Flight No:
                            </span>
                            <span>{flight.flightNumber}</span>
                        </p>

                        <p className="flex justify-between text-lg">
                            <span className="font-semibold flex items-center gap-1">
                                <IndianRupee className="w-4 h-4" /> Price:
                            </span>
                            <span className="font-bold text-green-600">{flight.price}</span>
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
                        <User className="w-6 h-6 text-blue-500" />
                        Passenger Details
                    </h3>

                    <div className="space-y-5" style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}>

                        <div>
                            <label className="block mb-2 font-medium text-gray-600">Full Name</label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter passenger name"
                                value={passenger.name}
                                onChange={(e) =>
                                    setPassenger({ ...passenger, name: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-600">Age</label>
                            <input
                                type="number"
                                className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter age"
                                value={passenger.age}
                                onChange={(e) =>
                                    setPassenger({ ...passenger, age: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-600">Gender</label>
                            <select
                                className="w-full p-3 border rounded-xl shadow-sm bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                value={passenger.gender}
                                onChange={(e) =>
                                    setPassenger({ ...passenger, gender: e.target.value })
                                }
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter email"
                                value={passenger.email}
                                onChange={(e) =>
                                    setPassenger({ ...passenger, email: e.target.value })
                                }
                            />
                        </div>

                        {!ticket_id && <button onClick={bookFlight} className="w-full mt-4 button-blue hover:bg-blue-700 text-white py-3 rounded-xl shadow-lg transition-all font-semibold text-lg">
                            Book Ticket
                        </button>}

                    </div>

                </div>
            </div>
        </div >
    );
}
