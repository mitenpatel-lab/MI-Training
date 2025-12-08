import React, { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/index.html";
                return;
            }
            const data = await res.json();
            setUser(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/bookings", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) return;
            const data = await res.json();
            setBookings(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchProfile();
            await fetchBookings();
            setLoading(false);
        })();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/index.html";
    };

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 font-poppins p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-semibold text-blue-900">Profile</h2>
                        <p className="text-gray-600">Manage your account and view bookings</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => (window.location.href = "/flightfinder.html")}
                            className="bg-blue-600 text-gray-600 px-4 py-2 rounded-full"
                        >
                            Find Flights
                        </button>

                        <button onClick={logout} className="bg-red-600 text-gray-600 px-4 py-2 rounded-full">
                            Logout
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1 bg-gray-50 p-4 rounded-md">
                        <h3 className="font-semibold text-gray-700">Account</h3>
                        <div className="mt-3">
                            <p className="text-sm text-gray-500">Username</p>
                            <p className="font-medium text-gray-800">{user?.username || "-"}</p>
                        </div>

                        <div className="mt-3">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-800">{user?.email || "-"}</p>
                        </div>

                        <div className="mt-3">
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="font-medium text-gray-800">{user?.role || "user"}</p>
                        </div>

                        <button
                            onClick={() => (window.location.href = "/editprofile.html")}
                            className="mt-4 w-full bg-blue-900 text-white py-2 rounded-md"
                        >
                            Edit Profile
                        </button>
                    </div>

                    <div className="md:col-span-2 bg-white p-4 rounded-md">
                        <h3 className="font-semibold text-gray-700">Your Bookings</h3>

                        {bookings.length === 0 ? (
                            <p className="mt-4 text-gray-600">You have no bookings yet.</p>
                        ) : (
                            <div className="mt-4 space-y-3">
                                {bookings.map((b) => (
                                    <div key={b.id || b._id} className="border rounded-md p-3 flex justify-between items-center">
                                        <div>
                                            <div className="font-semibold">{b.flight?.airline || b.airline} — {b.flight?.flightNumber || b.flightNumber}</div>
                                            <div className="text-sm text-gray-500">{new Date(b.flight?.departure?.scheduledTime || b.departure?.scheduledTime).toLocaleString()}</div>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <div className="text-lg font-semibold">₹{b.price || b.total || (b.flight?.price?.max)}</div>
                                            <button
                                                onClick={() => { localStorage.setItem('selectedBooking', JSON.stringify(b)); window.location.href = '/bookingdetail.html'; }}
                                                className="bg-blue-600 text-white px-3 py-1 rounded-full"
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
