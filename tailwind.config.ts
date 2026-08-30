import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fffbebe6',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        maroon: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#e11d48',
          600: '#be123c',
          700: '#9f1239',
          800: '#7f1d1d',
          900: '#701a20',
          950: '#450a0a',
        },
        cream: {
          50: '#fdfbf7',
          100: '#f7f2e7',
          200: '#efe6d5',
          300: '#e5d7c0',
          400: '#d9c4a5',
          500: '#cbaf89',
          600: '#bc9a6f',
          700: '#a5825a',
          800: '#866a4a',
          900: '#6e563d',
        },
        gold: {
          400: '#f3e5ab',
          500: '#d4af37',
          600: '#b89726',
          700: '#967819',
        }
      },
      fontFamily: {
        gujarati: ['var(--font-gujarati)', 'Anek Gujarati', 'Noto Sans Gujarati', 'sans-serif'],
      },
      boxShadow: {
        spiritual: '0 10px 30px -5px rgba(217, 119, 6, 0.15)',
        card: '0 4px 20px -2px rgba(120, 53, 15, 0.08)',
      }
    },
  },
  plugins: [],
};

export default config;
