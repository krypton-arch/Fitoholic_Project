// File: src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { ChartBarIcon, BoltIcon, ChatBubbleBottomCenterTextIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
);

const LandingPage = () => {
    // ... feature array is unchanged
    const features = [ { icon: <ChartBarIcon className="h-6 w-6" />, title: "Track Your Progress", description: "Monitor your steps, calories, water intake, and weight with our easy-to-use loggers and beautiful charts." }, { icon: <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />, title: "AI-Powered Advice", description: "Unlock 'Fitto', our premium AI chatbot, for personalized workout plans and nutrition guidance." }, { icon: <BoltIcon className="h-6 w-6" />, title: "Stay Motivated", description: "Visualize your journey, set goals, and build consistent, healthy habits that last a lifetime." }, { icon: <ShieldCheckIcon className="h-6 w-6" />, title: "Secure & Private", description: "Your data is yours. We ensure your personal health information is kept secure and private." } ];

    return (
        <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white">
            <Header />
            <main>
                <section className="text-center py-20 md:py-32 px-6 bg-white dark:bg-slate-900">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Your Fitness Journey, <span className="text-cyan-500 dark:text-cyan-400">Reimagined.</span></h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">Fitoholic combines intuitive tracking with intelligent AI to guide you towards your health goals. Built for India, ready for you.</p>
                    <Link to="/signup" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg transition-transform duration-300 hover:scale-105">Start Your Journey Free</Link>
                </section>
                <section id="features" className="py-20 bg-slate-100 dark:bg-slate-950 px-6">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold">Everything You Need to Succeed</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">All the tools to track, learn, and grow.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => <FeatureCard key={index} {...feature} />)}
                        </div>
                    </div>
                </section>
                <section className="text-center py-20 px-6 bg-white dark:bg-slate-900">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take Control?</h2>
                    <p className="text-slate-600 dark:text-slate-300 text-lg mb-8">Join thousands of others on their path to a healthier life.</p>
                    <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg transition-transform duration-300 hover:scale-105">Sign Up Now</Link>
                </section>
            </main>
            <footer className="bg-slate-100 dark:bg-slate-950 py-8">
                <div className="container mx-auto text-center text-slate-500 dark:text-slate-400">
                    <p>© {new Date().getFullYear()} Fitoholic. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};
export default LandingPage;
