module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  extend: {
    colors: {
      pro: {
        100: "#f3f7ff", // Light Background
        200: "#e7f0ff", // Light Background Hover
        300: "#3b84fd", // Dark Background Hover
        400: "#0a65fc", // Dark Background + Default Text
        500: "#061257", // Dark Text
      },
    },
    animation: {
      "spin-slow": "spin 2.5s linear infinite",
    },
  },
};
