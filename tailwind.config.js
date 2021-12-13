module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': 'Roboto', // TODO : light and sort fonts for production
      }
    }
  },
  variants: {
    extend: {}
  }
};
