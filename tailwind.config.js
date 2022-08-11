/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      primaryBg: 'rgb(var(--color-primaryBg) / <alpha-value>)',
      secondaryBg: 'rgb(var(--color-secondaryBg) / <alpha-value>)',
      hoverBg: 'rgb(var(--color-hoverBg) / <alpha-value>)',
      hover: 'rgb(var(--color-hover) / <alpha-value>)',
      link: 'rgb(var(--color-link) / <alpha-value>)',
      black: 'rgb(var(--color-black) / <alpha-value>)',
      background: 'rgb(var(--color-background) / <alpha-value>)',
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
