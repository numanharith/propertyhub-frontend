/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6EE7B7', // A lighter, fresh green
          DEFAULT: '#10B981', // Emerald Green - trustworthy, nature-related
          dark: '#047857',  // A darker shade for hover states
        },
        secondary: {
          light: '#A5B4FC', // Lighter Indigo
          DEFAULT: '#6366F1', // Indigo - professional, modern
          dark: '#4338CA',  // Darker Indigo
        },
        neutral: {
          light: '#F9FAFB', // Almost white
          DEFAULT: '#E5E7EB', // Light gray
          dark: '#374151',   // Dark gray
        },
        accent: {
          DEFAULT: '#F59E0B', // Amber - for calls to action, highlights
          dark: '#D97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        }
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
