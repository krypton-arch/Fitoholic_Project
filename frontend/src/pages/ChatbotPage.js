// File: src/pages/ChatbotPage.js
import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import ChatbotComponent from '../components/ChatbotComponent';
import StatusModal from '../components/StatusModal';
import { motion } from 'framer-motion';
import { SparklesIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

const Paywall = ({ onPay, isProcessing }) => ( <motion.div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl w-full text-center border border-slate-200 dark:border-slate-700" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}><div className="flex justify-center mb-4"><div className="bg-cyan-100 dark:bg-cyan-900/50 p-4 rounded-full"><SparklesIcon className="h-12 w-12 text-cyan-500" /></div></div><h2 className="text-3xl font-bold text-slate-800 dark:text-white">Unlock Your Full Potential</h2><p className="text-slate-500 dark:text-slate-400 mt-2">Go premium to access exclusive features.</p><div className="text-left my-8 space-y-3"><div className="flex items-center"><CheckBadgeIcon className="h-6 w-6 text-green-500 mr-3 shrink-0" /><span className="text-slate-600 dark:text-slate-300">Personalized advice from **Fitto AI**</span></div><div className="flex items-center"><CheckBadgeIcon className="h-6 w-6 text-green-500 mr-3 shrink-0" /><span className="text-slate-600 dark:text-slate-300">Advanced Health Tracking</span></div></div><div className="my-6 bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg"><span className="text-4xl font-extrabold text-slate-900 dark:text-white">₹100</span><span className="text-slate-500 dark:text-slate-400"> / one-time fee</span></div><button onClick={onPay} disabled={isProcessing} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-200 hover:scale-105 disabled:bg-slate-400 disabled:cursor-wait">{isProcessing ? 'Preparing Payment...' : 'Unlock Forever'}</button></motion.div> );

const ChatbotPage = () => {
    // We now get the new centralized function from the context.
    const { user, token, verifyPaymentAndUpdateContext } = useContext(AuthContext);
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [modalState, setModalState] = useState({ isOpen: false, status: '', title: '', message: '' });

    const displayRazorpay = async () => {
        setIsProcessing(true);
        if (!token || !user) { /* ... guard clause ... */ return; }
        try {
            const orderResponse = await fetch('http://localhost:8080/api/v1/payment/create-order', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
            if (!orderResponse.ok) throw new Error("Could not create payment order.");
            const orderData = await orderResponse.json();

            const options = {
                key: "rzp_test_wR6Y6VmVli5z8Y", // CRITICAL: Replace
                amount: orderData.amount.toString(),
                order_id: orderData.id,
                name: "Fitoholic Premium Access",
                handler: async (response) => {
                    setIsProcessing(true);
                    const verificationData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    };
                    
                    // --- THE DEFINITIVE FIX ---
                    // Call the function from the context and await its result.
                    const result = await verifyPaymentAndUpdateContext(verificationData);
                    
                    if (result.success) {
                        // On success, show the success modal. The context handles the re-render.
                        setModalState({ isOpen: true, status: 'success', title: 'Payment Verified!', message: 'Welcome to Fitoholic Premium! Your new features are now unlocked.' });
                    } else {
                        // On failure, show the error modal.
                        setModalState({ isOpen: true, status: 'error', title: 'Verification Failed', message: result.message });
                    }
                    setIsProcessing(false);
                },
                modal: { ondismiss: () => setIsProcessing(false) },
                prefill: { name: user.name, email: user.email },
                theme: { color: "#0891B2" }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', (r) => {
                setIsProcessing(false);
                setModalState({ isOpen: true, status: 'error', title: 'Payment Failed', message: r.error.description });
            });
            paymentObject.open();
        } catch (error) {
            setIsProcessing(false);
            setModalState({ isOpen: true, status: 'error', title: 'Error', message: error.message });
        }
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, status: '', title: '', message: '' });
    };

    return (
        <>
            <StatusModal isOpen={modalState.isOpen} onClose={handleCloseModal} status={modalState.status} title={modalState.title} message={modalState.message} />
            <div className="flex items-center justify-center">
                <div className="w-full max-w-3xl">
                    {/* This conditional will now work correctly because the 'user' object from the context will be fresh. */}
                    {user && user.hasPremiumAccess ? <ChatbotComponent /> : <Paywall onPay={displayRazorpay} isProcessing={isProcessing} />}
                </div>
            </div>
        </>
    );
};
export default ChatbotPage;
