import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#FDCE29',
        secondary: '#B6721B',
        white: '#FFFFFF',
        black: '#000000',
        amber: {
          100: '#ADC178',
          300: '#FFFC9D',
          500: '#979797',
          600: '#e5c7264d',
          800: '#E09F3E',
        },
        gray: {
          200: '#f8f8f8',
          300: '#E8E8E8',
          400: '#E9E9E9',
          500: '#DFDFDF',
          600: '#BCBBBB',
          700: '#a1a1a1',
          800: '#6A6969',
          900: '#474747',
        },
        blue: {
          700: '#0F6DB0',
          800: '#298BFD',
        },

        pink: {
          300: '#B5838D',
          600: '#FB6F92',
        },
        violet: {
          200: '#6D597A',
          400: '#8E7DBE',
          800: '#390099',
        },
        red: {
          300: '#FF6363',
          400: '#FD2929',
          600: '#FF2020',
          700: '#E82222',
          800: '#FF1414',
        },
        green: {
          50: '#264653',
          500: '#0AB71C',
        },
        slat: {
          950: '#222019',
          800: '#202020',
        },
        stone: {
          950: '#06101A',
          800: '#1D1C1C',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // function ({ addUtilities }) {
    //   addUtilities({
    //     '.overflow-initial': { overflow: 'initial' },
    //     '.overflow-inherit': { overflow: 'inherit' },
    //   });
    // },
  ],
};
export default config;
