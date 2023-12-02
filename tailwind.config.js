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
      },
      gradients: {
        'grad-acc': 'linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(24,118,210,0.3) 100%)',
      },
    },
  },
  plugins: [],
}

