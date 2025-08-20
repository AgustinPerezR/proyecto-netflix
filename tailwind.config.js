/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // importante para detectar clases en tus componentes
  ],
  theme: {
    extend: {
      fontFamily: {
        handwritten: ['"Patrick Hand"', "cursive"],
        sans: ["system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
