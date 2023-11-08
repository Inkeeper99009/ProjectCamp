/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        'background':'#202020',
        'container':'#2d2d2d',
        'accent':'#60cdff',
        'sec':'#373737',
        'text':'#ecf0f1'
      },
      boxShadow:{
        'standart':'rgba(0, 0, 0, 0.24) 0px 3px 8px'
      }
    },
  },
  plugins: [],
}

