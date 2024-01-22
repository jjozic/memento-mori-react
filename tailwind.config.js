/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    minHeight: {
      '200': '200px',
    },
    extend: {
      backgroundImage: {
        aurelius: "linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('/aurelius.png')",
        seneca: "linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('/seneca.png')",
        epictetus: "linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('/epictetus.png')",
      }
    },
  },
  plugins: [],
}