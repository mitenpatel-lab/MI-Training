import { Navigate, useLocation } from "react-router-dom";

function ProtectedUserRoute({ children }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const location = useLocation();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (location.pathname.startsWith("/admin")) {
        if (role !== "admin") {
            return <Navigate to="/index" replace />;
        }
    }
    if (location.pathname.startsWith("/index")) {
        if (role !== "user" && role !== "admin") {
            return <Navigate to="/" replace />;
        }
    }

    return children;
}

export default ProtectedUserRoute;
