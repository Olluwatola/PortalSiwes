/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B37FF",
        primaryAlt: "#C4C4C4",
        darkBlue: "#020050",
        dashBlue: "#05036980",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        secondary: ["groupee", "sans-serif"],
      },
    },
  },
  plugins: [],
};
