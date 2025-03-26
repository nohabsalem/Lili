import { Navigate } from "react-router";

export function AuthGuard({ children, allowedRoles }) {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to={"/auth/login"} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to={"/"} replace />;
    }

    return children;
}