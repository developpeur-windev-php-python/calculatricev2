module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF6600',
        'secondary': '#FF9933',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.bold'),
              color: theme('colors.gray.800'),
              marginBottom: theme('spacing.6'),
              textAlign: 'center',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // autres plugins...
  ]
}