// File: src/components/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import { motion } from 'framer-motion';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-gray-900 text-slate-900 dark:text-white transition-colors duration-300">
            <AdminNavbar />
            <main>
                <motion.div
                    className="container mx-auto p-4 md:p-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
};

export default AdminLayout;
