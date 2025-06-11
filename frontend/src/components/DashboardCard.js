// File: src/components/DashboardCard.js
import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, icon, children, className = '' }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            className={`bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col ${className}`}
            variants={cardVariants}
        >
            <div className="flex items-center mb-4 flex-shrink-0">
                <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg mr-4">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h3>
            </div>
            <div className="flex-grow">
                {children}
            </div>
        </motion.div>
    );
};

export default DashboardCard;
