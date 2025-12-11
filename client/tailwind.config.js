/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#13ec6d",           // Neon Green
        background: {
          light: "#f6f8f7",
          dark: "#102218",            // Deep Emerald/Black
        },
        surface: {
          dark: "#1c2720",            // Card Background
        },
        border: {
          dark: "#28392f",            // Darker border
          light: "#3b5445",           // Lighter border
        },
        text: {
          secondary: "#9db9a8",       // Muted Sage text
        }
      },
      fontFamily: {
        display: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [],
}