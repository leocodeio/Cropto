import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        playfair: ['"Playfair Display"', "serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        }
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.06)',
        glow: '0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px -4px rgba(0,0,0,0.25)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn .4s ease-out forwards'
      }
    },
  },
  plugins: [],
} satisfies Config;
