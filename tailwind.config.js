module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    borderColor: (theme) => ({
      ...theme('colors'),
      default: theme('colors.gray.300', 'currentColor'),
      primary: '#34354a',
      secondary: '#e9ecef',
    }),
    extend: {},
    colors: {
      dark: {
        0: '#d5d7e0',
        1: '#acaebf',
        2: '#8c8fa3',
        3: '#666980',
        4: '#4d4f66',
        5: '#34354a',
        6: '#2b2c3d',
        7: '#1d1e30',
        8: '#0c0d21',
        9: '#01010a',
      },
      gray: {
        0: '#F8F9FA',
        1: '#F1F3F5',
        2: '#E9ECEF',
        3: '#DEE2E6',
        4: '#CED4DA',
        5: '#ADB5BD',
        6: '#868E96',
        7: '#495057',
        8: '#343A40',
        9: '#212529',
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
