module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '600px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
    extend: {
      colors: {
        pro: {
          50: '#F5F5FF', // Light Background
          100: '#EAEAFF', // Light Background Hover
          200: '#9085FF', // Dark Background Hover
          300: '#6A60FF', // Dark Background + Default Text
        },
        progray: {
          50: '#FAF8FA', // Very Light Background
          100: '#F3F2F4', // Light Background
          150: '#A1A1A1',
          200: '#757575', // Paragraphs
          300: '#252525', // Titles
        },
        proerror: {
          50: '#FEEAEA', // Error Background
          100: '#EE4545', // Error Text
        },
      },
      animation: {
        'spin-fast': 'spin 0.5s linear infinite',
        'spin-medium': 'spin 1.5s linear infinite',
        'spin-slow': 'spin 2.5s linear infinite',
        'fade-in-fast': 'fade-in 0.2s',
        'fade-in-medium': 'fade-in 0.5s',
        'fade-in-slow': 'fade-in 1s',
        'progress-fast': 'progress 0.25s',
        'progress-medium': 'progress 0.5s',
        'progress-slow': 'progress 1s',
      },
    },
  },
};
