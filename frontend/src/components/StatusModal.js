// File: src/components/StatusModal.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const StatusModal = ({ isOpen, onClose, status, title, message }) => {
    
    // Determine which icon and colors to use based on the 'status' prop
    const isSuccess = status === 'success';
    const Icon = isSuccess ? CheckCircleIcon : XCircleIcon;
    const iconColor = isSuccess ? 'text-green-500' : 'text-red-500';
    const buttonColor = isSuccess ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // Allow closing by clicking the backdrop
                >
                    <motion.div
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-sm border border-slate-200 dark:border-slate-700 text-center p-8"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Dynamic Icon */}
                        <Icon className={`h-20 w-20 mx-auto ${iconColor}`} />
                        
                        {/* Dynamic Title */}
                        <h3 className="text-2xl font-bold mt-6 text-slate-800 dark:text-white">{title}</h3>
                        
                        {/* Dynamic Message */}
                        <p className="mt-2 text-slate-500 dark:text-slate-400">{message}</p>
                        
                        <button
                            onClick={onClose}
                            className={`w-full mt-8 text-white font-bold py-3 rounded-lg transition-all duration-200 ${buttonColor}`}
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StatusModal;
