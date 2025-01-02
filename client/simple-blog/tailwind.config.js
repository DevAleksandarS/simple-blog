const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {pattern: /(bg|border|text)-(blue|red|green|orange)-(100|400|500|700)/}
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-img': "url('/images/women-writting.webp')",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
  }),
  require('@tailwindcss/typography'),
  ],
}

