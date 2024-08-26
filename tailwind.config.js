/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "very-light-gray": "#FDF5F5",
        xanadu: "#687D6B",
        "xanadu-dark": "#556658", // Slightly darker version of Xanadu
        "xanadu-darkest": "#445147",
        light_grey: "#D9D9D9",
        white: "#E5E5E5",
      },
    },
  },
  plugins: [],
};
