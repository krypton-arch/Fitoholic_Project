// File: src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/solid';
import ThemeToggle from './ThemeToggle'; // Import the ThemeToggle component

const Header = () => {
    const scrollToFeatures = (e) => {
        e.preventDefault();
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <SparklesIcon className="h-8 w-8 text-cyan-500" />
                    <span className="text-2xl font-bold text-slate-800 dark:text-white">Fitoholic</span>
                </Link>

                <div className="flex items-center space-x-6">
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">Home</Link>
                        <a href="#features" onClick={scrollToFeatures} className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">Features</a>
                        <Link to="/about" className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">About Us</Link>
                    </div>
                    
                    {/* --- THIS IS THE NEW SECTION --- */}
                    <div className="flex items-center space-x-4">
                        {/* Add the theme toggle here */}
                        <ThemeToggle />
                        
                        <div className="hidden md:block w-px h-6 bg-slate-300 dark:bg-slate-700"></div>

                        <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 py-2 px-4 rounded-md text-sm md:text-base">Login</Link>
                        <Link to="/signup" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-transform duration-300 hover:scale-105 text-sm md:text-base">Sign Up</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Header;
