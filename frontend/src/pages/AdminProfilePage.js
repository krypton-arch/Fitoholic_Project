// File: src/pages/AdminProfilePage.js
import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import DashboardCard from '../components/DashboardCard';
import { UserCircleIcon, LockClosedIcon, PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const AdminProfilePage = () => {
    // This code is identical to the user ProfilePage, but lives on an admin route.
    const { user, token, updateUser } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileMessage, setProfileMessage] = useState({ text: '', isError: false });
    const [passwordMessage, setPasswordMessage] = useState({ text: '', isError: false });
    const [isProfileSaving, setIsProfileSaving] = useState(false);
    const [isPasswordSaving, setIsPasswordSaving] = useState(false);

    useEffect(() => { if (user) { setName(user.name || ''); setEmail(user.email || ''); } }, [user]);
    const handleProfileUpdate = async (e) => { e.preventDefault(); setIsProfileSaving(true); setProfileMessage({ text: '', isError: false }); try { const response = await fetch('http://localhost:8080/api/v1/user/profile', { method: 'PUT', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, bio: user.bio }) }); const data = await response.json(); if (!response.ok) throw new Error(data.message || 'Failed to update profile.'); updateUser(data); setProfileMessage({ text: 'Profile updated successfully!', isError: false }); } catch (err) { setProfileMessage({ text: err.message, isError: true }); } finally { setIsProfileSaving(false); } };
    const handlePasswordChange = async (e) => { e.preventDefault(); setPasswordMessage({ text: '', isError: false }); if (newPassword !== confirmPassword) { setPasswordMessage({ text: "New passwords do not match.", isError: true }); return; } setIsPasswordSaving(true); try { const response = await fetch('http://localhost:8080/api/v1/user/change-password', { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ currentPassword, newPassword }) }); const responseText = await response.text(); if (!response.ok) throw new Error(responseText || 'Failed to change password.'); setPasswordMessage({ text: responseText, isError: false }); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); } catch (err) { setPasswordMessage({ text: err.message, isError: true }); } finally { setIsPasswordSaving(false); } };
    if (!user) return <div className="p-8 text-center">Loading Profile...</div>;
    const inputStyles = "w-full bg-slate-100 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500";
    
    return (
        <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">My Admin Profile</h1>
                <p className="mt-1 text-slate-500 dark:text-slate-400">Manage your personal admin account details.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <DashboardCard title="Profile Details" icon={<UserCircleIcon className="h-6 w-6 text-cyan-500"/>}>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div><label htmlFor="admin-name" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Name</label><input type="text" id="admin-name" value={name} onChange={e => setName(e.target.value)} className={`${inputStyles} mt-1`} /></div>
                        <div><label htmlFor="admin-email" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Email</label><input type="email" id="admin-email" value={email} onChange={e => setEmail(e.target.value)} className={`${inputStyles} mt-1`} /></div>
                        <div className="flex justify-end items-center gap-4 pt-2"><div className={`text-sm ${profileMessage.isError ? 'text-red-500' : 'text-green-500'}`}>{profileMessage.text}</div><button type="submit" disabled={isProfileSaving} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg flex items-center disabled:bg-slate-400"><PencilSquareIcon className="h-5 w-5 mr-2" />{isProfileSaving ? 'Saving...' : 'Save Profile'}</button></div>
                    </form>
                </DashboardCard>
                <DashboardCard title="Change Password" icon={<LockClosedIcon className="h-6 w-6 text-cyan-500"/>}>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div><label htmlFor="admin-currentPassword"  className="block text-sm font-medium text-slate-600 dark:text-slate-300">Current Password</label><input type="password" id="admin-currentPassword" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className={`${inputStyles} mt-1`} required/></div>
                        <div><label htmlFor="admin-newPassword"  className="block text-sm font-medium text-slate-600 dark:text-slate-300">New Password</label><input type="password" id="admin-newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} className={`${inputStyles} mt-1`} required/></div>
                        <div><label htmlFor="admin-confirmPassword"  className="block text-sm font-medium text-slate-600 dark:text-slate-300">Confirm New Password</label><input type="password" id="admin-confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={`${inputStyles} mt-1`} required/></div>
                        <div className="flex justify-end items-center gap-4 pt-2"><div className={`text-sm ${passwordMessage.isError ? 'text-red-500' : 'text-green-500'}`}>{passwordMessage.text}</div><button type="submit" disabled={isPasswordSaving} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg flex items-center disabled:bg-slate-400"><CheckCircleIcon className="h-5 w-5 mr-2" />{isPasswordSaving ? 'Updating...' : 'Update'}</button></div>
                    </form>
                </DashboardCard>
            </div>
        </div>
    );
};
export default AdminProfilePage;
