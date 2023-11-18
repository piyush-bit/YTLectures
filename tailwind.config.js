/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        back : "#f7f7f8",
        acc : '#1876d2',
        gra : '#99a3ad'
      }
    },
  },
  plugins: [],
}

