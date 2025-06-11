import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoggingIn(true);
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }), });
            if (response.ok) {
                const data = await response.json();
                const user = await login(data.token);
                if (user) {
                    if (user.role === 'ADMIN') { navigate('/admin/dashboard'); } else { navigate('/dashboard'); }
                } else { setError("Login successful, but failed to retrieve user profile."); }
            } else {
                const errorText = await response.text();
                setError(errorText || "Invalid credentials.");
            }
        } catch (err) { setError('Login failed. Please check your connection.'); } 
        finally { setIsLoggingIn(false); }
    };

    const inputStyles = "pl-12 w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg py-3 px-4 text-slate-900 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-200";

    return (
        <AuthLayout title="Welcome Back!" footerText="Don't have an account?" footerLinkText="Sign up now" footerLinkTo="/signup">
            <form onSubmit={handleLogin}>
                <div className="relative mb-4">
                    <EnvelopeIcon className="h-5 w-5 text-slate-400 absolute top-3.5 left-4" />
                    <input type="email" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} className={inputStyles} required />
                </div>
                <div className="relative">
                    <LockClosedIcon className="h-5 w-5 text-slate-400 absolute top-3.5 left-4" />
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className={inputStyles} required />
                </div>
                <div className="text-right text-sm my-4"><Link to="/forgot-password" className="font-medium text-cyan-500 dark:text-cyan-400 hover:underline">Forgot Password?</Link></div>
                <button type="submit" disabled={isLoggingIn} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 disabled:bg-slate-500 disabled:cursor-not-allowed">
                    {isLoggingIn ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
            {error && (<div className="mt-4 text-center p-2 rounded bg-red-200 dark:bg-red-900/50 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-300 text-sm">{error}</div>)}
        </AuthLayout>
    );
};
export default LoginPage;
