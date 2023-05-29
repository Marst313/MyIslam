/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        wave: 'wave 2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%,100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        wave: {
          '0%,100%': { transform: 'scale(120%) translatex(0.5rem)' },
          '50%': { transform: 'scale(100%) translatex(0rem)' },
        },
      },
      colors: {
        primaryBg: '#211C3E',
        blueDark: 'rgb(var(--blue-dark) / <alpha-value>)',
        blueDark2: '#00337C',
        lightBlue: '#19A7CE',
        lightBlue2: '#146C94',

        cyan: '#00FFD1',
        white: 'rgb(var(--white) / <alpha-value>)',
      },
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
};
