// File: src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { SparklesIcon, ArrowLeftOnRectangleIcon, ShieldCheckIcon, ChatBubbleBottomCenterTextIcon, UserCircleIcon, ChartBarSquareIcon } from '@heroicons/react/24/solid';
import ThemeToggle from './ThemeToggle';
import ConfirmationModal from './ConfirmationModal';

const Navbar = () => {
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
        if (isActive) {
            return `${baseStyles} bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white`;
        } else {
            return `${baseStyles} text-slate-500 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white`;
        }
    };
    
    return (
        <>
            <ConfirmationModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirm={handleLogout} title="Confirm Logout" message="Are you sure you want to log out?"/>
            <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Side: Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/dashboard" className="flex items-center space-x-2">
                                <SparklesIcon className="h-8 w-8 text-cyan-500" />
                                <span className="text-xl font-bold text-slate-900 dark:text-white">Fitoholic</span>
                            </Link>
                        </div>

                        {/* Center: Main Navigation Links */}
                        <div className="hidden sm:flex sm:flex-grow sm:justify-center">
                            <div className="flex space-x-4">
                                <NavLink to="/dashboard" className={getNavLinkClass}>
                                    <ChartBarSquareIcon className="h-5 w-5 mr-1.5" />Dashboard
                                </NavLink>
                                <NavLink to="/chatbot" className={getNavLinkClass}>
                                    <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-1.5" />Fitto AI
                                </NavLink>
                                <NavLink to="/profile" className={getNavLinkClass}>
                                    <UserCircleIcon className="h-5 w-5 mr-1.5" />Profile
                                </NavLink>
                                {user && user.role === 'ADMIN' && (
                                    <NavLink to="/admin/dashboard" className={getNavLinkClass}>
                                        <ShieldCheckIcon className="h-5 w-5 mr-1.5" />Admin Panel
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        {/* Right Side: User Menu & Controls */}
                        <div className="flex-shrink-0 flex items-center space-x-4">
                            <span className="text-slate-600 dark:text-slate-300 mr-2 hidden md:block">
                                Welcome, <span className="font-bold text-slate-900 dark:text-white">{user?.name}</span>
                            </span>
                            {/* Theme Toggle is RESTORED here */}
                            <ThemeToggle />
                            {/* Logout Button is RESTORED here */}
                            <button onClick={() => setIsLogoutModalOpen(true)} className="bg-slate-200 dark:bg-slate-700 p-2 rounded-full text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors duration-200" title="Logout">
                                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile Nav */}
                <div className="sm:hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                    <div className="px-2 pt-2 pb-3 flex justify-around">
                        <NavLink to="/dashboard" className={getNavLinkClass}>Dashboard</NavLink>
                        <NavLink to="/chatbot" className={getNavLinkClass}>Fitto AI</NavLink>
                        <NavLink to="/profile" className={getNavLinkClass}>Profile</NavLink>
                        {user && user.role === 'ADMIN' && (<NavLink to="/admin/dashboard" className={getNavLinkClass}>Admin</NavLink>)}
                    </div>
                </div>
            </nav>
        </>
    );
};
export default Navbar;
