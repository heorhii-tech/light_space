/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "very-light-gray": "#EFEAE7",
        xanadu: "#687D6B",
        "xanadu-dark": "#556658", // Slightly darker version of Xanadu
        "xanadu-darkest": "#445147", // Even darker version of Xanadu
      },
    },
  },
  plugins: [],
};
