import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50:  "#FAFAF7",
          100: "#F5F0E8",
          200: "#EAE0D0",
          300: "#D4C5B0",
          400: "#B8A48A",
          500: "#9B8470",
          600: "#7D6654",
          700: "#5E4C3E",
          800: "#3E3028",
          900: "#251E17",
        },
      },
      fontFamily: {
        serif:  ["var(--font-cormorant)", "Georgia", "serif"],
        sans:   ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
