import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from 'react'
import { getAllUsers, getDeleteUser } from "../../services/userService";
import { toast } from 'react-toastify';

export default function UserList() {
    const [user, setUser] = useState([]);
    const deleteUser = async (id) => {
        const res = await getDeleteUser(id);
        if (res.status === 401) {
            logout();
            return;
        }
        if (res)
            toast.error("User Removed", {
                theme: "colored"
            });
        userList();
    };
    const userList = async (e) => {
        const res = await getAllUsers();
        if (res.status === 401) {
            logout();
            return;
        }
        console.log(res.data);
        setUser(res.success ? res.user : []);

    };

    useEffect(() => {
        userList();
    }, [])
    return (
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">User List</h2>

            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr className="text-gray-600 uppercase text-xs tracking-wider">
                            <th className="p-4">Users</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {user && user.map((f) => (
                            <tr key={f._id} className="hover:bg-gray-50 border-b border-gray-200">
                                <td className="p-4 font-medium">{f.username}</td>
                                <td className="p-4 text-center flex justify-center gap-3">
                                    <button onClick={() => deleteUser(f._id)} className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition">
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
