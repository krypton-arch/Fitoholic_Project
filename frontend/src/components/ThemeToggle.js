// File: src/components/ThemeToggle.js
import React, { useContext } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import ThemeContext from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="bg-slate-200 dark:bg-slate-700 p-2 rounded-full text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors duration-200"
            title="Toggle Theme"
        >
            {/* AnimatePresence allows for enter/exit animations */}
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    // The key is crucial for React to see this as a new element on change
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === 'dark' ? (
                        <SunIcon className="h-6 w-6" /> // Show Sun icon in dark mode
                    ) : (
                        <MoonIcon className="h-6 w-6" /> // Show Moon icon in light mode
                    )}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;
