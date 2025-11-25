// src/components/ProtectedUserRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedUserRoute({ children }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "user") {
        return <Navigate to="/" replace />;
    }

    return children;
}
