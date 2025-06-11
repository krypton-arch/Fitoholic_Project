// File: src/pages/AdminDashboardPage.js
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
// We no longer need the PencilIcon
import { UsersIcon, UserPlusIcon, StarIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline'; 
// We no longer need the Modal or EditUserModal imports
import ConfirmationModal from '../components/ConfirmationModal';

// StatCard component is unchanged and correct.
const StatCard = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 flex items-center space-x-4">
        <div className="bg-cyan-100 dark:bg-cyan-900/50 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const AdminDashboardPage = () => {
    const { token } = useContext(AuthContext);
    
    // State related to the edit modal is now removed.
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => { if (!token) return; try { const response = await fetch('http://localhost:8080/api/v1/admin/users', { headers: { 'Authorization': `Bearer ${token}` } }); if (!response.ok) throw new Error('Failed to fetch users.'); const data = await response.json(); setUsers(data); } catch (err) { setError(err.message); } finally { setLoading(false); } };
        fetchUsers();
    }, [token]);

    const filteredUsers = useMemo(() => users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())), [users, searchTerm]);
    
    // All handlers related to editing are removed.
    const handleOpenConfirmModal = (user) => { setUserToDelete(user); setIsConfirmModalOpen(true); };
    const handleCloseConfirmModal = () => { setUserToDelete(null); setIsConfirmModalOpen(false); };

    const handleDeleteUser = async () => {
        if (!userToDelete) return;
        setError('');
        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/users/${userToDelete.id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
            if (response.ok) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
            } else {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to delete user.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            handleCloseConfirmModal();
        }
    };
    
    const totalUsers = users.length;
    const premiumUsers = users.filter(u => u.hasPremiumAccess).length;
    const adminUsers = users.filter(u => u.role === 'ADMIN').length;

    if (loading) return <div className="p-8 text-center">Loading Admin Data...</div>;

    return (
        <div className="space-y-8">
            {/* The Edit User Modal is now completely removed from the JSX */}
            <ConfirmationModal isOpen={isConfirmModalOpen} onClose={handleCloseConfirmModal} onConfirm={handleDeleteUser} title="Remove User" message={`Are you sure you want to permanently remove ${userToDelete?.name}?`}/>
            
            <h2 className="text-3xl font-bold">At a Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Users" value={totalUsers} icon={<UsersIcon className="h-6 w-6 text-cyan-500" />} />
                <StatCard title="Premium Users" value={premiumUsers} icon={<StarIcon className="h-6 w-6 text-cyan-500" />} />
                <StatCard title="Admins" value={adminUsers} icon={<UserPlusIcon className="h-6 w-6 text-cyan-500" />} />
            </div>

            <h2 className="text-3xl font-bold pt-4">User Management</h2>
            <div className="mb-4">
                <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg py-2 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
            </div>

            {error && <div className="bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-300 p-3 rounded-md mb-4">{error}</div>}

            <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-700 text-xs text-slate-500 dark:text-slate-300 uppercase">
                        <tr><th className="px-6 py-3">ID</th><th className="px-6 py-3">Name</th><th className="px-6 py-3">Email</th><th className="px-6 py-3">Role</th><th className="px-6 py-3">Premium Access</th><th className="px-6 py-3 text-center">Actions</th></tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <td className="px-6 py-4">{user.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">{user.name}</td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{user.email}</td>
                                <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'ADMIN' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>{user.role}</span></td>
                                <td className="px-6 py-4 text-center">{user.role === 'ADMIN' ? (<span className="text-slate-400 dark:text-slate-500">—</span>) : (<span className={user.hasPremiumAccess ? "text-green-500 font-bold" : "text-slate-500"}>{user.hasPremiumAccess ? 'Yes' : 'No'}</span>)}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center space-x-4">
                                        {user.role !== 'ADMIN' ? (<Link to={`/admin/user/${user.id}`} className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300" title="View Details"><EyeIcon className="h-5 w-5" /></Link>) : (<span className="text-slate-400 dark:text-slate-600 cursor-not-allowed" title="Cannot view admin details"><EyeIcon className="h-5 w-5" /></span>)}
                                        
                                        {/* The Edit button has been completely removed */}
                                        
                                        <button onClick={() => handleOpenConfirmModal(user)} className="font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300" title="Remove User"><TrashIcon className="h-5 w-5" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default AdminDashboardPage;
