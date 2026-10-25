import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0d1b2a',
        'navy-light': '#1b2d4a',
        gold: '#c9a961',
        'gold-light': '#f0d589',
        cream: '#faf7f0',
        'cream-dark': '#f5ecd9',
        brown: '#5a4a35',
      },
      fontFamily: {
        amiri: ['var(--font-amiri)', 'serif'],
        cairo: ['var(--font-cairo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
