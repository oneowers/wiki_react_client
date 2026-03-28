/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      animation: {
        '3d-spin': 'spin3d 1s linear infinite',
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.55s ease-out forwards',
        'pulse-glow': 'pulseGlow 2.8s ease-in-out infinite',
      },
      keyframes: {
        spin3d: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(360deg)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scaleX(0.94)' },
          '50%': { opacity: '1', transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}
