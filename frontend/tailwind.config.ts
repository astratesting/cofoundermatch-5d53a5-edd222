import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        brand: '#6366f1',
        mint: '#10b981',
        coral: '#fb7185',
      },
      boxShadow: {
        glow: '0 24px 80px rgba(99, 102, 241, 0.22)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
