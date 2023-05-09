/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,svelte}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      gridTemplateRows: {
        "auto": 'auto auto',
      },
      gridTemplateColumns: {
        "10-auto": 'auto auto auto auto auto auto auto auto auto auto', 
      },
      colors: {
        transparent: 'transparent',
        primary: colors.red,
        secondary: colors.blue,
        info: colors.violet,
        success: colors.emerald,
        warning: colors.amber,
        danger: colors.red,
      },
      animation: {
        'slide-down': 'slide-down 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms backwards',
        'ripple': 'ripple 600ms linear',
        'fill-in-5': 'fill 5s linear 1',
        'alert': 'alert 5s cubic-bezier(0.4, 0, 0.2, 1) 0ms backwards',
      },
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-5%)', opacity: 0 },
          '100%': { transform: 'translateY(0%)', opacity: 100 },
        },
        ripple: {
          to: { transform: 'scale(4)', opacity: 0 },
        },
        fill: {
          '0%': { width: '0%' },
          '90%': { width: '100%' },
        },
        alert: {
          '0%': { transform: 'translateY(25%)', opacity: 0 },
          '10%': { transform: 'translateY(0%)', opacity: 100 },
          '90%': { transform: 'translateY(0%)', opacity: 100 },
          '100%': { transform: 'translateY(-25%)', opacity: 0 },
        }
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
  darkMode: 'class',
}
