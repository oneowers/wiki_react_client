/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        '3d-spin': 'spin3d 1s linear infinite',
      },
      keyframes: {
        spin3d: {
          '0%': { 
            transform: 'rotateX(0deg))',
          },
          '100%': { 
            transform: 'rotateX(360deg)',
          },
        }
      }
    },
  },
  plugins: [],
}
