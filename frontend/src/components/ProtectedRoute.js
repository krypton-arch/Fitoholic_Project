// File: src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-xl text-slate-800 dark:text-white">Loading Session...</div>;
    }

    // This component's only job is to check for a valid login session.
    // The specific role-based redirects will be handled by the user/admin routes themselves if needed,
    // or by the login page logic.
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
