// File: src/components/ChartsContainer.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { motion } from 'framer-motion';
import { ChartBarIcon } from '@heroicons/react/24/outline';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ChartPlaceholder = ({ message }) => ( <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 rounded-lg bg-slate-100 dark:bg-slate-800/50 p-4 text-center border-2 border-dashed border-slate-300 dark:border-slate-700"><ChartBarIcon className="h-12 w-12 text-slate-400 dark:text-slate-500 mb-2" /><p className="font-semibold">{message}</p></div> );

const ChartsContainer = ({ logs, isLoading }) => {
    
    // The data preparation function is now simpler as it doesn't need to handle premium types.
    const prepareChartData = (logType, label, mainColor) => {
        const defaultChartData = { labels: [], datasets: [] };
        if (!logs) return defaultChartData;
        const filteredLogs = logs.filter(log => log.logType === logType).sort((a, b) => new Date(a.logDate) - new Date(b.logDate));
        if (filteredLogs.length < 2) return defaultChartData;
        return {
            labels: filteredLogs.map(l => l.logDate),
            datasets: [{ label, data: filteredLogs.map(l => l.value), borderColor: mainColor, pointBackgroundColor: mainColor, pointBorderColor: 'currentColor', pointRadius: 4, pointHoverRadius: 7, pointHoverBackgroundColor: mainColor, pointHoverBorderColor: 'currentColor', tension: 0.4, fill: true,
                backgroundColor: (context) => { if (!context.chart.ctx || !context.chart.chartArea) return 'transparent'; const ctx = context.chart.ctx; const gradient = ctx.createLinearGradient(0, context.chart.chartArea.top, 0, context.chart.chartArea.bottom); gradient.addColorStop(0, `${mainColor}50`); gradient.addColorStop(1, `${mainColor}00`); return gradient; },
            }],
        };
    };

    const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#64748b' } }, tooltip: { /* ... */ } }, scales: { y: { beginAtZero: false }, x: { grid: { display: false } } } };
    
    const stepsData = prepareChartData('STEPS', 'Steps', '#38bdf8');
    const caloriesData = prepareChartData('CALORIES', 'Calories', '#fb923c');
    const waterData = prepareChartData('WATER', 'Water (L)', '#4ade80');
    const weightData = prepareChartData('WEIGHT', 'Weight (kg)', '#facc15');

    const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };
    
    if (isLoading) { return <div className="text-center p-10 text-slate-500 animate-pulse">Loading Chart Data...</div>; }

    return (
        <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="relative h-72 md:h-80">{stepsData.labels.length > 0 ? <Line options={chartOptions} data={stepsData} /> : <ChartPlaceholder message="Add Step data to see chart." />}</motion.div>
            <motion.div variants={itemVariants} className="relative h-72 md:h-80">{waterData.labels.length > 0 ? <Line options={chartOptions} data={waterData} /> : <ChartPlaceholder message="Add Water data to see chart." />}</motion.div>
            <motion.div variants={itemVariants} className="relative h-72 md:h-80">{caloriesData.labels.length > 0 ? <Line options={chartOptions} data={caloriesData} /> : <ChartPlaceholder message="Add Calorie data to see chart." />}</motion.div>
            <motion.div variants={itemVariants} className="relative h-72 md:h-80">{weightData.labels.length > 0 ? <Line options={chartOptions} data={weightData} /> : <ChartPlaceholder message="Add Weight data to see chart." />}</motion.div>
            {/* The entire premium chart section has been removed. */}
        </motion.div>
    );
};
export default ChartsContainer;
