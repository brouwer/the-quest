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
        "team-red": "#ff0000",
        "team-white": "#ffffff",
        "team-black": "#000000",
        "team-brown": "#6b321c",
        "team-purple": "#800080",
        "team-pink": "#f7a3b2",
        "team-dark-blue": "#0000ff",
        "team-light-blue": "#89d0e8",
        "team-green": "#008000",
        "team-grey": "#808080",
      },
      keyframes: {
        shake: {
          "0%, 50%, 100%": { transform: "translateX(0px)" },
          "25%": { transform: "translateX(-10px)" },
          "75%": { transform: "translateX(10px)" },
        },
      },
      animation: {
        shake: "shake 200ms ease-in-out 3",
      },
      transitionProperty: {
        time: "width, background-color",
      },
    },
  },
  plugins: [],
}
