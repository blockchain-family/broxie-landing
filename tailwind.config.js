/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
      },
      colors: {
        primary: 'var(--color-primary)',
        primaryBg: 'var(--color-primaryBg)',
      },
      fontFamily: {
        primary: ['Inter'],
        header: ['BebasNeue'],
      },
    },
  },
  plugins: [],
};
