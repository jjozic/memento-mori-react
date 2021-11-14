module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      '200': '200px',
     },
    extend: {
      backgroundImage: {
        aurelius: "linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('./img/aurelius.png')",
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
