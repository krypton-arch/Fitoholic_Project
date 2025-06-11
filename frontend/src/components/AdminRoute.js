// File: src/components/AdminRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AdminRoute = () => {
    // We already know the user is authenticated because this route is nested
    // inside ProtectedRoute. We just need to check their role.
    const { user } = useContext(AuthContext);

    // If the user's role is ADMIN, render the nested admin page (e.g., AdminLayout).
    // The optional chaining (user?.role) is a safety check.
    if (user?.role === 'ADMIN') {
        return <Outlet />;
    }
    
    // If they are not an admin, redirect them away to their own dashboard.
    return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;
