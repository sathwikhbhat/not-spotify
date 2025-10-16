import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();
export const API_BASE_URL = "http://localhost:8080";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("userToken"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        const storedToken = localStorage.getItem("userToken");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    const register = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { email, password });
            if (response.status === 201) {
                return {
                    success: true,
                    message: 'Registration successful'
                };
            } else {
                return {
                    success: false,
                    message: response.data.message || 'Registration failed'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: (error.response && (error.response.data?.message || error.response.data)) || error.message || 'Registration failed'
            };
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
            setLoading(false);
            if (response.status === 200) {
                const { email, token } = response.data;
                setUser({
                    email: email,
                    role: response.data.role
                });
                setToken(token);
                localStorage.setItem("userToken", token);
                localStorage.setItem("userData", JSON.stringify({
                    email: email,
                    role: response.data.role
                }));
                return {
                    success: true,
                    message: 'Login successful'
                };
            } else {
                return {
                    success: false,
                    message: response.data.message || 'Login failed'
                };
            }
        } catch (error) {
            setLoading(false);
            return {
                success: false,
                message: (error.response && (error.response.data?.message || error.response.data)) || error.message || 'Login failed. Network error. Please try again later.'
            };
        }
    };

    const isAuthenticated = () => {
        return !!token && !!user;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
    }

    const getAuthHeaders = () => {
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    const contextValue = {
        register,
        login,
        isAuthenticated,
        user,
        token,
        getAuthHeaders,
        loading,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};