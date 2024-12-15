import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "512px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        brick: "#d62929",
        purple: "#3c054c",
        beige: "#fcfaee",
        blue: {
          light: "#507687",
          dark: "#384b6f",
        },
        dark: "#1a2227",
      },
      fontFamily: {
        jura: ["Jura", "Geist", "sans-serif"],
        geistMono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
