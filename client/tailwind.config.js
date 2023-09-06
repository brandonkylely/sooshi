/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'chivo': ['Chivo Mono', 'monospace'],
        'cour': ['Courgette', 'cursive'],
        'sig': ['Sigmar', 'cursive']
      },
      backgroundImage: {
        'hero-pattern': "url('./sooshi-hero.jpg')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  /*eslint-env node*/
  plugins: [require("tw-elements/dist/plugin.cjs")],
}