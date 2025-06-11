// File: src/pages/AboutPage.js
import React from 'react';
import Header from '../components/Header'; // The Header component already has the theme toggle.

const AboutPage = () => {
    return (
        // --- THIS IS THE FIX ---
        // We replace hardcoded colors with theme-aware classes.
        // bg-slate-50 -> The background color for light mode.
        // dark:bg-slate-900 -> The background color for dark mode.
        // text-slate-800 -> The main text color for light mode.
        // dark:text-slate-200 -> The main text color for dark mode.
        // transition-colors and duration-300 make the switch smooth.
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        About Fitoholic
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                        Fitoholic was born from a simple idea: to create a fitness application that feels intuitive, motivating, and is tailored specifically for the Indian user. We believe that tracking your health shouldn't be a chore, but an empowering part of your daily routine.
                    </p>
                    <div className="w-full border-t border-slate-200 dark:border-slate-700 my-12"></div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        Our Philosophy
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        We combine four key pillars: straightforward **Tracking**, clear **Visualization**, intelligent **AI Guidance**, and uncompromising **Security**. By making it easy to log your data and see your progress, we help you build the consistency needed to achieve long-term results. Our premium Fitto AI acts as your personal coach, providing guidance whenever you need it.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default AboutPage;
