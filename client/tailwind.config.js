/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'chivo': ['Chivo Mono', 'monospace'],
        'cour': ['Courgette', 'cursive'],
        'sig': ['Sigmar', 'cursive']
      },
    },
  },
  plugins: [],
}