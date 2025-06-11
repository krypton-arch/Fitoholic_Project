// File: src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('jwtToken'));
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async (authToken) => {
        if (!authToken) { setUser(null); return null; }
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/profile', { headers: { 'Authorization': `Bearer ${authToken}` } });
            if (response.ok) {
                const data = await response.json();
                setUser({ ...data });
                return data;
            } else {
                localStorage.removeItem('jwtToken');
                setToken(null);
                setUser(null);
                return null;
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    }, []);

    useEffect(() => {
        const checkSession = async () => {
            setLoading(true);
            await fetchUser(localStorage.getItem('jwtToken'));
            setLoading(false);
        };
        checkSession();
    }, [fetchUser]);

    const login = async (newToken) => {
        localStorage.setItem('jwtToken', newToken);
        setToken(newToken);
        return await fetchUser(newToken);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setToken(null);
        setUser(null);
    };

    const updateUser = (newUserData) => {
        setUser({ ...newUserData });
    };

    const verifyPaymentAndUpdateContext = async (verificationData) => {
        const currentToken = localStorage.getItem('jwtToken');
        if (!currentToken) return { success: false, message: "Authentication token not found." };
        try {
            const verificationResponse = await fetch('http://localhost:8080/api/v1/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentToken}` },
                body: JSON.stringify(verificationData)
            });
            if (verificationResponse.ok) {
                const updatedUserProfile = await verificationResponse.json();
                // Call updateUser to sync the global state
                updateUser(updatedUserProfile);
                return { success: true };
            } else {
                const errorText = await verificationResponse.text();
                return { success: false, message: errorText || "Verification failed." };
            }
        } catch (error) {
            console.error("Payment verification API call failed:", error);
            return { success: false, message: error.message };
        }
    };
    
    // --- THIS IS THE DEFINITIVE FIX ---
    // The 'verifyPaymentAndUpdateContext' function is now correctly included in the value object.
    const contextValue = {
        isAuthenticated: !!user,
        user,
        token,
        loading,
        login,
        logout,
        updateUser,
        verifyPaymentAndUpdateContext // <-- The missing function is now exported
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
export default AuthContext;
