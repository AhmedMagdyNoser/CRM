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
          100: '#f3f7ff', // Light Background
          200: '#e7f0ff', // Light Background Hover
          300: '#3b84fd', // Dark Background Hover
          400: '#0a65fe', // Dark Background + Default Text
          500: '#061257', // Dark Text
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
