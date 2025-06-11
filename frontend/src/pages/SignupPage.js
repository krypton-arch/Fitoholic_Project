// File: src/pages/SignupPage.js
import React, { useState } from 'react';
// The 'Link' import has been removed as it was not being used in this file.
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        setIsSigningUp(true);

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const responseBody = await response.text();

            if (response.ok) {
                setIsError(false);
                setMessage(responseBody + ' Redirecting to login...');
                setTimeout(() => navigate('/login'), 2500);
            } else {
                setIsError(true);
                setMessage(responseBody);
                setIsSigningUp(false);
            }
        } catch (error) {
            setIsError(true);
            setMessage('Signup failed. Please try again later.');
            setIsSigningUp(false);
        }
    };
    
    const inputStyles = "pl-12 w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg py-3 px-4 text-slate-900 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-200";

    return (
        <AuthLayout
            title="Create Your Account"
            footerText="Already have an account?"
            footerLinkText="Login here"
            footerLinkTo="/login"
        >
            <form onSubmit={handleSignup} className="space-y-6">
                <div className="relative">
                    <UserIcon className="h-5 w-5 text-slate-400 absolute top-3.5 left-4" />
                    <input type="text" value={name} placeholder="Full Name" onChange={(e) => setName(e.target.value)} className={inputStyles} required />
                </div>
                <div className="relative">
                    <EnvelopeIcon className="h-5 w-5 text-slate-400 absolute top-3.5 left-4" />
                    <input type="email" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} className={inputStyles} required />
                </div>
                <div className="relative">
                    <LockClosedIcon className="h-5 w-5 text-slate-400 absolute top-3.5 left-4" />
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className={inputStyles} required />
                </div>
                <button type="submit" disabled={isSigningUp} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 disabled:bg-slate-500 disabled:cursor-not-allowed">
                    {isSigningUp ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>
            {message && (
                <div className={`mt-4 text-center p-2 rounded text-sm ${isError ? 'bg-red-200 dark:bg-red-900/50 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-300'}`}>
                    {message}
                </div>
            )}
        </AuthLayout>
    );
};
export default SignupPage;
