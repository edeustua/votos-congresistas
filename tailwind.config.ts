import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#7c3aed",
          foreground: "#f8fafc",
        },
      },
      boxShadow: {
        glow: "0 20px 45px -20px rgba(124, 58, 237, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;

