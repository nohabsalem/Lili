import { createContext, useContext, useState, useEffect } from "react";
import { ADMIN, ASSO, RESTO, MANAGER, AGENT } from "../config/const";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem("role") || AGENT);

    useEffect(() => {
        localStorage.setItem("role", role);
    }, [role]);

    return (
        <AuthContext.Provider value={{ role, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
