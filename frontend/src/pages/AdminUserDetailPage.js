// File: src/pages/AdminUserDetailPage.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ChartsContainer from '../components/ChartsContainer';
import LogList from '../components/LogList';
import DashboardCard from '../components/DashboardCard';
import { ArrowLeftIcon, UserCircleIcon, ChartPieIcon, ListBulletIcon, StarIcon } from '@heroicons/react/24/outline';

const AdminUserDetailPage = () => {
    const { userId } = useParams();
    const { token } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token || !userId) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                // We now only fetch the user and their logs.
                const [userRes, logsRes] = await Promise.all([
                    fetch(`http://localhost:8080/api/v1/admin/users/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch(`http://localhost:8080/api/v1/admin/users/${userId}/logs`, { headers: { 'Authorization': `Bearer ${token}` } })
                ]);
                if (!userRes.ok || !logsRes.ok) throw new Error('Failed to fetch user data.');
                setUser(await userRes.json());
                setLogs(await logsRes.json());
            } catch (err) { setError(err.message); } 
            finally { setLoading(false); }
        };
        fetchData();
    }, [token, userId]);

    if (loading) return <div className="p-8 text-center">Loading User Details...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!user) return <div className="p-8 text-center">User not found.</div>;
    
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <UserCircleIcon className="h-16 w-16 text-slate-400 dark:text-slate-500" />
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2">{user.name}{user.hasPremiumAccess && <StarIcon className="h-6 w-6 text-yellow-500" title="Premium User" />}</h1>
                        <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
                    </div>
                </div>
                <Link to="/admin/dashboard" className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center"><ArrowLeftIcon className="h-5 w-5" />Back to User List</Link>
            </div>
            
            {/* The entire "User's Set Goals" section has been completely removed. */}

            <DashboardCard title="User's Progress Visuals" icon={<ChartPieIcon className="h-6 w-6 text-cyan-500 dark:text-cyan-400"/>}><ChartsContainer logs={logs} viewedUser={user} isLoading={loading} /></DashboardCard>
            <DashboardCard title="User's Log History" icon={<ListBulletIcon className="h-6 w-6 text-cyan-500 dark:text-cyan-400"/>}><div className="max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-600 scrollbar-track-slate-200 dark:scrollbar-track-slate-800"><LogList logs={logs} isReadOnly={true} /></div></DashboardCard>
        </div>
    );
};
export default AdminUserDetailPage;
