import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

const AuthWrapper = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [showRegister, setShowRegister] = useState(false);

    if (!isAuthenticated()) {
        return showRegister ? <Register onSwitch={() => setShowRegister(false)} /> :
            <Login onSwitch={() => setShowRegister(true)} />;
    }

    return children;
}

export default AuthWrapper;