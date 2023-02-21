const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["eurostile", ...defaultTheme.fontFamily.sans],
        mono: ["source-code-pro", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        "primary-300": "#1760a4",
        "primary-500": "#0f4d86",
        "primary-700": "#092946",
        secondary: "#bbd1da",
      },
    },
  },
  plugins: [],
}
