import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

const AuthWrapper = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const [showRegister, setShowRegister] = useState(false);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <div className="text-white text-xl">Loading...</div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated()) {
        return showRegister ? <Register onSwitch={() => setShowRegister(false)} /> :
            <Login onSwitch={() => setShowRegister(true)} />;
    }

    return children;
}

export default AuthWrapper;