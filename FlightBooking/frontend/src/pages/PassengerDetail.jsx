// src/components/PassengerDetails.jsx
import { useState } from "react";

export default function PassengerDetails() {
    const [passenger, setPassenger] = useState({
        name: "",
        age: "",
        gender: "",
    });

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Passenger Details
            </h2>

            <form className="space-y-4">

                {/* Name */}
                <div className="flex flex-col">
                    <label className="text-gray-600 mb-1">Name</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        value={passenger.name}
                        onChange={(e) =>
                            setPassenger({ ...passenger, name: e.target.value })
                        }
                    />
                </div>

                {/* Age */}
                <div className="flex flex-col">
                    <label className="text-gray-600 mb-1">Age</label>
                    <input
                        type="number"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        value={passenger.age}
                        onChange={(e) =>
                            setPassenger({ ...passenger, age: e.target.value })
                        }
                    />
                </div>

                {/* Gender */}
                <div className="flex flex-col">
                    <label className="text-gray-600 mb-1">Gender</label>
                    <select
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        value={passenger.gender}
                        onChange={(e) =>
                            setPassenger({ ...passenger, gender: e.target.value })
                        }
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

            </form>
        </div>
    );
}
