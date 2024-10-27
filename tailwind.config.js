/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beige-200': '#D7B9A7',
        'beige-300': '#C7A393',
      },
    },
  },
  plugins: [],
}