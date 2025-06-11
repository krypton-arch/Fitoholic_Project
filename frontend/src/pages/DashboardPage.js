// File: src/pages/DashboardPage.js
import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from '../context/AuthContext';
import LogList from '../components/LogList';
import AddLogForm from '../components/AddLogForm';
import ChartsContainer from '../components/ChartsContainer'; // Corrected import path
import DashboardCard from '../components/DashboardCard';
import ConfirmationModal from '../components/ConfirmationModal';
import { ListBulletIcon, ChartPieIcon, PlusCircleIcon, StarIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const { user, token, loading: authLoading } = useContext(AuthContext);
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [confirmState, setConfirmState] = useState({ isOpen: false, onConfirm: () => {}, title: 'Please Confirm', message: '' });

    const fetchData = useCallback(async () => {
        if (!token) { setIsDataLoading(false); return; }
        setIsDataLoading(true);
        try {
            const logsRes = await fetch('http://localhost:8080/api/v1/logs', { headers: { 'Authorization': `Bearer ${token}` } });
            if (!logsRes.ok) throw new Error('Failed to fetch logs.');
            setLogs(await logsRes.json());
        } catch (err) { setError(err.message); } 
        finally { setIsDataLoading(false); }
    }, [token]);

    useEffect(() => { if (!authLoading) { fetchData(); } }, [authLoading, fetchData]);

    const handleAddLog = useCallback(async (newLog) => {
        if (!token) return;
        const onConfirm = async () => {
            setConfirmState({ isOpen: false });
            const res = await fetch('http://localhost:8080/api/v1/logs', { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(newLog) });
            if (res.ok) {
                fetchData();
            } else { setError('Failed to save log.'); }
        };
        const existingLog = logs.find(l => l.logDate === newLog.logDate && l.logType === newLog.logType);
        if (existingLog) {
            setConfirmState({
                isOpen: true,
                title: 'Replace Entry?',
                message: `You already have an entry for ${newLog.logType.toLowerCase()}. Replace it?`,
                onConfirm
            });
        } else {
            onConfirm();
        }
    }, [token, logs, fetchData]);

    const handleDeleteLog = useCallback((logId) => {
        setConfirmState({
            isOpen: true, title: 'Delete Log?', message: 'Are you sure?',
            onConfirm: async () => {
                const res = await fetch(`http://localhost:8080/api/v1/logs/${logId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
                if (res.ok) { fetchData(); } 
                else { setError('Failed to delete log.'); }
                setConfirmState({ isOpen: false });
            }
        });
    }, [token, fetchData]);

    if (authLoading || isDataLoading) {
        return <div className="p-8 flex justify-center items-center h-96"><div className="text-xl text-slate-500 dark:text-slate-400 animate-pulse">Loading Your Dashboard...</div></div>;
    }
    
    return (
        <div className="space-y-8">
            <ConfirmationModal isOpen={confirmState.isOpen} onClose={() => setConfirmState({isOpen: false})} onConfirm={confirmState.onConfirm} title={confirmState.title} message={confirmState.message} />
            
            {/* The GoalCard section has been completely removed. */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <main className="lg:col-span-2">
                    <DashboardCard title="Progress Visuals" icon={<ChartPieIcon className="h-6 w-6 text-cyan-500 dark:text-cyan-400"/>}>
                        <ChartsContainer logs={logs} isLoading={isDataLoading} />
                    </DashboardCard>
                </main>
                <aside className="lg:col-span-1 space-y-8">
                    <DashboardCard title="Add New Entry" icon={<PlusCircleIcon className="h-6 w-6 text-cyan-500 dark:text-cyan-400"/>}>
                        <AddLogForm onAddLog={handleAddLog} />
                    </DashboardCard>
                    <DashboardCard title="Log History" icon={<ListBulletIcon className="h-6 w-6 text-cyan-500 dark:text-cyan-400"/>}>
                        {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
                        <div className="max-h-[100vh] lg:max-h-[calc(100vh-18rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-600 scrollbar-track-slate-200 dark:scrollbar-track-slate-800">
                            <LogList logs={logs} handleDelete={handleDeleteLog} />
                        </div>
                    </DashboardCard>
                </aside>
            </div>

            {user && !user.hasPremiumAccess && ( <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg text-white text-center"><div className="flex justify-center mb-3"><StarIcon className="h-8 w-8" /></div><h3 className="text-2xl font-bold">Unlock Fitto AI!</h3><p className="mt-2 mb-4">Upgrade to premium to get personalized advice from our AI chatbot.</p><Link to="/chatbot" className="bg-white text-cyan-600 font-bold py-2 px-6 rounded-full hover:bg-slate-100 transition-all">Upgrade Now</Link></div> )}
        </div>
    );
};

export default DashboardPage;
