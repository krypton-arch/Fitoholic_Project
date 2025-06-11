// File: src/components/AuthLayout.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/solid';

const AuthLayout = ({ children, title, footerText, footerLinkText, footerLinkTo }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center p-4 transition-colors duration-300">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Link to="/" className="flex items-center space-x-2 mb-8">
                    <SparklesIcon className="h-8 w-8 text-cyan-500" />
                    <span className="text-2xl font-bold text-slate-800 dark:text-white">Fitoholic</span>
                </Link>
            </motion.div>

            <motion.div 
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-700"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-6">{title}</h2>
                {children}
                <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-6">
                    {footerText}{' '}
                    <Link to={footerLinkTo} className="font-bold text-cyan-500 dark:text-cyan-400 hover:underline">
                        {footerLinkText}
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};
export default AuthLayout;
