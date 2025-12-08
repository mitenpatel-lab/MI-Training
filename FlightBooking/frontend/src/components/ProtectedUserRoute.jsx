import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedUserRoute({ children }) {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!token) {
        return <Navigate to="/" replace />;
    }
    const decoded = jwtDecode(token);

    if (location.pathname.startsWith("/admin")) {
        if (decoded.role !== "admin") {

            return <Navigate to="/index" replace />;
        }
    }
    if (location.pathname.startsWith("/index")) {
        if (decoded.role !== "user" && decoded.role !== "admin") {
            return <Navigate to="/" replace />;
        }
    }

    return children;
}

export default ProtectedUserRoute;
