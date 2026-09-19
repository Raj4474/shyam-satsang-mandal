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
          50: 'rgb(var(--maroon-50) / <alpha-value>)',
          100: 'rgb(var(--maroon-100) / <alpha-value>)',
          200: 'rgb(var(--maroon-200) / <alpha-value>)',
          300: 'rgb(var(--maroon-300) / <alpha-value>)',
          400: 'rgb(var(--maroon-400) / <alpha-value>)',
          500: 'rgb(var(--maroon-500) / <alpha-value>)',
          600: 'rgb(var(--maroon-600) / <alpha-value>)',
          700: 'rgb(var(--maroon-700) / <alpha-value>)',
          800: 'rgb(var(--maroon-800) / <alpha-value>)',
          900: 'rgb(var(--maroon-900) / <alpha-value>)',
          950: 'rgb(var(--maroon-950) / <alpha-value>)',
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
        },
        sand: {
          50: 'rgb(var(--sand-50) / <alpha-value>)',
          100: 'rgb(var(--sand-100) / <alpha-value>)',
          200: 'rgb(var(--sand-200) / <alpha-value>)',
          300: 'rgb(var(--sand-300) / <alpha-value>)',
          400: 'rgb(var(--sand-400) / <alpha-value>)',
          500: 'rgb(var(--sand-500) / <alpha-value>)',
        },
        ink: {
          100: 'rgb(var(--ink-100) / <alpha-value>)',
          200: 'rgb(var(--ink-200) / <alpha-value>)',
          300: 'rgb(var(--ink-300) / <alpha-value>)',
          400: 'rgb(var(--ink-400) / <alpha-value>)',
          500: 'rgb(var(--ink-500) / <alpha-value>)',
          600: 'rgb(var(--ink-600) / <alpha-value>)',
          700: 'rgb(var(--ink-700) / <alpha-value>)',
          800: 'rgb(var(--ink-800) / <alpha-value>)',
          900: 'rgb(var(--ink-900) / <alpha-value>)',
        },
      },
      fontFamily: {
        gujarati: ['var(--font-gujarati)', 'Anek Gujarati', 'Noto Sans Gujarati', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        spiritual: '0 10px 30px -5px rgba(217, 119, 6, 0.15)',
        card: '0 4px 20px -2px rgba(120, 53, 15, 0.08)',
        soft: '0 8px 30px rgba(0,0,0,0.04)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
};

export default config;
