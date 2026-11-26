/** @type {import('tailwindcss').Config} */
// Colours and display fonts come from CSS variables so every invitation model has its own look.
const v = name => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: v('ink'), soft: v('ink-soft'), muted: v('ink-muted') },
        paper: v('paper'),
        line: v('line'),
        brand: { DEFAULT: v('brand'), dark: v('brand-dark'), soft: v('brand-soft') },
        accent: { DEFAULT: v('accent'), soft: v('accent-soft') },
        gold: { DEFAULT: '#E8A33D', light: '#F6C66B' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)'],
        script: ['var(--font-script)'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        brand: ['Cinzel', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(20,12,8,0.18)',
        glow: '0 20px 60px -18px rgb(var(--brand) / 0.55)',
      },
    },
  },
  plugins: [],
};
