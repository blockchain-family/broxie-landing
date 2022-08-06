/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      primaryBg: 'var(--color-primaryBg)',
      secondaryBg: 'var(--color-secondaryBg)',
      hoverBg: 'var(--color-hoverBg)',
      hover: 'var(--color-hover)',
      link: 'var(--color-link)',
      black: 'var(--color-black)',
      transparent: 'transparent',
    },
    extend: {
      screens: {
        '4k': '3840px',
      },
      fontFamily: {
        primary: ['Inter'],
        header: ['BebasNeue'],
      },
    },
  },
  plugins: [],
};
