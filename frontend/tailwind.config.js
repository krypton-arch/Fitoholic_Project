// File: tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // This line tells Tailwind to look for a 'dark' class on a parent element (e.g., <html>)
  darkMode: 'class',

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
