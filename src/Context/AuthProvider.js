import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import SpinFC from "antd/es/spin";
import { auth } from "../firebase/config";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                navigate("/");
                setIsLoading(false);
            } else {
                setIsLoading(false);
                navigate("/login");
            }
        });
        return () => {
            unsubscribed();
        };
    }, [navigate]);
    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <SpinFC /> : children}
        </AuthContext.Provider>
    );
}
