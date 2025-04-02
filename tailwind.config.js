/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    'animate-floating',
    'animate-floating-slow',
    'animate-floating-delay',
    'animate-twinkle',
    'animate-wave-up',
    'animate-blob',
    'animate-scroll',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
