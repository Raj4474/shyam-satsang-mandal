import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", ".divo"], // use .divo class for dark mode
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FFF8E7', // Background
          surface: '#FFFDF8', // Surface
          cream: '#F7EBCB', // Secondary cream
        },
        ink: {
          DEFAULT: '#241A12', // Primary ink
          muted: '#806F5C', // Muted text
        },
        accent: {
          DEFAULT: '#D97706', // Primary accent
          dark: '#A85400', // Dark accent
        },
        border: {
          elegant: '#E8D9B8', // Border
        },
        divo: {
          bg: '#211812',
          text: '#F4E7C8',
        }
      },
      fontFamily: {
        gujarati: ['var(--font-gujarati)', 'Anek Gujarati', 'Noto Sans Gujarati', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        spiritual: '0 10px 30px -5px rgba(217, 119, 6, 0.08)',
        card: '0 4px 20px -2px rgba(36, 26, 18, 0.04)',
        soft: '0 8px 30px rgba(36, 26, 18, 0.03)',
        glass: '0 8px 32px 0 rgba(36, 26, 18, 0.02)',
      }
    },
  },
  plugins: [],
};

export default config;
