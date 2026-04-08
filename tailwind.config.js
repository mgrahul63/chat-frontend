/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "professional-dark":
          "linear-gradient(135deg, #1f2a38, #2e3b4e, #3d4c63, #4b5d79)",
      },
    },
  },
  plugins: [],
};
