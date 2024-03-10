module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '612px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
    extend: {
      colors: {
        pro: {
          50: '#F2F0FF', // Light Background
          100: '#ECE8FF', // Light Background Hover
          200: '#8065FF', // Dark Background Hover
          300: '#7050FF', // Dark Background (Default Color)
        },
        progray: {
          50: '#F3F3F3', // Very Light Background
          100: '#999999', // Very Light Text
          200: '#6D6D6D', // Paragraphs
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
        'fade-in-fast': 'fade-in 0.25s',
        'fade-in-medium': 'fade-in 0.5s',
        'fade-in-slow': 'fade-in 1s',
        'progress-fast': 'progress 0.25s',
        'progress-medium': 'progress 0.5s',
        'progress-slow': 'progress 1s',
      },
    },
  },
};
