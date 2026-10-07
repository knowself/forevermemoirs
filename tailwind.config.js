/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f6f5f4",
          100: "#e7e4e1",
          200: "#cfc9c3",
          300: "#b0a79e",
          400: "#8f8277",
          500: "#75675c",
          600: "#5d5148",
          700: "#493f39",
          800: "#2d2622",
          900: "#171412",
          950: "#0d0b0a",
          DEFAULT: "#171412",
        },
        parchment: {
          50: "#fdfbf7",
          100: "#f8f4eb",
          200: "#efe6d5",
          300: "#e4d4b8",
          DEFAULT: "#f8f4eb",
        },
        gold: {
          50: "#fbf8ec",
          100: "#f7eece",
          200: "#eddba0",
          300: "#e0c46c",
          400: "#d3ab3f",
          500: "#bc9027",
          600: "#9c721c",
          DEFAULT: "#c89e27",
        },
        film: {
          dark: "#0b0907",
          panel: "#161310",
          border: "#29241f",
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "Cambria", "serif"],
        display: ["var(--font-display)", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(circle at center, rgba(200, 158, 39, 0.15) 0%, transparent 70%)',
        'gold-gradient': 'linear-gradient(135deg, #c89e27 0%, #ecd68b 50%, #b88b20 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
};
