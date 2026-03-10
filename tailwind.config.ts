import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sol: {
          gold: "#F5A623",
          "gold-dark": "#D4891A",
          dark: "#0A0A0A",
          darker: "#050505",
          card: "#111111",
          border: "#1a1a1a",
        },
        rasta: {
          red: "#E4312B",
          yellow: "#F8D12F",
          green: "#2D9B42",
        },
      },
      fontFamily: {
        display: ["'Dela Gothic One'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        accent: ["'Playfair Display'", "serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.5)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease forwards",
        "pulse-dot": "pulse-dot 2s infinite",
        "slide-in-right": "slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-out-right": "slide-out-right 0.3s ease-in forwards",
      },
    },
  },
  plugins: [],
};

export default config;
