/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem", // 16px padding on all screens
        sm: "2rem", // 32px on small screens
        lg: "4rem", // 64px on large screens
        xl: "6rem", // 96px on extra-large screens
        "2xl": "8rem", // 128px on 2XL screens (TVs)
      },
    },
    extend: {
      fontFamily: {
        zain : ["Zain", "serif"],
      },
      colors:{
        darkBg : "#101418",
        darkText : "rgb(200,200,200)",
        lightBg : "#ffffff",
        lightText : "#101418",
      }
    },
  },
  plugins: [],
};
