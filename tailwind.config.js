/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#6366f1',
                secondary: '#8b5cf6',
                success: '#10b981',
                error: '#ef4444',
                neutral: '#1f2937',
            },
            animation: {
                'pulse-success': 'pulse 0.5s ease-in-out',
                'shake': 'shake 0.5s ease-in-out',
            },
            keyframes: {
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-10px)' },
                    '75%': { transform: 'translateX(10px)' },
                }
            }
        },
    },
    plugins: [],
}
