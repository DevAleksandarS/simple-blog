const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-img': "url('./images/auth-background.webp')",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
  })],
}

