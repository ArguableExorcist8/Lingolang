/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#A8E6CF', // light green
          DEFAULT: '#56C596',
          dark: '#37966F'   // dark green
        },
        background: {
          light: '#FFFFFF',
          dark:  '#000000'
        },
        secondary: {
          light: '#E0F7FA',
          dark:  '#004D40'
        }
      }
    },
  },
};
