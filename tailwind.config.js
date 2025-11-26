/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#384b6f",
        light: "#ffffff",
        dark: "#222e44",
        red: "#d72828",
      },
    },
  },
  plugins: [],
};
