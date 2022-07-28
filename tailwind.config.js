/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ["'Noto Serif Display'"],
        manrope: ["'Manrope'"],
      },
      backgroundImage: {
        "hero-image": "url('/src/assets/image/hero-image.webp')",
      },
      colors: {
        "dark-brown": "#3F362F",
        "white-bone": "#E6E1DC",
      },
    },
  },
  plugins: [],
};
