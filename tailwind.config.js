module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    borderColor: (theme) => ({
      ...theme('colors'),
      default: theme('colors.gray.300', 'currentColor'),
      primary: '#34354a',
      secondary: '#e9ecef',
      // 'danger': '#e3342f',
    }),
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
