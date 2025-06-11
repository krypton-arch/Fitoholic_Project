// File: src/components/LogList.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LogList = ({ logs, handleDelete, isReadOnly = false, highlightedId = null }) => {
    
    const formatLogType = (type) => {
        if (!type) return '';
        const formatted = type.replace(/_/g, ' ').toLowerCase();
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    };

    if (!logs || logs.length === 0) {
        return <p className="text-slate-500 dark:text-slate-400 mt-4 text-center py-8">No log entries found.</p>;
    }

    return (
        <div className="space-y-3">
            <AnimatePresence>
                {logs.map((log) => (
                    <motion.div
                        key={log.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.3 }}
                        className={`p-3 rounded-lg flex justify-between items-center transition-colors duration-500 ${
                            highlightedId === log.id 
                            ? 'bg-cyan-100 dark:bg-cyan-800/50 border-l-4 border-cyan-500' 
                            : 'bg-slate-100 dark:bg-slate-700/50'
                        }`}
                    >
                        <div>
                            <p className="font-bold text-slate-700 dark:text-white">
                                {formatLogType(log.logType)}: <span className="text-cyan-600 dark:text-cyan-400">{log.value}</span>
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{log.logDate}</p>
                        </div>
                        
                        {/* This delete button logic is correct and relies on the parent passing the 'handleDelete' prop. */}
                        {!isReadOnly && (
                            <button 
                                onClick={() => handleDelete(log.id)}
                                className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-500/10"
                                title={`Delete log entry ${log.id}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default LogList;
