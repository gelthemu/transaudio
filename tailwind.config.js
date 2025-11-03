/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'terminal-bg': '#1a1a1a',
        'terminal-green': '#00ff00',
        'terminal-amber': '#ffd700',
        'terminal-cyan': '#00b7eb',
        'terminal-red': '#ff4040',
      },
    },
  },
  plugins: [],
};