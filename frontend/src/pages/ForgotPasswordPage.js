// File: src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';
// 'Link' is no longer needed here because AuthLayout handles the footer link.
import AuthLayout from '../components/AuthLayout';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const FinalForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/forgot-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }), });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <AuthLayout title="Forgot Password" footerText="Remember your password?" footerLinkText="Login here" footerLinkTo="/login">
            <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-6">No problem! Enter your email address below and we'll send you a link to reset your password.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <EnvelopeIcon className="h-5 w-5 text-slate-400 absolute top-3.5 left-4" />
                    <input type="email" value={email} placeholder="Your registered email" onChange={(e) => setEmail(e.target.value)} className="pl-12 w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg py-3 px-4 text-slate-900 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-200" required />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 disabled:bg-slate-500 disabled:cursor-wait">
                    {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
                </button>
            </form>
            {message && (<div className="mt-4 text-center p-2 rounded text-sm bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-300">{message}</div>)}
        </AuthLayout>
    );
};
export default FinalForgotPasswordPage;
