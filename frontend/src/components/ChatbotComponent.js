// File: src/components/ChatbotComponent.js
import React, { useState, useContext, useRef, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const ChatbotComponent = () => {
    const { token } = useContext(AuthContext);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Hello! I am Fitto, your personal fitness assistant. How can I help you achieve your goals today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/v1/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ prompt: input })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Failed to get response from AI');
            }

            const data = await response.json();
            const aiMessage = { sender: 'ai', text: data.response };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Chatbot error:", error);
            const errorMessage = { sender: 'ai', text: `Sorry, an error occurred: ${error.message}` };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl w-full h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-3 text-center flex items-center justify-center">
                <SparklesIcon className="h-6 w-6 text-cyan-500 mr-2" />
                Chat with Fitto
            </h2>
            
            <div className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-600 scrollbar-track-slate-200 dark:scrollbar-track-slate-800">
                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`my-3 flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        {msg.sender === 'ai' ? (
                            <div className="bg-cyan-500 rounded-full p-1.5 flex-shrink-0">
                                <SparklesIcon className="h-5 w-5 text-white" />
                            </div>
                        ) : (
                            <div className="bg-slate-200 dark:bg-slate-600 rounded-full p-1.5 flex-shrink-0">
                                <UserCircleIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                            </div>
                        )}
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-cyan-500 text-white rounded-br-none' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                        </div>
                    </motion.div>
                ))}
                {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3">
                         <div className="bg-cyan-500 rounded-full p-1.5 flex-shrink-0">
                            <SparklesIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                            <div className="flex items-center space-x-1">
                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isLoading ? "Fitto is thinking..." : "Ask about workouts, nutrition..."}
                        disabled={isLoading}
                        className="w-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 transition-colors"
                    />
                    <button type="submit" disabled={!input.trim() || isLoading} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold p-3 rounded-lg disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 shrink-0">
                        <PaperAirplaneIcon className="h-6 w-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatbotComponent;
