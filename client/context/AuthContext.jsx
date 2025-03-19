import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../config.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const userData = localStorage.getItem("userData");
            if (userData) {
                try {
                    setUser(JSON.parse(userData));
                    setIsAuthenticated(true);
                } catch (e) {
                    console.log("Error getting userData", e);
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    const authenticate = async (credentials, type) => {
        try {
            const response = await axios.post(`${SERVER_URL}/${type}`, credentials);
            if (response.status !== 200) return false;
            setUser(response.data?.user);
            setIsAuthenticated(true);
            setIsLoading(false);
            localStorage.removeItem("userData");
            localStorage.setItem("userData", JSON.stringify(response.data?.user));
            return true;
        } catch (e) {
            console.log("Error in authenticate", e);
            return false;
        }
    };

    const signIn = async (email, password) => {
        return await authenticate({ email, password }, "sign-in");
    };

    const signUp = async (email, password) => {
        return await authenticate({ email, password }, "sign-up");
    };
    const signOut = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("userData");
    };

    const exportValue = { user, isAuthenticated, signIn, signUp, signOut, isLoading };

    return <AuthContext.Provider value={exportValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
