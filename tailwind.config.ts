import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gradientColorStops: {
        'custom-gradient': {
          '0': '#ffffff',
          '25': '#85f1ff',
          '50': '#c2f5ff',
          '100': '#ffffff',
        },
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1600px',
          xl: '100%',
        },
      },
    },
  },
  plugins: [],
};
export default config;
