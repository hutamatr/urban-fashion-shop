import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        noto: ["'Noto Serif Display'"],
        manrope: ["'Manrope'"],
      },
      backgroundImage: {
        'hero-image': "url('/src/assets/image/hero-image.webp')",
        'home-image': "url('/src/assets/image/home-image.webp')",
      },
      colors: {
        'dark-brown': '#3F362F',
        'pastel-brown': '#E5DDC5',
        'pastel-dark-brown': '#776B5D',
        'white-bone': '#E6E1DC',
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss', flowbite.plugin()],
};
