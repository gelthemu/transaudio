import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBrick: "#b22222",
        brandBeige: "#fcfaee",
        brandBlue: {
          light: "#507687",
          dark: "#384b6f",
        },
        brandDark: "#1a2227",
      },
      fontFamily: {
        geist: ["Geist", "sans-serif"],
        geistMono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
