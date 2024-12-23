/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "very-light-gray": "#FDF5F5",
        xanadu: "#687D6B",
        "xanadu-hover": "#556658", // Slightly darker version of Xanadu
        "xanadu-dark": "#556658",
        "xanadu-darkest": "#445147",
        "xandu-active": "#687D6B",
        light_grey: "#D9D9D9",
        white: "#E5E5E5",
        pale_grey: "#E7E7E7",
        "very-light-shade-of-orange": "#EFEAE7",
        "red-button": "#991b1b",
        "red-button-hover": "#b32b2b",
        "red-button-active": "#b32b2b",
        "secondary-button-hover": "#F0F0F0",
        "gray-95": "#F2F2F2",
        "black-50": "rgba(0, 0, 0, 0.5)", // Black with 50% opacity
        "input-mobile-normal-border": "#474E54",
      },
      spacing: {
        "custom-height-full": "calc(100vh - 20px)",
      },
      gridTemplateColumns: {
        "reviev-form-labels_inputs": "30% 70%",
      },
    },
  },
  plugins: [],
};
