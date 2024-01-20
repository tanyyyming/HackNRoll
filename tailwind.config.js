// tailwind.config.js

module.exports = {
   content: ["./App.{js,jsx,ts,tsx}","./AlarmClock.{js,jsx,ts,tsx}","./<custom directory>/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
      colors: {
              'dark-blue': '#0C005B',
              'warm-yellow': '#FFD500'
            },
      },
    },
    plugins: [],
  }

