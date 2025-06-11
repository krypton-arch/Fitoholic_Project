// File: src/components/AddLogForm.js
import React, { useState } from 'react';

const AddLogForm = ({ onAddLog }) => {
    const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
    const [logType, setLogType] = useState('STEPS');
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!logDate || !logType || !value || parseFloat(value) < 0) {
            alert('Please fill out all fields with a valid value.');
            return;
        }
        onAddLog({ logDate, logType, value: parseFloat(value) });
        setValue('');
    };

    const inputStyles = "w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500";

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="logDate" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Date</label>
                        <input type="date" id="logDate" value={logDate} onChange={(e) => setLogDate(e.target.value)} className={inputStyles} required />
                    </div>
                    <div>
                        <label htmlFor="logType" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Log Type</label>
                        <select id="logType" value={logType} onChange={(e) => setLogType(e.target.value)} className={inputStyles}>
                            <option value="STEPS">Steps</option>
                            <option value="CALORIES">Calories</option>
                            <option value="WATER">Water (Liters)</option>
                            <option value="WEIGHT">Weight (kg)</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="value" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Value</label>
                    <input type="number" step="0.1" id="value" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value..." className={inputStyles} required />
                </div>
                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105">Add Log</button>
            </form>
        </div>
    );
};
export default AddLogForm;
