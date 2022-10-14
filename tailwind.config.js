/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: generateColorClass('color-primary'),
      primaryBg: generateColorClass('color-primaryBg'),
      secondaryBg: generateColorClass('color-secondaryBg'),
      link: generateColorClass('color-link'),
      black: generateColorClass('color-black'),
      background: generateColorClass('color-background'),
      transparent: 'transparent',
    },
    fontFamily: {
      primary: ['Inter', 'sans-serif'],
      header: ['BebasNeue', 'serif'],
    },
    extend: {
      screens: {
        '4k': '3840px',
      },
    },
  },
  plugins: [],
};

function generateColorClass(variable) {
  return ({ opacityValue }) =>
    opacityValue
      ? `rgb(var(--${variable}) / ${opacityValue})`
      : `rgb(var(--${variable}))`;
}
