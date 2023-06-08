// tailwind.config.js
import lineClampUtilities from '@neojp/tailwindcss-line-clamp-utilities';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        200: '12.5rem',
      },
      listStyleType: {
        disc: 'disc',
        decimal: 'decimal',
      },
      spacing: {
        7.5: '1.875rem',
        9.75: '2.438rem',
        15: '3.75rem',
        18: '4.5rem',
        23: '5.75rem',
        25: '6.25rem',
        26: '6.5rem',
        30: '7.5rem',
        73: '18.25rem',
        79: '18.75rem',
      },
      colors: {
        primary: {
          light: '#4996C7',
          DEFAULT: '#326789',
        },
        secondary: {
          DEFAULT: '#fff',
        },
        gray: {
          wave: '#f9fbfc',
          thin: '#EAF0F3',
          light: '#D9D9D9',
          DEFAULT: '#E6E6E6',
        },
        black: {
          light: '#666',
          DEFAULT: '#000',
        },
        red: '#FF6868',
      },
      borderRadius: {
        DEFAULT: '10px',
      },
      gridTemplateRows: {
        'footer-subscribe': 'auto minmax(0, 1fr)',
      },
      fontFamily: {
        sans: ['var(--font-roboto)', ...fontFamily.sans],
      },
    },
    screens: {
      xl: '1280px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        xl: '2.5rem',
      },
    },
    fontSize: {
      xs: [
        '12px',
        {
          lineHeight: '150%',
          letterSpacing: '0.01em',
          fontWeight: '400',
        },
      ],
      sm: [
        '.875rem',
        {
          fontSize: '',
          lineHeight: '1.25rem',
        },
      ],
      base: [
        '1rem',
        {
          lineHeight: '150%',
          letterSpacing: '0.01em',
          fontWeight: '400',
        },
      ],
      lg: [
        '24px',
        {
          lineHeight: '150%',
          letterSpacing: '0.01em',
          fontWeight: '400',
        },
      ],
      xl: [
        '32px',
        {
          lineHeight: '150%',
          letterSpacing: '0.01em',
          fontWeight: '400',
        },
      ],
      '2xl': [
        '64px',
        {
          lineHeight: '130%',
          fontWeight: '500',
        },
      ],
    },
  },
  plugins: [
    lineClampUtilities,
  ],
}

export default config;