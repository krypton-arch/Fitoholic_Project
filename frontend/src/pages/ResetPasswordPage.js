// File: src/pages/ResetPasswordPage.js
import React, { useState } from 'react';
// 'Link' is no longer needed here.
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const FinalResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const token = searchParams.get('token');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) { setIsError(true); setMessage('Passwords do not match.'); return; }
        if (password.length < 6) { setIsError(true); setMessage('Password must be at least 6 characters long.'); return; }
        setIsSubmitting(true); setMessage(''); setIsError(false);
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, newPassword: password }), });
            const data = await response.json();
            if (response.ok) { setIsError(false); setMessage(data.message); setIsSuccess(true); setTimeout(() => navigate('/login'), 3000); } else { setIsError(true); setMessage(data.error || 'Failed to reset password.'); }
        } catch (error) { setIsError(true); setMessage('An error occurred. Please try again.'); } finally { setIsSubmitting(false); }
    };
    if (!token) { return ( <AuthLayout title="Invalid Link" footerText="Need help?" footerLinkText="Go to login" footerLinkTo="/login"><p className="text-center text-red-500 dark:text-red-400">No reset token found in the URL. This link may be broken or has expired.</p></AuthLayout> ); }
    if (isSuccess) { return ( <AuthLayout title="Success!" footerText="Ready to sign in?" footerLinkText="Go to Login" footerLinkTo="/login"><div className="text-center"><CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" /><p className="text-lg text-slate-800 dark:text-white">{message}</p><p className="text-slate-500 dark:text-slate-400">Redirecting you to the login page...</p></div></AuthLayout> ); }
    return (
        <AuthLayout title="Create a New Password" footerText="Remembered your password?" footerLinkText="Login here" footerLinkTo="/login">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative"><LockClosedIcon className="h-5 w-5 text-slate-400 absolute top-3.5 left-4" /><input type="password" value={password} placeholder="New Password" onChange={(e) => setPassword(e.target.value)} className="pl-12 w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg py-3 px-4 text-slate-900 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-200" required /></div>
                <div className="relative"><LockClosedIcon className="h-5 w-5 text-slate-400 absolute top-3.5 left-4" /><input type="password" value={confirmPassword} placeholder="Confirm New Password" onChange={(e) => setConfirmPassword(e.target.value)} className="pl-12 w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg py-3 px-4 text-slate-900 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-200" required /></div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:bg-slate-500">
                    {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
                </button>
            </form>
            {message && (<div className={`mt-4 text-center p-2 rounded text-sm ${isError ? 'bg-red-200 dark:bg-red-900/50 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-300'}`}>{message}</div>)}
        </AuthLayout>
    );
};
export default FinalResetPasswordPage;
