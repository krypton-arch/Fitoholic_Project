// File: src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

// This function determines the initial theme by checking localStorage first,
// then the user's OS preference, and finally defaulting to 'light'.
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    // This effect runs whenever the 'theme' state changes.
    useEffect(() => {
        const root = window.document.documentElement;
        
        const isDark = theme === 'dark';
        
        // Add the correct class and remove the other.
        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(theme);

        // Save the current theme to localStorage for persistence.
        localStorage.setItem('theme', theme);
    }, [theme]);

    // This function will be called by our toggle button.
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Provide the current theme and the toggle function to the rest of the app.
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
