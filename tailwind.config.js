/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'Smooth_Appear': "appear forwards 1s",
        'Smooth_Appear_Fast': "appear forwards 0.2s",
      },
      keyframes: {
        appear: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      colors: {
        'background': '#202020',
        'container': '#2d2d2d',
        'accent': '#2196f3',
        'sec': '#373737',
        'text': '#ecf0f1',
      },
      boxShadow: {
        'standart': 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
      }
    },
  },
  plugins: [],
}

