// File: src/components/AdminNavbar.js
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { ShieldCheckIcon, ArrowLeftOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import ThemeToggle from './ThemeToggle';
import ConfirmationModal from './ConfirmationModal';

const AdminNavbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        setIsLogoutModalOpen(false);
        logout();
        navigate('/login');
    };

    const getNavLinkClass = ({ isActive }) => {
        const baseStyles = 'px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200';
        return isActive
            ? `${baseStyles} bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white`
            : `${baseStyles} text-slate-500 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white`;
    };

    return (
        <>
            <ConfirmationModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirm={handleLogout} title="Confirm Logout" message="Are you sure you want to log out?" />
            <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <div className="flex items-center space-x-2">
                                <ShieldCheckIcon className="h-8 w-8 text-yellow-500" />
                                <span className="text-xl font-bold text-slate-900 dark:text-white">Fitoholic Admin</span>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-grow sm:justify-center">
                            <div className="flex space-x-4">
                                <NavLink to="/admin/dashboard" className={getNavLinkClass}>User Management</NavLink>
                                {/* The Admin's profile link now correctly points to an admin route */}
                                <NavLink to="/admin/profile" className={getNavLinkClass}>My Profile</NavLink>
                            </div>
                        </div>
                        <div className="flex-shrink-0 flex items-center space-x-4">
                            <span className="text-slate-600 dark:text-slate-300 mr-2 hidden md:block">
                                Admin: <span className="font-bold text-slate-900 dark:text-white">{user?.name}</span>
                            </span>
                            <ThemeToggle />
                            <button onClick={() => setIsLogoutModalOpen(true)} className="bg-slate-200 dark:bg-slate-700 p-2 rounded-full" title="Logout">
                                <ArrowLeftOnRectangleIcon className="h-6 w-6 text-slate-500 dark:text-slate-300" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="sm:hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                    <div className="px-2 pt-2 pb-3 flex justify-around">
                        <NavLink to="/admin/dashboard" className={getNavLinkClass}>Users</NavLink>
                        <NavLink to="/admin/profile" className={getNavLinkClass}>Profile</NavLink>
                    </div>
                </div>
            </nav>
        </>
    );
};
export default AdminNavbar;
