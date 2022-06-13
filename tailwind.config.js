const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    colors: {
      primarycolor: {
        100: "#FAFAFA",
      },
      independence: {
        100: "#555B6E",
        200: "#30333E",
        300: "#1B1D23",
      },
      morningblue: { 100: "#89B0AE", 200: "#578380" },
      powderblue: "#BEE3DB",
      cultured: { 0: "#FDFDFD", 100: "#FAF9F9", 200: "#F6F4F4" },
      apricot: "#FFD6BA",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      neutral: colors.neutral,
      wine: {
          0: "#bf4721",
          100: "#782C14",
      },
      cream: {
        0: "#fffcf0",
        100: "#fcf6e3",
      },
    },
    extend: {
      backgroundImage: {
        "japan-flag": "url('./assets/japan-flag.jpg')",
        "tree-flowers": "url('./assets/tree-flowers.jpg')",
        "fishes": "url('./assets/fishes.jpg')",
        "kanagawa": "url('./assets/kanagawa.jpg')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
